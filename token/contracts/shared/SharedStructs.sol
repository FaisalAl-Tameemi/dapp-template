pragma solidity ^0.8.7;

library SharedStructs {
    struct percentages {
        uint256 airdropPercent;
        uint256 liquidityPoolPercent;
        uint256 burnPercent;
        uint256 developerPercent;
        uint256 marketingPercent;
    }

    struct addresses {
        address _airDropContractAddress;
        address _burnWalletAddress;
        address _liquidityWalletAddress;
        address payable _realEstateWalletAddress;
        address payable _marketingWalletAddress;
        address payable _developerWalletAddress;
    }
}