// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IAccessControlManager.sol";

/**
 * @title ProjectRegistry
 * @dev Registry for blue carbon restoration projects with GPS and metadata support.
 */
contract ProjectRegistry {
    IAccessControlManager public immutable access;
    address public verificationWorkflow; // The central orchestrator

    enum ProjectStatus {
        Submitted,
        NGOVerified,
        PanchayatReviewed,
        AdminApproved,
        Active,
        Rejected
    }

    enum LandType {
        Mangrove,
        Seagrass,
        SaltMarsh,
        Other
    }

    struct Project {
        address owner;
        uint64 registrationDate;
        int32 latitude;          // GPS Latitude * 10^6
        int32 longitude;         // GPS Longitude * 10^6
        uint32 areaHectares;     // Area in hectares
        ProjectStatus status;
        LandType landType;
        bool exists;
        uint256 estimatedCarbonCredits;
        uint256 issuedCarbonCredits;
        string projectId;
        string metadataURI;
        bool minted;
    }

    mapping(string => Project) private projects;
    string[] private allProjectIds;
    mapping(address => string[]) private ownerProjects;

    // Custom Errors
    error ProjectAlreadyExists(string projectId);
    error ProjectDoesNotExist(string projectId);
    error InvalidProjectId();
    error Unauthorized();
    error InvalidAddress();

    event ProjectRegistered(string indexed projectId, address indexed owner, LandType landType);
    event ProjectStatusUpdated(string indexed projectId, ProjectStatus newStatus);
    event CarbonCreditsEstimated(string indexed projectId, uint256 amount);
    event CarbonCreditsIssued(string indexed projectId, uint256 amount);

    constructor(address _accessManager) {
        if (_accessManager == address(0)) revert InvalidAddress();
        access = IAccessControlManager(_accessManager);
    }

    modifier onlyAdmin() {
        if (!access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    modifier onlyVerifierOrAdmin() {
        if (msg.sender != verificationWorkflow && !access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    /**
     * @notice Admin configures the verifier workflow authorized to mutate states
     */
    function setVerificationWorkflow(address _verificationWorkflow) external onlyAdmin {
        if (_verificationWorkflow == address(0)) revert InvalidAddress();
        verificationWorkflow = _verificationWorkflow;
    }

    /**
     * @notice Registers a new blue carbon project
     */
    function registerProject(
        string calldata projectId,
        string calldata metadataURI,
        uint32 areaHectares,
        int32 latitude,
        int32 longitude,
        LandType landType
    ) external returns (bool) {
        // Enforce role-based access control checking dynamically using the external registry
        if (!access.isNGO(msg.sender) && !access.isAdmin(msg.sender)) {
            revert Unauthorized();
        }

        if (projects[projectId].exists) revert ProjectAlreadyExists(projectId);
        if (bytes(projectId).length == 0) revert InvalidProjectId();

        projects[projectId] = Project({
            owner: msg.sender,
            registrationDate: uint64(block.timestamp),
            latitude: latitude,
            longitude: longitude,
            areaHectares: areaHectares,
            status: ProjectStatus.Submitted,
            landType: landType,
            exists: true,
            estimatedCarbonCredits: 0,
            issuedCarbonCredits: 0,
            projectId: projectId,
            metadataURI: metadataURI,
            minted: false
        });

        allProjectIds.push(projectId);
        ownerProjects[msg.sender].push(projectId);

        emit ProjectRegistered(projectId, msg.sender, landType);
        return true;
    }

    function updateProjectStatus(string calldata projectId, ProjectStatus newStatus)
        external
        onlyVerifierOrAdmin
    {
        if (!projects[projectId].exists) revert ProjectDoesNotExist(projectId);
        projects[projectId].status = newStatus;
        emit ProjectStatusUpdated(projectId, newStatus);
    }

    function markMinted(string calldata projectId)
        external
        onlyVerifierOrAdmin
    {
        if (!projects[projectId].exists) revert ProjectDoesNotExist(projectId);
        projects[projectId].minted = true;
    }

    function setEstimatedCredits(string calldata projectId, uint256 estimatedCredits)
        external
        onlyVerifierOrAdmin
    {
        if (!projects[projectId].exists) revert ProjectDoesNotExist(projectId);
        projects[projectId].estimatedCarbonCredits = estimatedCredits;
        emit CarbonCreditsEstimated(projectId, estimatedCredits);
    }

    function recordIssuedCredits(string calldata projectId, uint256 issuedCredits)
        external
        onlyVerifierOrAdmin
    {
        if (!projects[projectId].exists) revert ProjectDoesNotExist(projectId);
        projects[projectId].issuedCarbonCredits = issuedCredits;
        emit CarbonCreditsIssued(projectId, issuedCredits);
    }

    function getProject(string calldata projectId) external view returns (Project memory) {
        if (!projects[projectId].exists) revert ProjectDoesNotExist(projectId);
        return projects[projectId];
    }

    function getProjectsByOwner(address owner) external view returns (string[] memory) {
        return ownerProjects[owner];
    }

    function getTotalProjects() external view returns (uint256) {
        return allProjectIds.length;
    }

    function getAllProjectIds() external view returns (string[] memory) {
        return allProjectIds;
    }
}
