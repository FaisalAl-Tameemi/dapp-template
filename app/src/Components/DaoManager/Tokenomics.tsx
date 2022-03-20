import { Link } from "react-router-dom";
import { InputNumber, Switch, Input } from "antd";
import { useAppSelector } from "../../utils/reduxhooks";
import {
  changeTokenSymbol,
  changeInitTokenSupply,
} from "./CreateDAO/DaoCreationSlice";
import { useDispatch } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export default function Tokenomics() {
  const dispatch = useDispatch();
  const tokenSymbol = useAppSelector((state) => state.Alchemy.tokenSymbol);
  const initTokenSupply = useAppSelector(
    (state) => state.Alchemy.initTokenSupply
  );

  const { account } = useWeb3React<Web3Provider>();

  return (
    <div>
      {account ? (
        <div className="alchemy--section--right">
          <h1 className="alchemy--section--title">Tokenomics</h1>
          <div className="alchemy--input--group">
            <h2 className="alchemy--section--subtitle ">CreateERC-20 Token</h2>
            <Switch className="alchemy--switch" />
          </div>
          <div className="alchemy--input--group">
            <h3 className="alchemy--section--subtitle ">Token Symbol</h3>
            {/* change to string */}
            <Input
              maxLength={4}
              style={{ color: `black`, width: 100 }}
              type="string"
              value={tokenSymbol}
              onChange={(e) =>
                dispatch(changeTokenSymbol(String(e.target.value)))
              }
              className="alchemy--input"
            />
          </div>
          <div className="alchemy--input--group">
            <h2 className="alchemy--section--subtitle ">Fixed Token Supply</h2>
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
              style={{ color: `black`, width: 225 }}
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
              <div>
                <h3 className="alchemy--section--subtitle">Name</h3>
                <Input
                  placeholder="Name"
                  // prefix={<UserOutlined />}
                  style={{ width: 200 }}
                  className="alchemy--input"
                ></Input>
              </div>
              <div style={{ marginLeft: 20 }}>
                <h3 className="alchemy--section--subtitle ">Wallet Address</h3>
                <Input
                  placeholder="Address"
                  style={{ width: 400 }}
                  className="alchemy--input"
                ></Input>
              </div>
              <div style={{ marginLeft: 20 }}>
                <h3 className="alchemy--section--subtitle ">Allocation</h3>
                <Input
                  placeholder="%"
                  style={{ width: 100 }}
                  className="alchemy--input"
                ></Input>
              </div>
            </div>
          </div>

          <br />
          <div className="alchemy--bottom--links">
            <Link to="/Alchemy/create/governance">Back</Link>
            <Link to="/Alchemy/create/confirmation">Finish</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
