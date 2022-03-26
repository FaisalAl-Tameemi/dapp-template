import { useEffect, useState } from "react";
import "./styles.css";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router";
import { useAppSelector } from "../../utils/reduxhooks";
import { Progress } from "antd";
import { Steps } from "antd";

export default function Creation() {
  const { Step } = Steps;
  let navigate = useNavigate();
  let location = useLocation();

  const [current, setCurrent] = useState(0);

  const inputs = useAppSelector((state) => {
    const inputs = state.Alchemy;
    return inputs;
  });

  const [percentage, setPercentage] = useState(0);

  const {
    name,
    proposalPassing,
    quorumPercentage,
    voteDurationWeeks,
    tokenSymbol,
    initTokenSupply,
  } = inputs;

  useEffect(() => {
    const inputsNeeded = [
      name,
      quorumPercentage,
      proposalPassing,
      voteDurationWeeks,
      tokenSymbol,
      initTokenSupply,
    ];

    const total = inputsNeeded.length;
    let completed = 0;
    inputsNeeded.forEach((element) => {
      if (element) {
        completed++;
        setPercentage((completed / total) * 100);
      }
      return percentage;
    });

    //Update STEPS on `Next Section / Back
    if (location.pathname === `/Alchemy/create/`) {
      setCurrent(0);
    }
    if (location.pathname === `/Alchemy/create/governance`) {
      setCurrent(1);
    }
    if (location.pathname === `/Alchemy/create/tokenomics`) {
      setCurrent(2);
    }
    if (location.pathname === `/Alchemy/create/confirmation`) {
      setCurrent(3);
    }
  });

  //navigate on step change
  const onChange = (current: any) => {
    setCurrent(current);
    if (current === 0) {
      navigate(`/Alchemy/create`);
    }
    if (current === 1) {
      navigate(`/Alchemy/create/governance`);
    }
    if (current === 2) {
      navigate(`/Alchemy/create/tokenomics`);
    }
    if (current === 3) {
      if (percentage === 100) {
        navigate(`/Alchemy/create/confirmation`);
      }
    }
  };

  return (
    <div>
      <div className="creation">
        <div className="alchemy--side--container">
          <Progress
            percent={percentage}
            showInfo={false}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
          <div>
            <Steps
              current={current}
              onChange={onChange}
              direction="vertical"
              className="alchemy--steps"
            >
              <Step style={{}} title={`Basic Information`}></Step>
              <Step title={`Governance`}></Step>
              <Step title={`Tokenomics`}></Step>
              <Step title={`Done!`}></Step>
            </Steps>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="alchemy--background"></div>
    </div>
  );
}
