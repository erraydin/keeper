import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
import { setFilterText, setFilterColor } from "../actions/filters";
import { connect } from "react-redux";

function NavigationItem(props) {
  function onClickHandler () {
    props.setFilterText("");
    props.setFilterColor("");
  }
  return (
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} to={props.path} exact onClick={onClickHandler}>
        <span
          className="material-icons-outlined"
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            width: "30px",
          }}
        >
          {props.iconName}
        </span>{" "}
        <span
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            paddingBottom: "3px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "80%"
          }}
        >
          {props.title}
        </span>
      </NavLink>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterText : (filterText) => dispatch(setFilterText(filterText)),
    setFilterColor: (filterColor) => dispatch(setFilterColor(filterColor)),
  };
};

export default connect(null, mapDispatchToProps)(NavigationItem);
