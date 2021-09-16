// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import "hardhat/console.sol"; // for console logger / debugging
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MemeToken is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
}
