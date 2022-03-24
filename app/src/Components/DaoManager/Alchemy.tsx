import React from "react";
import "./styles.css";

import { Link } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { Button } from "antd";
import { injected } from "../../utils/connectors";

export default function Alchemy() {
  const { chainId, account, activate, deactivate, active, library } =
    useWeb3React<Web3Provider>();

  const _connectToMetamask = () => {
    activate(injected);
    console.log(activate(injected));
  };
  return (
    <div>
      <section>
        <div className="alchemy--intro">
          <div className="center">
            <h1 className="intro--title"> Welcome to bitProperties Alchemy</h1>
          </div>
          {account ? (
            <div className="center">
              <h1 style={{ color: `white` }}>Account: {account}</h1>
              <p>Continue with this account?</p>
              <Link to="create">CONTINUE</Link>
            </div>
          ) : (
            <div className="center">
              <p>You must be signed in to MetaMask to use this feature</p>
              <Button
                style={{
                  background: "transparent",
                  color: "white",
                }}
                onClick={() => _connectToMetamask()}
              >
                Sign in
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
