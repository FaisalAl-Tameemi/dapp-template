// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import "hardhat/console.sol"; // for console logger / debugging
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Memes is ERC1155 {
    uint256 public constant MIN_MINTING_PRICE = 1000;
    uint256 public constant COIN = 0;
    uint256 public constant CAR = 1;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, COIN, 10**18, "");
    }

    // for open-sea integration
    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                "https://game.example/api/item/",
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

    function algorithmicMint (uint256 nftClass) public payable {
        require(nftClass != COIN, "cannot mint the fungible coin associated with this contract dynamically");
        require(msg.value >= MIN_MINTING_PRICE, "insufficient amount of funds sent");

        // ??? -- how to mint a single NFT and set its URI?
        _mint(msg.sender, nftClass, 1, "");
    }
}
