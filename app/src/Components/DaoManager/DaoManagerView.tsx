import React from "react";
import "./styles.css";
import { useAppSelector, useAppDispatch } from "../../utils/reduxhooks";
import { changeName } from "./CreateDAO/nameSlice";

export default function DaoManagerView() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.name.value);
  return (
    <div>
      <section>
        <div className="divider--full--length"></div>
      </section>
      <div className="full">
        <label>
          <p>DAO Name</p>
          <input
            value={name}
            onChange={(e) => dispatch(changeName(String(e.target.value)))}
          ></input>
        </label>
        {name}
      </div>
    </div>
  );
}
