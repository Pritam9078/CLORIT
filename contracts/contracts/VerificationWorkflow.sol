// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ProjectRegistry.sol";
import "./CarbonCreditToken.sol";
import "./IAccessControlManager.sol";

/**
 * @title VerificationWorkflow
 * @dev Multi-level verification system for carbon projects with strict state enforcement.
 */
contract VerificationWorkflow {
    
    IAccessControlManager public immutable access;
    ProjectRegistry public immutable projectRegistry;
    CarbonCreditToken public immutable carbonToken;

    struct VerificationRecord {
        address verifier;
        uint64 timestamp;
        bool approved;
        string dataHash; // External evidence IPFS hash
    }

    mapping(string => VerificationRecord) public ngoVerifications;
    mapping(string => VerificationRecord) public panchayatVerifications;
    mapping(string => VerificationRecord) public adminVerifications;

    // Custom Errors
    error InvalidState(ProjectRegistry.ProjectStatus currentStatus, ProjectRegistry.ProjectStatus expectedStatus);
    error NotApprovedByNGO();
    error NotApprovedByPanchayat();
    error AlreadyVerified();
    error InvalidRecipient();
    error Unauthorized();

    event NGOVerificationSubmitted(string indexed projectId, address indexed verifier, bool approved);
    event PanchayatApprovalSubmitted(string indexed projectId, address indexed verifier, bool approved);
    event AdminApprovalSubmitted(string indexed projectId, address indexed verifier, uint256 credits, bool approved);

    constructor(address _accessManager, address _projectRegistry, address _carbonToken) {
        if (_accessManager == address(0) || _projectRegistry == address(0) || _carbonToken == address(0)) revert InvalidRecipient();
        access = IAccessControlManager(_accessManager);
        projectRegistry = ProjectRegistry(_projectRegistry);
        carbonToken = CarbonCreditToken(_carbonToken);
    }

    modifier onlyNGO() {
        if (!access.isNGO(msg.sender)) revert Unauthorized();
        _;
    }

    modifier onlyPanchayat() {
        if (!access.isPanchayat(msg.sender)) revert Unauthorized();
        _;
    }

    modifier onlyAdmin() {
        if (!access.isAdmin(msg.sender)) revert Unauthorized();
        _;
    }

    /**
     * @notice NGO level verification - the first line of technical validation
     */
    function ngoVerify(
        string calldata projectId,
        string calldata dataHash,
        bool approve
    ) external onlyNGO {
        ProjectRegistry.Project memory project = projectRegistry.getProject(projectId);
        if (project.status != ProjectRegistry.ProjectStatus.Submitted) {
             revert InvalidState(project.status, ProjectRegistry.ProjectStatus.Submitted);
        }

        ngoVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: uint64(block.timestamp),
            approved: approve,
            dataHash: dataHash
        });

        if (approve) {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.NGOVerified);
        } else {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        }

        emit NGOVerificationSubmitted(projectId, msg.sender, approve);
    }

    /**
     * @notice Panchayat level verification - local community validation
     */
    function panchayatApprove(
        string calldata projectId,
        string calldata dataHash,
        bool approve
    ) external onlyPanchayat {
        ProjectRegistry.Project memory project = projectRegistry.getProject(projectId);
        if (project.status != ProjectRegistry.ProjectStatus.NGOVerified) {
             revert InvalidState(project.status, ProjectRegistry.ProjectStatus.NGOVerified);
        }
        if (!ngoVerifications[projectId].approved) revert NotApprovedByNGO();

        panchayatVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: uint64(block.timestamp),
            approved: approve,
            dataHash: dataHash
        });

        if (approve) {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.PanchayatReviewed);
        } else {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        }

        emit PanchayatApprovalSubmitted(projectId, msg.sender, approve);
    }

    /**
     * @notice Checks if NGO and Panchayat verifications are both approved
     */
    function isFullyApproved(string calldata projectId) public view returns (bool) {
        return ngoVerifications[projectId].approved && panchayatVerifications[projectId].approved;
    }

    /**
     * @notice NCCR level approval - calculates and mints credits
     */
    function approveAndMint(
        string calldata projectId,
        string calldata dataHash,
        string calldata metadataURI
    ) external onlyAdmin {
        require(isFullyApproved(projectId), "Not fully verified");
        
        ProjectRegistry.Project memory project = projectRegistry.getProject(projectId);
        require(!project.minted, "Already minted");

        // System calculates carbon credits (e.g. 10 CCT per hectare)
        uint256 carbonCredits = project.areaHectares * 10;

        adminVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: uint64(block.timestamp),
            approved: true,
            dataHash: dataHash
        });

        projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.AdminApproved);
        projectRegistry.recordIssuedCredits(projectId, carbonCredits);

        // Create project token if it doesn't exist yet
        uint256 tokenId = carbonToken.getTokenIdForProject(projectId);
        if (tokenId == 0) {
            carbonToken.createProjectToken(projectId, metadataURI);
        }

        // Mint newly approved credits to the project owner
        carbonToken.mintCredits(projectId, project.owner, carbonCredits);
        projectRegistry.markMinted(projectId);

        emit AdminApprovalSubmitted(projectId, msg.sender, carbonCredits, true);
    }

    /**
     * @notice NCCR level rejection
     */
    function rejectProject(
        string calldata projectId,
        string calldata dataHash
    ) external onlyAdmin {
        ProjectRegistry.Project memory project = projectRegistry.getProject(projectId);
        require(!project.minted, "Already minted");
        
        adminVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: uint64(block.timestamp),
            approved: false,
            dataHash: dataHash
        });

        projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        
        emit AdminApprovalSubmitted(projectId, msg.sender, 0, false);
    }
}
