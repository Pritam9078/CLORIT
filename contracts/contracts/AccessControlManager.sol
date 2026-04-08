// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title AccessControlManager
 * @dev Centralized Role-Based Access Control for the CLORIT platform.
 */
contract AccessControlManager is AccessControl {
    bytes32 public constant NGO_ROLE = keccak256("NGO_ROLE");
    bytes32 public constant CORPORATE_ROLE = keccak256("CORPORATE_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant PANCHAYAT_ROLE = keccak256("PANCHAYAT_ROLE");

    event RoleRequested(address indexed account, bytes32 indexed role);
    event RoleApproved(address indexed account, bytes32 indexed role);

    constructor() {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Allows a user to request a specific role (e.g., NGO or CORPORATE)
     * @param role The role identifier they are requesting
     */
    function requestRole(bytes32 role) external {
        require(role == NGO_ROLE || role == CORPORATE_ROLE, "AccessControlManager: Invalid role requested");
        emit RoleRequested(msg.sender, role);
    }

    /**
     * @notice Admin approves a role request, granting the role to the user
     * @param account The address of the user
     * @param role The role to grant
     */
    function approveRole(address account, bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(role, account);
        emit RoleApproved(account, role);
    }

    /**
     * @notice Overrides standard grantRole for additional access checking if needed later.
     * Inherits the base OpenZeppelin functionality.
     */
    function grantRole(bytes32 role, address account) public override onlyRole(getRoleAdmin(role)) {
        super.grantRole(role, account);
    }

    /**
     * @notice Utility to check if a user is an Admin
     */
    function isAdmin(address account) external view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @notice Utility to check if a user is an NGO
     */
    function isNGO(address account) external view returns (bool) {
        return hasRole(NGO_ROLE, account);
    }

    /**
     * @notice Utility to check if a user is a Panchayat representative
     */
    function isPanchayat(address account) external view returns (bool) {
        return hasRole(PANCHAYAT_ROLE, account);
    }

    /**
     * @notice Utility to check if a user is a Corporate entity
     */
    function isCorporate(address account) external view returns (bool) {
        return hasRole(CORPORATE_ROLE, account);
    }
}
