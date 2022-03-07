import React from "react";
import { useNavigate } from "react-router";
import "./styles.css";
import { injected } from "../../utils/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export default function Header() {
  let navigate = useNavigate();

  const { activate } = useWeb3React<Web3Provider>();

  const _connectToMetamask = () => {
    activate(injected);
    console.log(activate(injected));
  };

  return (
    <div className="header">
      <h1 className="header--logo">
        <button onClick={() => navigate(`/`)} className="header--logo--button">
          bit<span className="header--logo--bolder">Properties</span>
        </button>
      </h1>
      <nav>
        <ul className="header--nav">
          <li>
            <button className="header--nav--link">
              <a href="https://app.gitbook.com/o/royHtkR6AKieNQ1UygU7/s/tgIrluxcjOTzLxDW1aVB/">
                WHITEPAPER
              </a>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(`../DaoManager`)}
              className="header--nav--link"
            >
              CREATE DAO
            </button>
          </li>
          <li>
            <button
              className="header--connect"
              onClick={() => _connectToMetamask()}
            >
              connect wallet
            </button>
          </li>
          <div className="burger">
            <div className="menu--line"></div>
            <div className="menu--line"></div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
