import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../utils/reduxhooks";
import "./styles.css";
import { Slider, InputNumber, Row, Col, Switch } from "antd";
import {
  changeProposalPassing,
  changeQuorum,
  changeVoteDurationDays,
  changeVoteDurationWeeks,
} from "./CreateDAO/DaoCreationSlice";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export default function Governance() {
  const inputs = useAppSelector((state) => {
    const inputs = state.Alchemy;
    return inputs;
  });

  const {
    proposalPassing,
    quorumPercentage,
    voteDurationDays,
    voteDurationWeeks,
  } = inputs;

  const dispatch = useAppDispatch();

  const { account } = useWeb3React<Web3Provider>();

  return (
    <div>
      {account ? (
        <div className="alchemy--section--right">
          <h1 className="alchemy--section--title">Governance</h1>
          <div
            className="alchemy--input--group"
            style={{ paddingBottom: `50px` }}
          >
            <h2 className="alchemy--section--subtitle ">Proposal Passing %</h2>

            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  value={proposalPassing}
                  onChange={(value) =>
                    dispatch(changeProposalPassing(Number(value)))
                  }
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ margin: "0 16px" }}
                  type="number"
                  value={proposalPassing}
                  onChange={(value) =>
                    dispatch(changeProposalPassing(Number(value)))
                  }
                  required
                />
              </Col>
            </Row>
          </div>

          <div
            className="alchemy--input--group"
            style={{ paddingBottom: `50px` }}
          >
            <h2 className="alchemy--section--subtitle ">Quorum %</h2>

            {quorumPercentage}
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  onChange={(value) => dispatch(changeQuorum(Number(value)))}
                  value={quorumPercentage}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ margin: "0 16px" }}
                  value={quorumPercentage}
                  onChange={(value) => dispatch(changeQuorum(Number(value)))}
                  required
                />
              </Col>
            </Row>
          </div>
          <div>
            <h2 className="alchemy--section--subtitle ">Basic Vote Duration</h2>
            <InputNumber
              min={0}
              max={10}
              bordered={false}
              style={{ marginRight: `30px` }}
              value={voteDurationWeeks}
              onChange={(value) =>
                dispatch(changeVoteDurationWeeks(Number(value)))
              }
              required
              className="alchemy--input"
            />
            Weeks
          </div>
          <div
            className="alchemy--input--group"
            style={{ paddingBottom: `30px` }}
          >
            <InputNumber
              min={0}
              max={10}
              bordered={false}
              style={{ marginRight: `30px` }}
              value={voteDurationDays}
              onChange={(value) =>
                dispatch(changeVoteDurationDays(Number(value)))
              }
              className="alchemy--input"
            />
            Days
          </div>
          <div>
            <h2 className="alchemy--section--subtitle ">MultiSig</h2>
            <Switch />
          </div>
          <br />
          <br />

          <div className="alchemy--bottom--links">
            <Link to="/Alchemy/create/">Back</Link>
            <Link to="/Alchemy/create/tokenomics">Next Section</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
