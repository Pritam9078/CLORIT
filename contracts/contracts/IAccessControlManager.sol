// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAccessControlManager {
    function isAdmin(address account) external view returns (bool);
    function isNGO(address account) external view returns (bool);
    function isCorporate(address account) external view returns (bool);
    function isPanchayat(address account) external view returns (bool);
}
