import { Link } from "react-router-dom";
import "./styles.css";
import { useAppSelector, useAppDispatch } from "../../utils/reduxhooks";
import { changeName } from "./CreateDAO/DaoCreationSlice";
import { Input } from "antd";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export default function BasicDetails() {
  const name = useAppSelector((state) => state.Alchemy.name);

  const dispatch = useAppDispatch();

  const { account } = useWeb3React<Web3Provider>();

  return (
    <>
      {account ? (
        <div className="alchemy--section--right">
          <h1 className="alchemy--section--title">BasicDetails</h1>
          <div className="alchemy--input--group">
            <h2 className="alchemy--section--subtitle ">DAO Name</h2>

            <Input
              value={name}
              onChange={(e) => dispatch(changeName(String(e.target.value)))}
              placeholder="Name"
              className="alchemy--input"
              style={{ width: 225 }}
              required
            ></Input>
          </div>
          <br />
          <div className="alchemy--bottom--links">
            <Link to="/Alchemy/create/governance">Next Section</Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
