import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

function NavigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} to={props.path} exact>
        <span className="material-icons-outlined" style={{ verticalAlign: "middle", display: "inline-block", width: "30px" }}>
          {props.iconName}
        </span>{" "}
        <span style={{ verticalAlign: "middle", display: "inline-block", paddingBottom: "3px" }}>{props.title}</span>
      </NavLink>
    </li>
  );
}

export default NavigationItem;
