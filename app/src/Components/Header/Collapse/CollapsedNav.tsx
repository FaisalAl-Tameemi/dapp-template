import React from "react";
import "./styles.css";

interface MyProps {
  active: boolean;
  menuItems: string[];
}

const CollapsedNav = (props: MyProps) => {
  const isActive = props.active;

  //   const isActive = true;

  const menuItems = props.menuItems.map((item, index) => {
    return (
      <div key={index} className="nav--item">
        <a>{item}</a>
      </div>
    );
  });
  return (
    <div className={`dropdown--nav ${isActive ? `active` : null}`}>
      {menuItems}
    </div>
  );
};

export default CollapsedNav;
