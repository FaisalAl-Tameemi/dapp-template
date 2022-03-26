import React from "react";
import "./styles.css";
import { useAppSelector } from "../../utils/reduxhooks";
import { ethers } from "ethers";
import DAOFactoryABI from "../../artifacts/contracts/DAOFactory.sol/DAOFactory.json";
import { useWeb3React } from "@web3-react/core";

export default function Confirmation() {
  const DAOFactoryAddress = "0x4bf010f1b9beda5450a8dd702ed602a104ff65ee";

  const name = useAppSelector((state) => state.Alchemy.name);

  const inputs = useAppSelector((state) => {
    const governance = state.Alchemy;
    return governance;
  });

  const walletAddresses = useAppSelector((state) => {
    const walletAddresses = state.Alchemy.walletAddresses;
    return walletAddresses;
  });
  const walletPercentages = useAppSelector((state) => {
    const walletPercentages = state.Alchemy.walletPercentages;
    return walletPercentages;
  });

  const {
    AirDropAddress,
    LiquidityAddress,
    BurnAddress,
    RealEstateAddress,
    MarketingAddress,
    DeveloperAddress,
  } = walletAddresses;

  const { AirDropWallet, Liquidity, Burn, RealEstate, Marketing, Developer } =
    walletPercentages;

  let uniswapRouterAddress: string =
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const context = useWeb3React();
  const { library } = context;

  const handleSubmit = async () => {
    try {
      const signer = library.getSigner();
      const factory = await new ethers.Contract(
        DAOFactoryAddress,
        DAOFactoryABI.abi,
        signer
      );

      const launchDAOTxn = await factory.launchDAO(
        inputs.name,
        inputs.tokenName,
        inputs.tokenSymbol,
        inputs.initTokenSupply,
        {
          _airDropContractAddress: AirDropAddress,
          _burnWalletAddress: LiquidityAddress,
          _liquidityWalletAddress: BurnAddress,
          _realEstateWalletAddress: RealEstateAddress,
          _marketingWalletAddress: MarketingAddress,
          _developerWalletAddress: DeveloperAddress,
        },
        uniswapRouterAddress,
        {
          airdropPercent: AirDropWallet,
          liquidityPoolPercent: Liquidity,
          burnPercent: Burn,
          developerPercent: Developer,
          marketingPercent: Marketing,
        }
      );

      const resp = await launchDAOTxn.wait();
      console.log("DAO Launched", resp);

      const event = resp.events?.find((event: any) => event.event === "NewDAO");
      console.log("Event:", event);

      const [daoRouterAddress, daoTokenAddress, daoGovernorAddress] =
        event?.args as any;
      console.log(daoRouterAddress, daoTokenAddress, daoGovernorAddress);
    } catch (error) {
      console.log("launchDAO error", error);
    }
  };

  return (
    <>
      <div className="alchemy--section--right">
        <h1 className="alchemy--section--title">Confirmation</h1>
        <div>
          <h2 className="alchemy--section--subtitle">Basic Info</h2>
          <div className="alchemy--confirmation" style={{ margin: "30px 0px" }}>
            <p>Dao Name:</p>
            <p className="alchemy--confirmation--result">{name}</p>
          </div>
        </div>
        {/* //////////////////////// //////////////////////// //////////////////////// //////////////////////// */}
        <div>
          <h2 className="alchemy--section--subtitle">Governance</h2>
          <div className="alchemy--confirmation" style={{ marginTop: 30 }}>
            <p>Proposal Passing Percentage: </p>
            <p className="alchemy--confirmation--result">
              {inputs.proposalPassing} %
            </p>
          </div>
          <div className="alchemy--confirmation">
            <p>Vote Duration: </p>
            <p className="alchemy--confirmation--result">
              {inputs.voteDurationWeeks} Weeks {inputs.voteDurationDays} Days
            </p>
          </div>
        </div>
        {/* //////////////////////// //////////////////////// //////////////////////// //////////////////////// */}
        <div>
          <h2 className="alchemy--section--subtitle" style={{ marginTop: 30 }}>
            Tokenomics
          </h2>
          <div className="alchemy--confirmation">
            <p>Token Name</p>
            <p className="alchemy--confirmation--result">{inputs.tokenName}</p>
          </div>
          <div className="alchemy--confirmation">
            <p>Token Symbol</p>
            <p className="alchemy--confirmation--result">
              {inputs.tokenSymbol}
            </p>
          </div>
          <div className="alchemy--confirmation">
            <p>Initial Token Supply</p>
            <p className="alchemy--confirmation--result">
              {inputs.initTokenSupply.toLocaleString()}
            </p>
          </div>
        </div>
        {/* //////////////////////// //////////////////////// //////////////////////// //////////////////////// */}
        <div>
          <h2 className="alchemy--section--subtitle" style={{ marginTop: 30 }}>
            Payouts
          </h2>
          <div className="alchemy--confirmation wallet">
            <p style={{ width: 215 }}>AirDrop Wallet</p>
            <p className="alchemy--confirmation--result">{AirDropAddress}</p>
            <p>{AirDropWallet}%</p>
          </div>
          <div className="alchemy--confirmation wallet">
            <p style={{ width: 215 }}>AirDrop Wallet</p>
            <p className="alchemy--confirmation--result">{LiquidityAddress}</p>
            <p>{Liquidity}%</p>
          </div>
          <div className="alchemy--confirmation wallet">
            <p style={{ width: 215 }}>Burn Wallet</p>
            <p className="alchemy--confirmation--result">{BurnAddress}</p>
            <p>{Burn}%</p>
          </div>
          <div className="alchemy--confirmation wallet">
            <p style={{ width: 215 }}>Real Estate Wallet</p>
            <p className="alchemy--confirmation--result">{RealEstateAddress}</p>
            <p>{RealEstate}%</p>
          </div>
          <div className="alchemy--confirmation wallet">
            <p style={{ width: 215 }}>Marketing Wallet</p>
            <p className="alchemy--confirmation--result">{MarketingAddress}</p>
            <p>{Marketing}%</p>
          </div>
          <div
            className="alchemy--confirmation wallet"
            style={{ marginBottom: 50 }}
          >
            <p style={{ width: 215 }}>Developer Wallet</p>
            <p className="alchemy--confirmation--result">{DeveloperAddress}</p>
            <p>{Developer}%</p>
          </div>
        </div>
        <button className="header--nav--actionbutton" onClick={handleSubmit}>
          CREATE
        </button>
      </div>
    </>
  );
}
