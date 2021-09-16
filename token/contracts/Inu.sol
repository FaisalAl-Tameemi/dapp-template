// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import "hardhat/console.sol"; // for console logger / debugging
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InuToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("InuToken", "INUT") {
        _mint(msg.sender, initialSupply);
    }
}
