import { useEffect, useRef, useState } from "react";
import "./styles.css";
import cross from "../../static/cross.svg";
import tick from "../../static/tick.svg";
import { Outlet } from "react-router";
import { useAppSelector } from "../../utils/reduxhooks";
import { Progress } from "antd";

export default function Creation() {
  const name = useAppSelector((state) => state.Alchemy.name);
  const proposalPassing = useAppSelector(
    (state) => state.Alchemy.proposalPassing
  );
  const quorumPercentage = useAppSelector(
    (state) => state.Alchemy.quorumPercentage
  );
  const voteDurationWeeks = useAppSelector(
    (state) => state.Alchemy.voteDurationWeeks
  );
  const tokenSymbol = useAppSelector((state) => state.Alchemy.tokenSymbol);

  const initTokenSupply = useAppSelector(
    (state) => state.Alchemy.initTokenSupply
  );

  const sideTabs = useRef([
    {
      id: 1,
      title: `Basic Information`,
      progressComplete: false,
    },
    {
      id: 2,
      title: `Governance`,
      progressComplete: false,
    },
    {
      id: 3,
      title: `Tokenomics`,
      progressComplete: false,
    },
    {
      id: 4,
      title: `Done!`,
      progressComplete: false,
    },
  ]);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const inputs = [
      name,
      quorumPercentage,
      proposalPassing,
      voteDurationWeeks,
      tokenSymbol,
      initTokenSupply,
    ];
    const total = inputs.length;
    let completed = 0;
    inputs.forEach((element) => {
      if (element) {
        completed++;
        setPercentage((completed / total) * 100);
        console.log(element);
      }
      return percentage;
    });
  });

  const sideBarElements = sideTabs.current.map((tab, index) => {
    return (
      <li key={index} className="alchemy--tab--li">
        <div className="flex">
          <div className="alchemy--tab--title">{tab.title}</div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="creation">
        <div className="alchemy--side--container">
          <Progress percent={percentage} />
          <div className="x"></div>
          <div>
            <ul>{sideBarElements}</ul>
          </div>
        </div>
      </div>
      <div className="left">
        <Outlet />
      </div>
    </div>
  );
}
