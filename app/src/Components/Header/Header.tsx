import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./styles.css";
import { injected } from "../../utils/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
// import CollapsedNav from "./Collapse/CollapsedNav";
import wallet from "../../static/wallet.svg";

import { Popover } from "antd";

export default function Header() {
  let navigate = useNavigate();
  const location = useLocation();

  const [menuIsActive, setMenuIsActive] = useState(false);

  const { chainId, account, activate, deactivate, active, library } =
    useWeb3React<Web3Provider>();

  const _connectToMetamask = () => {
    activate(injected);
    console.log(activate(injected));
  };

  const titleWallet = <span>Wallet</span>;
  const content = (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <button onClick={() => deactivate()}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => _connectToMetamask()}>Connect</button>
      )}
    </div>
  );

  const pathName = location.pathname.toString();
  let isAlchemy = pathName.includes("Alchemy/");

  return (
    <div>
      <div className="header">
        <h1 className="header--logo">
          <button
            onClick={() => navigate(`/`)}
            className="header--logo--button"
          >
            bit<span className="header--logo--bolder">Properties</span>
          </button>
          {isAlchemy}
        </h1>

        {!isAlchemy ? (
          <nav>
            <ul className="header--nav">
              <li className="header--li">
                <button className="header--nav--actionbutton">
                  MARKETPLACE
                </button>
              </li>
              <li className="header--li">
                <a
                  className="header--nav--link"
                  href="https://app.gitbook.com/o/royHtkR6AKieNQ1UygU7/s/tgIrluxcjOTzLxDW1aVB/"
                >
                  WHITEPAPER
                </a>
              </li>
              <li className="header--li">
                <Link className="header--nav--link" to="Alchemy">
                  CREATE DAO
                </Link>
              </li>
              <li className="header--li">
                <Popover
                  placement="bottomRight"
                  title={titleWallet}
                  content={content}
                  trigger="click"
                  className="header--nav--link"
                >
                  <img src={wallet} alt="" />
                </Popover>
              </li>
              {/* <div
                className={`burger ${
                  menuIsActive ? `menu--is--active` : null
                } `}
                onClick={() => setMenuIsActive(!menuIsActive)}
              >
                <span className="menu--line"></span>
                <span className="menu--line"></span>
              </div> */}
            </ul>
          </nav>
        ) : null}
      </div>
      {/* <CollapsedNav {...MyxProps} /> */}
    </div>
  );
}
