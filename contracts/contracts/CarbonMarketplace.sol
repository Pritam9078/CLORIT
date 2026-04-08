// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IAccessControlManager.sol";
import "./CarbonEscrow.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./CarbonCreditToken.sol";

/**
 * @title CarbonMarketplace
 * @dev Optimized marketplace for trading carbon credits with strict Escrow routing.
 */
contract CarbonMarketplace is ERC1155Holder, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IAccessControlManager public immutable access;
    CarbonCreditToken public immutable carbonToken;
    CarbonEscrow public immutable carbonEscrow;

    struct Listing {
        address seller;
        address paymentToken; // address(0) for ETH, or ERC20 address
        uint256 tokenId;
        uint256 amount;
        uint256 pricePerCredit;
        bool active;
    }

    uint256 private _listingCounter;

    mapping(uint256 => Listing) public listings;

    // Custom Errors
    error InvalidAmount();
    error InvalidPrice();
    error InvalidRecipient();
    error ListingNotActive();
    error InsufficientStock();
    error InsufficientPayment();
    error NotListingOwner();
    error TransferFailed();
    error Unauthorized();

    event ListingCreated(
        uint256 indexed listingId, 
        address indexed seller, 
        address paymentToken,
        uint256 tokenId, 
        uint256 amount, 
        uint256 price
    );
    event TradeExecuted(
        uint256 indexed listingId, 
        address indexed buyer, 
        uint256 amount, 
        uint256 totalPrice,
        uint256 escrowId
    );
    event ListingCancelled(uint256 indexed listingId);

    constructor(address _accessManager, address _carbonToken, address _carbonEscrow) {
        if (_accessManager == address(0) || _carbonToken == address(0) || _carbonEscrow == address(0)) revert InvalidRecipient();
        access = IAccessControlManager(_accessManager);
        carbonToken = CarbonCreditToken(_carbonToken);
        carbonEscrow = CarbonEscrow(_carbonEscrow);
    }

    modifier onlyAdmin() {
        if (!access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    modifier onlyNGOOrCorporate() {
        if (!access.isNGO(msg.sender) && !access.isCorporate(msg.sender) && !access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    /**
     * @notice Creates a new marketplace listing
     */
    function listCredits(
        uint256 tokenId,
        uint256 amount,
        uint256 pricePerCredit,
        address paymentToken
    ) external onlyNGOOrCorporate returns (uint256) {
        if (amount == 0) revert InvalidAmount();
        if (pricePerCredit == 0) revert InvalidPrice();

        carbonToken.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        _listingCounter++;
        uint256 listingId = _listingCounter;

        listings[listingId] = Listing({
            seller: msg.sender,
            paymentToken: paymentToken,
            tokenId: tokenId,
            amount: amount,
            pricePerCredit: pricePerCredit,
            active: true
        });

        emit ListingCreated(listingId, msg.sender, paymentToken, tokenId, amount, pricePerCredit);
        return listingId;
    }

    /**
     * @notice Purchase credits from a listing. Funds route directly to CarbonEscrow.
     */
    function buyCredits(uint256 listingId, uint256 amount) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        if (!listing.active) revert ListingNotActive();
        if (amount > listing.amount) revert InsufficientStock();

        uint256 totalPrice = amount * listing.pricePerCredit;
        uint256 escrowId;

        if (listing.paymentToken == address(0)) {
            // ETH payment routing to Escrow
            if (msg.value < totalPrice) revert InsufficientPayment();
            
            escrowId = carbonEscrow.createEscrow{value: totalPrice}(
                msg.sender, 
                listing.seller, 
                listing.paymentToken, 
                totalPrice
            );

            // Refund overpayment locally
            if (msg.value > totalPrice) {
                uint256 refund = msg.value - totalPrice;
                (bool success, ) = payable(msg.sender).call{value: refund}("");
                if (!success) revert TransferFailed();
            }
        } else {
            // ERC20 payment routing to Escrow
            if (msg.value > 0) revert InsufficientPayment(); 
            
            // Require buyer to approve CarbonMarketplace first
            IERC20(listing.paymentToken).safeTransferFrom(msg.sender, address(this), totalPrice);
            
            // Re-approve the Escrow to pull from Marketplace
            IERC20(listing.paymentToken).approve(address(carbonEscrow), totalPrice);

            escrowId = carbonEscrow.createEscrow(
                msg.sender, 
                listing.seller, 
                listing.paymentToken, 
                totalPrice
            );
        }

        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        // Instantly disburse token CCT to the buyer while funds remain securely locked in Escrow
        carbonToken.safeTransferFrom(address(this), msg.sender, listing.tokenId, amount, "");

        emit TradeExecuted(listingId, msg.sender, amount, totalPrice, escrowId);
    }

    /**
     * @notice Cancel a listing and return tokens to seller
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        if (listing.seller != msg.sender && !access.isAdmin(msg.sender)) revert NotListingOwner();
        if (!listing.active) revert ListingNotActive();

        listing.active = false;
        uint256 amountToReturn = listing.amount;
        listing.amount = 0;

        carbonToken.safeTransferFrom(address(this), listing.seller, listing.tokenId, amountToReturn, "");

        emit ListingCancelled(listingId);
    }
}
