// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IAccessControlManager.sol";

/**
 * @title CarbonCreditToken
 * @dev Optimized ERC-1155 token for carbon credits strictly secured by AccessControlManager.
 */
contract CarbonCreditToken is ERC1155, ERC1155Supply {
    using Strings for uint256;

    IAccessControlManager public immutable access;
    address public workflowManager; // The contract authorized to mint automatically

    uint256 private _currentTokenId;

    mapping(uint256 => string) public tokenToProject;
    mapping(string => uint256) public projectToToken;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) public retiredCredits;
    mapping(string => bool) public isMinted;

    // Custom Errors for gas optimization
    error Unauthorized();
    error ProjectAlreadyExists(string projectId);
    error ProjectDoesNotExist(string projectId);
    error InsufficientBalance(address account, uint256 tokenId, uint256 balance);
    error InvalidAddress();

    event ProjectTokenCreated(uint256 indexed tokenId, string indexed projectId);
    event CreditsMinted(uint256 indexed tokenId, address indexed recipient, uint256 amount);
    event CreditsRetired(uint256 indexed tokenId, address indexed account, uint256 amount);

    constructor(address _accessManager) ERC1155("") {
        if (_accessManager == address(0)) revert InvalidAddress();
        access = IAccessControlManager(_accessManager);
    }

    modifier onlyAdmin() {
        if (!access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    modifier onlyMinterOrAdmin() {
        if (msg.sender != workflowManager && !access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    /**
     * @notice Admin helper to set the central verification workflow
     */
    function setWorkflowManager(address _workflow) external onlyAdmin {
        if (_workflow == address(0)) revert InvalidAddress();
        workflowManager = _workflow;
    }

    /**
     * @notice Creates a new token ID for a specific restoration project
     */
    function createProjectToken(string calldata projectId, string calldata metadataURI)
        external
        onlyMinterOrAdmin
        returns (uint256)
    {
        if (projectToToken[projectId] != 0) revert ProjectAlreadyExists(projectId);

        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;

        tokenToProject[newTokenId] = projectId;
        projectToToken[projectId] = newTokenId;
        _tokenURIs[newTokenId] = metadataURI;

        emit ProjectTokenCreated(newTokenId, projectId);
        return newTokenId;
    }

    /**
     * @notice Mints credits for an approved project
     */
    function mintCredits(
        string calldata projectId,
        address recipient,
        uint256 amount
    ) external {
        require(msg.sender == workflowManager, "Unauthorized minter");
        require(!isMinted[projectId], "Already minted");

        uint256 tokenId = projectToToken[projectId];
        if (tokenId == 0) revert ProjectDoesNotExist(projectId);

        isMinted[projectId] = true;

        _mint(recipient, tokenId, amount, "");
        emit CreditsMinted(tokenId, recipient, amount);
    }

    /**
     * @notice Allows users to retire their credits (effectively "using" them for offsetting)
     */
    function retireCredits(uint256 tokenId, uint256 amount) external {
        if (balanceOf(msg.sender, tokenId) < amount) {
            revert InsufficientBalance(msg.sender, tokenId, balanceOf(msg.sender, tokenId));
        }

        _burn(msg.sender, tokenId, amount);
        retiredCredits[tokenId] += amount;

        emit CreditsRetired(tokenId, msg.sender, amount);
    }

    /**
     * @notice Administrative burn from a specific account
     */
    function burnFrom(address account, uint256 tokenId, uint256 amount) external onlyAdmin {
        _burn(account, tokenId, amount);
        retiredCredits[tokenId] += amount;
    }

    /**
     * @notice Returns total minted - total retired for a specific tokenId
     */
    function currentSupply(uint256 tokenId) public view returns (uint256) {
        return totalSupply(tokenId); // ERC1155Supply tracks actual circulating supply automatically
    }

    /**
     * @notice Returns the total amount of credits ever minted for this project
     */
    function totalHistoricalMinted(uint256 tokenId) external view returns (uint256) {
        return totalSupply(tokenId) + retiredCredits[tokenId];
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getProjectInfo(uint256 tokenId)
        external
        view
        returns (
            string memory projectId,
            uint256 currentCirculatingSupply,
            uint256 totalRetired,
            string memory metadataURI
        )
    {
        projectId = tokenToProject[tokenId];
        currentCirculatingSupply = totalSupply(tokenId);
        totalRetired = retiredCredits[tokenId];
        metadataURI = _tokenURIs[tokenId];
    }

    function getTokenIdForProject(string calldata projectId) external view returns (uint256) {
        return projectToToken[projectId];
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
