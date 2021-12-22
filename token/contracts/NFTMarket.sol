pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NFTMarket {
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public balances;

    struct Listing {
        uint256 price;
        address seller;
    }

    function listItem (uint256 price, address contractAddress, uint256 tokenId) public {
        ERC1155 token = ERC1155(contractAddress);
        require(token.balanceOf(msg.sender, tokenId) > 0, "caller must own given token");
        require(token.isApprovedForAll(msg.sender, address(this)), "contract must be approved");

        listings[contractAddress][tokenId] = Listing(price, msg.sender);
    }

    function purchaseItem (address contactAddress, uint256 tokenId, uint256 count) public payable {
        ERC1155 token = ERC1155(contactAddress);
        Listing memory item = listings[contactAddress][tokenId];

        require(msg.value >= item.price * count, "insufficient funds sent");
        require(token.balanceOf(item.seller, tokenId) >= count, "insufficient amount from owner");

        balances[item.seller] += msg.value;
        token.safeTransferFrom(item.seller, msg.sender, tokenId, count, "");
    }

    function withdrawFunds (uint256 amount, address payable recipientAddress) public {
        require(balances[msg.sender] >= amount, "insufficient funds");

        recipientAddress.transfer(amount);
        balances[msg.sender] -= amount;
    }
}