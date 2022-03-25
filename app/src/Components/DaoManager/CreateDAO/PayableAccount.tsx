import { Input, InputNumber } from "antd";
import "../styles.css";
import { useAppSelector } from "../../../utils/reduxhooks";
import {
  changeAirdropWalletAddress,
  changeAirdropWalletPercentage,
  changeBurnWalletAddress,
  changeBurnWalletPercentage,
  changeDeveloperWalletAddress,
  changeDeveloperWalletPercentage,
  changeLiquidityWalletAddress,
  changeLiquidityWalletPercentage,
  changeMarketingWalletAddress,
  changeMarketingWalletPercentage,
  changeRealEstateWalletAddress,
  changeRealEstateWalletPercentage,
} from "../CreateDAO/DaoCreationSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function PayableAccounts() {
  const dispatch = useDispatch();

  const [totalPercent, setTotalPercent] = useState(0);

  const walletPercentages = useAppSelector(
    // (state) => state.Alchemy.walletPercentages.walletPercentagesWallet
    (state) => {
      const walletPercentages = state.Alchemy.walletPercentages;
      return walletPercentages;
    }
  );

  const walletAddresses = useAppSelector((state) => {
    const walletAddresses = state.Alchemy.walletAddresses;
    return walletAddresses;
  });

  const {
    AirDropAddress,
    LiquidityAddress,
    BurnAddress,
    RealEstateAddress,
    MarketingAddress,
    DeveloperAddress,
  } = walletAddresses;

  useEffect(() => {
    setTotalPercent(
      walletPercentages.AirDropWallet +
        walletPercentages.Liquidity +
        walletPercentages.Burn +
        walletPercentages.RealEstate +
        walletPercentages.Marketing +
        walletPercentages.Developer
    );
  });

  const isCompleted = (wallet: any) => {
    if (wallet.length === 42 && totalPercent === 100) {
      return { color: "lightGreen", fontWeight: 600 };
    } else return;
  };

  return (
    <>
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type"
            style={isCompleted(AirDropAddress)}
          >
            AirDrop Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                AirDropAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={AirDropAddress}
            onChange={(e) =>
              dispatch(changeAirdropWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            placeholder="%"
            max={100}
            style={{ width: 100 }}
            className="alchemy--input"
            typeof="number"
            onChange={(value) =>
              dispatch(changeAirdropWalletPercentage(Number(value)))
            }
            value={walletPercentages.AirDropWallet}
          ></InputNumber>
        </div>
      </div>
      {/* ================================================================================================================ */}
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type "
            style={isCompleted(LiquidityAddress)}
          >
            Liquidity Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                LiquidityAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={LiquidityAddress}
            onChange={(e) =>
              dispatch(changeLiquidityWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            placeholder="%"
            style={{ width: 100 }}
            className="alchemy--input"
            max={100}
            typeof="number"
            onChange={(value) =>
              dispatch(changeLiquidityWalletPercentage(Number(value)))
            }
            value={walletPercentages.Liquidity}
          ></InputNumber>
        </div>
      </div>
      {/* ================================================================================================================ */}
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type "
            style={isCompleted(BurnAddress)}
          >
            BurnWallet Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                BurnAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={BurnAddress}
            onChange={(e) =>
              dispatch(changeBurnWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            placeholder="%"
            style={{ width: 100 }}
            className="alchemy--input"
            max={100}
            typeof="number"
            onChange={(value) =>
              dispatch(changeBurnWalletPercentage(Number(value)))
            }
            value={walletPercentages.Burn}
          ></InputNumber>
        </div>
      </div>
      {/* ================================================================================================================ */}
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type "
            style={isCompleted(BurnAddress)}
          >
            RealEstate Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                RealEstateAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={RealEstateAddress}
            onChange={(e) =>
              dispatch(changeRealEstateWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            max={100}
            placeholder="%"
            style={{ width: 100 }}
            className="alchemy--input"
            typeof="number"
            onChange={(value) =>
              dispatch(changeRealEstateWalletPercentage(Number(value)))
            }
            value={walletPercentages.RealEstate}
          ></InputNumber>
        </div>
      </div>
      {/* ================================================================================================================ */}
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type "
            style={isCompleted(BurnAddress)}
          >
            Marketing Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                MarketingAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={MarketingAddress}
            onChange={(e) =>
              dispatch(changeMarketingWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            max={100}
            placeholder="%"
            style={{ width: 100 }}
            className="alchemy--input"
            typeof="number"
            onChange={(value) =>
              dispatch(changeMarketingWalletPercentage(Number(value)))
            }
            value={walletPercentages.Marketing}
          ></InputNumber>
        </div>
      </div>
      {/* ================================================================================================================ */}
      <div className="alchemy--payout" style={{ marginBottom: 50 }}>
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div
            className="alchemy--account--type "
            style={isCompleted(BurnAddress)}
          >
            Developer Wallet
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{
              width: 400,
              border:
                DeveloperAddress.length === 42
                  ? "2px solid lightgreen"
                  : "1px solid white",
            }}
            className="alchemy--input middle"
            value={DeveloperAddress}
            onChange={(e) =>
              dispatch(changeDeveloperWalletAddress(String(e.target.value)))
            }
          ></Input>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Allocation</h3>
          <InputNumber
            max={100}
            placeholder="%"
            style={{ width: 100 }}
            className="alchemy--input"
            typeof="number"
            onChange={(value) =>
              dispatch(changeDeveloperWalletPercentage(Number(value)))
            }
            value={walletPercentages.Developer}
          ></InputNumber>
        </div>
      </div>
    </>
  );
}
