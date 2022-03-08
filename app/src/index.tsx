import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import "antd/dist/antd.less";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getLibrary } from "./utils/misc";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DaoManagerView from "./Components/DaoManager/DaoManagerView";
import HomePage from "./Components/Home/HomePage";

import Header from "./Components/Header/Header";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="DaoManager" element={<DaoManagerView />}></Route>
          </Route>
          <Route path="*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
