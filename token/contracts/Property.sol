pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Property is ERC1155 {
    // emitted when a user purchases shares listed by another user
    event PurchaseShares(address buyer, address seller, uint256 amount);
    // emitted when a user lists some portion of their shares for sale
    event ListShares(address seller, uint256 amount);
    // emitted when a user mints some of the supply of the collection
    event MintShares(address minter, uint256 amount);
    // emitted when a user withdraws the funds they have available within the contract
    // for example: a user listed shares, they sold, the user wants their funds out
    event WithdrawFunds(address withdrawalAddress, uint256 value);
    // emitted when funds are received into the contract
    event ReceiveFunds(address fromAddress, uint256 value);
    // emitted for each payment made to individual addresses after the shares-based split
    event ReceiveFundsPayout(address toAddress, uint256 value);

    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 TOKEN_ID = 0;
    mapping(address => Listing) public listings;
    mapping(address => uint256) public paymentBalances;

    struct Listing {
        uint256 price;
        uint256 amount;
    }

    uint256 public pricePerShare;
    uint256 public totalShares;
    uint256 public totalIssuedShares;
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

    function receiveFunds () public payable {
        // iterate over each holder
        for (uint i = 0; i < shareHolders.length(); i++) {
            address payable shareHolderAddr = payable(shareHolders.at(i));
            uint256 tokenBalance = balanceOf(shareHolderAddr, TOKEN_ID);

            if (tokenBalance > 0) {
                uint256 partialPayment = tokenBalance.div(totalIssuedShares).mul(msg.value);
                // paymentBalances[shareHolderAddr] = paymentBalances[shareHolderAddr].add(partialPayment);
                shareHolderAddr.transfer(partialPayment);
            }
        }
    }
}
