// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "./Uniswap.sol";
import "./shared/SharedStructs.sol";

/**
 * @title Bit Properties Token
 * @dev Governance token contract for DAOs launched via Bit Properties
 */
contract DAOToken is ERC20, Ownable, ERC20Permit, ERC20Votes {
    // Enum of payable wallet addresses types in the contract
    enum WalletType{ DEV, REALESTATE, MARKETING }
    // Mapping to exclude some contracts from fees. Transfers are excluded from fees if address in this mapping is recipient or sender.
    mapping (address => bool) public excludedFromFees;
    // Mapping to determine the timestamp of each address' investment. Earlier average investment = better air drop rewards.
    mapping (address => uint256) public airDropInvestTime;
    // Address of the contract responsible for the air dropping mechanism.
    address public airDropContractAddress;
    // Address of the contract for burning BPDT tokens.
    address public burnWalletAddress;
    // Real estate wallet address used to collect funds to purchase real estate.
    address payable public realEstateWalletAddress;
    // Liquidity wallet address used to hold the 30% of BPDT tokens for the liquidity pool.
    // After these coins are moved to the DEX, this address will no longer be used.
    address public liquidityWalletAddress;
    // Marketing wallet address used for funding marketing.
    address payable public marketingWalletAddress;
    // Developer wallet address used for funding the team.
    address payable public developerWalletAddress;
    // The PancakeSwap router address for swapping BPDT tokens for WBNB.
    address public uniswapRouterAddress;
    // The initial block timestamp of the token contract.
    uint256 public initialTimeStamp;
    // Real estate transaction fee - deployed at 3%.
    uint256 public realEstateTransactionFeePercent = 3;
    // Developer team transaction fee - deployed at 1%.
    uint256 public developerFeePercent = 1;
    // Marketing transaction fee - deployed at 1%.
    uint256 public marketingFeePercent = 1;
    // PancakeSwap router interface.
    IUniswapV2Router02 private uniswapRouter;
    // Address of the WBNB to BPDT token pair on PancakeSwap.
    address public uniswapPair;
    // Determines how many BPDT tokens this contract needs before it swaps for WBNB to pay fee wallets.
    uint256 public contractBPDTDivisor = 1000;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 initialSupply, 
        address _airDropContractAddress, 
        address _burnWalletAddress,
        address _liquidityWalletAddress,
        address payable _realEstateWalletAddress,
        address payable _marketingWalletAddress,
        address payable _developerWalletAddress,
        address _uniswapRouterAddress,
        SharedStructs.percentages memory _mintPercentages
    ) ERC20(tokenName, tokenSymbol) ERC20Permit(tokenName) {
            initialTimeStamp = block.timestamp;
            airDropContractAddress = _airDropContractAddress;
            realEstateWalletAddress = _realEstateWalletAddress;
            burnWalletAddress = _burnWalletAddress;
            liquidityWalletAddress = _liquidityWalletAddress;
            marketingWalletAddress = _marketingWalletAddress;
            developerWalletAddress = _developerWalletAddress;
            uniswapRouterAddress = _uniswapRouterAddress;

            excludedFromFees[realEstateWalletAddress] = true;
            excludedFromFees[developerWalletAddress] = true;
            excludedFromFees[marketingWalletAddress] = true;
            excludedFromFees[liquidityWalletAddress] = true;
            excludedFromFees[airDropContractAddress] = true;

            _mint(airDropContractAddress, initialSupply * _mintPercentages.airdropPercent / 100);
            _mint(liquidityWalletAddress, initialSupply * _mintPercentages.liquidityPoolPercent / 100);
            _mint(burnWalletAddress, initialSupply * _mintPercentages.burnPercent / 100);
            _mint(marketingWalletAddress, initialSupply * _mintPercentages.marketingPercent / 100);
            _mint(developerWalletAddress, initialSupply * _mintPercentages.developerPercent / 100);

            IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(uniswapRouterAddress);
            uniswapRouter = _uniswapV2Router;
            _approve(address(this), address(uniswapRouter), initialSupply);
            uniswapPair = IUniswapV2Factory(_uniswapV2Router.factory()).createPair(address(this), _uniswapV2Router.WETH());
            IERC20(uniswapPair).approve(address(uniswapRouter), type(uint256).max);
    }

    /**
     * @dev Returns the contract address
     * @return contract address
     */
    function getContractAddress() public view returns (address){
        return address(this);
    }

    /**
     * @dev Set the address of a specific-purpose wallet within the contract
     * @param walletAddr the new address to set
     * @param addrType an enum value to represent the purpose of the wallet whose new address is being set
     */
    function setWalletAddress(address payable walletAddr, WalletType addrType) public onlyOwner {
        if (addrType == WalletType.DEV) {
            developerWalletAddress = walletAddr;
        } else if (addrType == WalletType.MARKETING) {
            marketingWalletAddress = walletAddr;
        } else if (addrType == WalletType.REALESTATE) {
            realEstateWalletAddress = walletAddr;
        }
    }

    /**
    * @dev Adds a user to be excluded from fees.
    * @param user address of the user to be excluded from fees.
     */
    function excludeUserFromFees(address user) public onlyOwner {
        excludedFromFees[user] = true;
    }

    /**
    * @dev Gets the current timestamp, used for testing + verification
    * @return the the timestamp of the current block
     */
    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    /**
    * @dev Removes a user from the fee exclusion.
    * @param user address of the user than will now have to pay transaction fees.
     */
    function includeUsersInFees(address user) public onlyOwner {
        excludedFromFees[user] = false;
    }

    /**
     * @dev Overrides the BEP20 transfer function to include transaction fees.
     * @param recipient the recipient of the transfer
     * @param amount the amount to be transfered
     * @return bool representing if the transfer was successful
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        // Stops investors from owning more than 2% of the total supply from purchasing BPDT from PancakeSwap.
        if (_msgSender() == uniswapPair && !excludedFromFees[_msgSender()] && !excludedFromFees[recipient]) {
            require((balanceOf(recipient) + amount) < (totalSupply() / 166), "You can't have more than 2% of the total BPDT supply after a PancakeSwap swap.");
        }

        // If the sender or recipient is excluded from fees, perform the default transfer.
        if (excludedFromFees[_msgSender()] || excludedFromFees[recipient]) {
            transfer(recipient, amount);
            return true;
        }

        // Real estate transaction fee.
        uint256 realEstateFee = (amount * realEstateTransactionFeePercent) / 100;
        // Marketing team transaction fee.
        uint256 marketingFee = (amount * marketingFeePercent) / 100;
        // Developer team transaction fee.
        uint256 developerFee = (amount * developerFeePercent) / 100;

        // The total fee to send to the contract address.
        uint256 totalFee = realEstateFee + marketingFee + developerFee;
 
        // Sends the transaction fees to the contract address
        transfer(address(this), totalFee);

        uint256 contractBPDTBalance = balanceOf(address(this));

        if (_msgSender() != uniswapPair && contractBPDTBalance > 0) {
            if (contractBPDTBalance > 0) {
                if (contractBPDTBalance > balanceOf(uniswapPair) / contractBPDTDivisor) {
                    swapBPDTForBNB(contractBPDTBalance);
                }
            }
            uint256 contractBNBBalance = address(this).balance;
            if (contractBNBBalance > 0) {
                sendFeesToWallets(address(this).balance);
            }
        }
 
        // Sends [initial amount] - [fees] to the recipient
        uint256 valueAfterFees = amount - totalFee;
        transfer(recipient, valueAfterFees);
        return true;
    }

    /**
     * @dev Swaps BPDT tokens from transaction fees to BNB.
     * @param amount the amount of BPDT tokens to swap
     */
    function swapBPDTForBNB(uint256 amount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapRouter.WETH();
        _approve(address(this), address(uniswapRouter), amount);
        uniswapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    /**
     * @dev Sends BNB to transaction fee wallets after BPDT swaps.
     * @param amount the amount to be transfered
     */
    function sendFeesToWallets(uint256 amount) private {
        uint256 totalFee = realEstateTransactionFeePercent + marketingFeePercent + developerFeePercent;
        realEstateWalletAddress.transfer((amount * realEstateTransactionFeePercent) / totalFee);
        marketingWalletAddress.transfer((amount * marketingFeePercent) / totalFee);
        developerWalletAddress.transfer((amount * developerFeePercent) / totalFee);
    }

    /**
     * @dev Sends BNB to transaction fee wallets manually as opposed to happening automatically after a certain level of volume
     */
    function disperseFeesManually() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        sendFeesToWallets(contractBalance);
    }

    receive() external payable {}

    /**
     * @dev Sets the value that determines how many BPDT tokens need to be in the contract before it's swapped for BNB.
     * @param newDivisor the new divisor value to determine the swap threshold
     */
    function setContractBPDTDivisor(uint256 newDivisor) public onlyOwner {
        contractBPDTDivisor = newDivisor;
    }

    /**
     * @dev After a token transfer, update the recipient address's air drop invest time since they have a later investment now.
     * @param from the sender's address
     * @param to the recipient's address
     * @param value the amount that was transferred
     */
    function _afterTokenTransfer(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Votes) {
        uint256 userBalance = balanceOf(to);
        airDropInvestTime[to] = (value * block.timestamp + (userBalance - value) * airDropInvestTime[to]) / userBalance;
        super._afterTokenTransfer(from, to, value);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
