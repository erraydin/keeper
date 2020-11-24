import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

function NavigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} to={props.path} exact>
        <span className="material-icons" style={{ verticalAlign: "middle" }}>
          {props.iconName}
        </span>{" "}
        <span style={{ verticalAlign: "middle" }}>{props.title}</span>
      </NavLink>
    </li>
  );
}

export default NavigationItem;
