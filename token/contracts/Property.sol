pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./DynamicPaymentSplitter.sol";

contract Property is ERC1155 {
    using SafeMath for uint256;

    uint256 TOKEN_ID = 0;
    mapping(address => Listing) public listings;
    mapping(address => uint256) public balances;

    struct Listing {
        uint256 price;
        uint256 amount;
    }

    uint256 pricePerShare;
    uint256 totalShares;
    uint256 totalIssuedShares;
    DynamicPaymentSplitter paymentSplitter;

    constructor(string memory _baseUrl, uint256 memory _pricePerShare, uint256 memory _totalShares) public ERC1155(_baseUrl) {
        pricePerShare = _pricePerShare;
        totalShares = _totalShares;
        paymentSplitter = new DynamicPaymentSplitter();
    }

    function mint(uint256 amountOfTokens) public payable {
        require(msg.value >= amountOfTokens.mul(pricePerShare), "Invalid payment amount");
        require(totalIssuedShares.add(amountOfTokens) <= totalShares, "Invalid amount of supply");

        _mint(msg.sender, TOKEN_ID, amountOfTokens, "");

        totalIssuedShares = totalIssuedShares.add(amountOfTokens);

        // TODO: emit event for issuing of shares
    }

    function listShares (uint256 price, uint256 amount) public {
        require(balanceOf(msg.sender, TOKEN_ID) >= amount, "caller must own given token");
        require(isApprovedForAll(msg.sender, address(this)), "contract must be approved");

        listings[msg.sender] = Listing(price, amount);

        // TODO: emit event for listing shares
    }

    function purchaseShares (uint256 listingId, uint256 amountToPurchase) public payable {
        listing = listings[listingId];
        
        require(msg.value >= listing.price.mul(amountToPurchase), "insufficient funds sent");
        require(amountToPurchase <= listing.amount, "invalid amount of shares requested");
        require(balanceOf(listingId, TOKEN_ID) >= amountToPurchase, "insufficient amount from owner");

        balances[listingId] += msg.value;
        safeTransferFrom(listingId, msg.sender, TOKEN_ID, amountToPurchase, "");
        
        if (amountToPurchase == listing.amount) {
            delete listings[listingId];
        } else {
            listings[listingId] = Listing(listing.price, listing.amount.sub(amountToPurchase));
        }

        // TODO: emit purchase shares event
    }

    function withdrawFunds (uint256 amount, address payable recipientAddress) public {
        require(balances[msg.sender] >= amount, "insufficient funds");

        recipientAddress.transfer(amount);
        balances[msg.sender] -= amount;
    }
}