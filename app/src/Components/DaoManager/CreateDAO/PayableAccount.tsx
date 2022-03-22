import { Input, InputNumber } from "antd";
import "../styles.css";
import { useAppSelector } from "../../../utils/reduxhooks";
import {
  changeAirdropWalletPercentage,
  changeBurnWalletPercentage,
  changeDeveloperWalletPercentage,
  changeMarketingWalletPercentage,
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

  useEffect(() => {
    setTotalPercent(
      walletPercentages.AirDropWallet +
        walletPercentages.Burn +
        walletPercentages.RealEstate +
        walletPercentages.Marketing +
        walletPercentages.Developer
    );

    if (totalPercent > 100) {
      console.log("greater");
      console.log(totalPercent);
    }
  });

  return (
    <>
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div className="alchemy--account--type ">AirDrop Wallet</div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{ width: 400 }}
            className="alchemy--input middle"
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
          <div className="alchemy--account--type ">BurnWallet Wallet</div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{ width: 400 }}
            className="alchemy--input middle"
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
          <div className="alchemy--account--type ">RealEstate Wallet</div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{ width: 400 }}
            className="alchemy--input middle"
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
          <div className="alchemy--account--type ">Marketing Wallet</div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{ width: 400 }}
            className="alchemy--input middle"
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
      <div className="alchemy--payout">
        <div className="align--middle column">
          {/* <h3 className="alchemy--section--subtitle">Type</h3> */}
          <div className="alchemy--account--type ">Developer Wallet</div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
          <Input
            placeholder="Address"
            style={{ width: 400 }}
            className="alchemy--input middle"
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
