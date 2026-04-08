// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IAccessControlManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CarbonEscrow
 * @dev Secure escrow handling for Carbon Credit trades. Configured to act as a backend
 * for CarbonMarketplace and governed by AccessControlManager.
 */
contract CarbonEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IAccessControlManager public immutable access;

    enum EscrowStatus { PENDING, COMPLETED, REFUNDED }

    struct Escrow {
        address buyer;
        address seller;
        address paymentToken; // address(0) for native ETH
        uint256 amount;
        EscrowStatus status;
    }

    uint256 private _escrowCounter;
    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, address paymentToken, uint256 amount);
    event EscrowCompleted(uint256 indexed escrowId, address indexed seller, uint256 amount);
    event EscrowRefunded(uint256 indexed escrowId, address indexed buyer, uint256 amount);

    error InvalidAmount();
    error InvalidAddress();
    error EscrowNotPending();
    error UnsupportedToken();
    error TransferFailed();
    error Unauthorized();

    constructor(address _accessManager) {
        if (_accessManager == address(0)) revert InvalidAddress();
        access = IAccessControlManager(_accessManager);
    }

    modifier onlyAdmin() {
        if (!access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    /**
     * @notice Creates an escrow by locking buyer's funds. Can be called by a proxy 
     * (like CarbonMarketplace) to specify the ultimate buyer.
     */
    function createEscrow(address buyer, address seller, address paymentToken, uint256 tokenAmount) external payable nonReentrant returns (uint256) {
        if (seller == address(0) || buyer == address(0)) revert InvalidAddress();

        uint256 actualAmount;

        if (paymentToken == address(0)) {
            if (msg.value == 0) revert InvalidAmount();
            actualAmount = msg.value;
        } else {
            if (tokenAmount == 0) revert InvalidAmount();
            if (msg.value > 0) revert InvalidAmount(); // Should not send ETH if using ERC20

            // Transfer ERC20 from msg.sender to this contract
            actualAmount = tokenAmount;
            IERC20(paymentToken).safeTransferFrom(msg.sender, address(this), actualAmount);
        }

        _escrowCounter++;
        uint256 escrowId = _escrowCounter;

        escrows[escrowId] = Escrow({
            buyer: buyer,
            seller: seller,
            paymentToken: paymentToken,
            amount: actualAmount,
            status: EscrowStatus.PENDING
        });

        emit EscrowCreated(escrowId, buyer, seller, paymentToken, actualAmount);
        return escrowId;
    }

    /**
     * @notice Completes the escrow, transferring locked funds to the seller
     */
    function releaseEscrow(uint256 escrowId) external onlyAdmin nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        if (escrow.status != EscrowStatus.PENDING) revert EscrowNotPending();

        escrow.status = EscrowStatus.COMPLETED;

        if (escrow.paymentToken == address(0)) {
            (bool success, ) = payable(escrow.seller).call{value: escrow.amount}("");
            if (!success) revert TransferFailed();
        } else {
            IERC20(escrow.paymentToken).safeTransfer(escrow.seller, escrow.amount);
        }

        emit EscrowCompleted(escrowId, escrow.seller, escrow.amount);
    }

    /**
     * @notice Refunds a pending escrow, returning funds to the buyer
     */
    function refundEscrow(uint256 escrowId) external onlyAdmin nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        if (escrow.status != EscrowStatus.PENDING) revert EscrowNotPending();

        escrow.status = EscrowStatus.REFUNDED;

        if (escrow.paymentToken == address(0)) {
            (bool success, ) = payable(escrow.buyer).call{value: escrow.amount}("");
            if (!success) revert TransferFailed();
        } else {
            IERC20(escrow.paymentToken).safeTransfer(escrow.buyer, escrow.amount);
        }

        emit EscrowRefunded(escrowId, escrow.buyer, escrow.amount);
    }
}
