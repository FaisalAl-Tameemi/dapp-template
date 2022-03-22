import { Link } from "react-router-dom";
import { InputNumber, Switch, Input, Modal } from "antd";
import { useAppSelector } from "../../utils/reduxhooks";
import {
  changeTokenSymbol,
  changeInitTokenSupply,
} from "./CreateDAO/DaoCreationSlice";
import { useDispatch } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import PayableAccounts from "../DaoManager/CreateDAO/PayableAccount";
import { useEffect, useState } from "react";

export default function Tokenomics() {
  const dispatch = useDispatch();
  const tokenSymbol = useAppSelector((state) => state.Alchemy.tokenSymbol);
  const initTokenSupply = useAppSelector(
    (state) => state.Alchemy.initTokenSupply
  );

  const { account } = useWeb3React<Web3Provider>();
  const [totalPercent, setTotalPercent] = useState(0);
  const walletPercentages = useAppSelector((state) => {
    const walletPercentages = state.Alchemy.walletPercentages;
    return walletPercentages;
  });

  const { AirDropWallet, Burn, RealEstate, Marketing, Developer } =
    walletPercentages;

  useEffect(() => {
    setTotalPercent(AirDropWallet + Burn + RealEstate + Marketing + Developer);

    if (totalPercent > 100) {
      console.log("greater");
      console.log(totalPercent);
    }
  });

  const [visible, setVisible] = useState(false);

  const handleFinish = () => {
    if (totalPercent != 100) {
      setVisible(!visible);
    }
    return;
  };

  return (
    <>
      <Modal
        title="Modal"
        visible={visible}
        onOk={() => setVisible(!visible)}
        okText="Okay"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
      <div>
        {account ? (
          <div className="alchemy--section--right">
            <h1 className="alchemy--section--title">Tokenomics</h1>
            <div className="alchemy--input--group">
              <h2 className="alchemy--section--subtitle ">
                CreateERC-20 Token
              </h2>
              <Switch className="alchemy--switch" />
            </div>
            <div className="alchemy--input--group">
              <h3 className="alchemy--section--subtitle ">Token Symbol</h3>
              {/* change to string */}
              <Input
                maxLength={4}
                style={{ width: 100 }}
                type="string"
                value={tokenSymbol}
                onChange={(e) =>
                  dispatch(changeTokenSymbol(String(e.target.value)))
                }
                className="alchemy--input"
              />
            </div>
            <div className="alchemy--input--group">
              <h2 className="alchemy--section--subtitle ">
                Fixed Token Supply
              </h2>
              <Switch className="alchemy--switch" />
            </div>
            <div className="alchemy--input--group">
              <h3 className="alchemy--section--subtitle ">
                Initial Token Supply
              </h3>

              <InputNumber
                min={0}
                max={1000000000000}
                defaultValue={3}
                style={{ width: 225 }}
                className="alchemy--input"
                value={initTokenSupply}
                onChange={(value) =>
                  dispatch(changeInitTokenSupply(Number(value)))
                }
              />
            </div>
            <div className="alchemy--input--group">
              <h2 className="alchemy--section--subtitle ">Payouts</h2>
              <div className="alchemy--payout">
                <div className="column">
                  <ul>
                    <PayableAccounts />
                  </ul>
                  <div
                    // className="alchemy--wallet--totalpercentage"
                    style={{
                      color: totalPercent !== 100 ? "red" : "lightgreen ",
                    }}
                  >
                    {totalPercent !== 100 ? (
                      <>
                        Please make sure the total adds up to 100%
                        <br />
                        Total: ${totalPercent}%
                      </>
                    ) : (
                      `Total: ${totalPercent}%`
                    )}
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="alchemy--bottom--links">
              <Link to="/Alchemy/create/governance">Back</Link>
              {totalPercent === 100 ? (
                <Link to="/Alchemy/create/confirmation" onClick={handleFinish}>
                  Finish
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
