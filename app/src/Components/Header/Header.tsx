import React from "react";
import { useNavigate } from "react-router";
import "./styles.css";

export default function Header() {
  let navigate = useNavigate();
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
            <button className="header--connect">connect wallet</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
