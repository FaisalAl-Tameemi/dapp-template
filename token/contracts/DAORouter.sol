pragma solidity ^0.8.7;

import "./Property.sol";
import "./DAOToken.sol";
import "./shared/SharedStructs.sol";

contract DAORouter {
    string public daoName;
    address public governorAddress;
    address public governanceTokenAddress;

    mapping(address => Property) daoProperties;
    
    constructor (
        string memory _daoName, 
        address _governorAddress, 
        address _tokenAddress
    ) public {
        daoName = _daoName;
        governorAddress = _governorAddress;
        governanceTokenAddress = _tokenAddress;
    }

}