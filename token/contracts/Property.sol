pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Property is ERC1155 {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 TOKEN_ID = 0;
    mapping(address => Listing) public listings;
    mapping(address => uint256) public paymentBalances;

    struct Listing {
        uint256 price;
        uint256 amount;
    }

    uint256 pricePerShare;
    uint256 totalShares;
    uint256 totalIssuedShares;
    EnumerableSet.AddressSet private shareHolders;

    constructor(string memory _baseUrl, uint256 _pricePerShare, uint256 _totalShares) public ERC1155(_baseUrl) {
        pricePerShare = _pricePerShare;
        totalShares = _totalShares;
    }

    function mint(uint256 amountOfTokens) public payable {
        require(msg.value >= amountOfTokens.mul(pricePerShare), "Invalid payment amount");
        require(totalIssuedShares.add(amountOfTokens) <= totalShares, "Invalid amount of supply");

        _mint(msg.sender, TOKEN_ID, amountOfTokens, "");

        totalIssuedShares = totalIssuedShares.add(amountOfTokens);
        shareHolders.add(msg.sender);

        // TODO: emit event for issuing of shares
    }

    function listShares (uint256 price, uint256 amount) public {
        require(balanceOf(msg.sender, TOKEN_ID) >= amount, "caller must own given token");
        require(isApprovedForAll(msg.sender, address(this)), "contract must be approved");

        listings[msg.sender] = Listing(price, amount);

        // TODO: emit event for listing shares
    }

    function purchaseShares (address listingId, uint256 amountToPurchase) public payable {
        require(msg.value >= listings[listingId].price.mul(amountToPurchase), "insufficient funds sent");
        require(amountToPurchase <= listings[listingId].amount, "invalid amount of shares requested");
        require(balanceOf(listingId, TOKEN_ID) >= amountToPurchase, "insufficient amount from owner");

        paymentBalances[listingId] += msg.value;
        safeTransferFrom(listingId, msg.sender, TOKEN_ID, amountToPurchase, "");
        
        if (amountToPurchase == listings[listingId].amount) {
            delete listings[listingId];
        } else {
            listings[listingId] = Listing(listings[listingId].price, listings[listingId].amount.sub(amountToPurchase));
        }

        shareHolders.add(msg.sender);

        // TODO: emit purchase shares event
    }

    function withdrawFunds (uint256 amount, address payable recipientAddress) public {
        require(paymentBalances[msg.sender] >= amount, "insufficient funds");

        recipientAddress.transfer(amount);
        paymentBalances[msg.sender] -= amount;
    }

    function receiveRewards () public payable {
        // iterate over each holder
        for (uint i = 0; i < shareHolders.length(); i++) {
            address shareHolderAddr = shareHolders.at(i);
            uint256 tokenBalance = balanceOf(shareHolderAddr, TOKEN_ID);

            if (tokenBalance > 0) {
                uint256 partialPayment = tokenBalance.div(totalIssuedShares).mul(msg.value);
                paymentBalances[shareHolderAddr] = paymentBalances[shareHolderAddr].add(partialPayment);
            }
        }
    }
}