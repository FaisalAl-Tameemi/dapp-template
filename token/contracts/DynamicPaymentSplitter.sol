pragma solidity ^0.8.7;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract DynamicPaymentSplitter is PaymentSplitter {
    constructor () PaymentSplitter([msg.sender], [100]) {}

    function updateShares(address payee, uint256 updatedShares) {}

    function updateSharesBulk(address[] payees, uint256[] updatedShares) {}
}