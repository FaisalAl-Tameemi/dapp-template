import React from "react";
import "./styles.css";
import { useAppSelector, useAppDispatch } from "../../utils/reduxhooks";
import { changeName } from "./CreateDAO/nameSlice";
import { useNavigate } from "react-router";

export default function DaoManagerView() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.name.value);
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <div className="alchemy--container">
          <h1 className="intro--title"> Welcome to bitProperties Alchemy</h1>
          <button
            className="intro--choice--button"
            onClick={() => navigate(`Alchemy`)}
          >
            GOTOALCHEMY
          </button>
        </div>
      </section>
    </div>
  );
}

{
  /* <p>DAO Name</p>
<input
  value={name}
  onChange={(e) => dispatch(changeName(String(e.target.value)))}
></input> */
}
