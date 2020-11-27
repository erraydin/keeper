import React from "react";
import classes from "./ListItem.module.css";

function ListItem(props) {
  return (
    <li>
      <div className={classes.Checkbox}>
        {props.checked ? (
          <i className="far fa-check-square"></i>
        ) : (
          <i className="far fa-square"></i>
        )}
      </div>
      <div style={{ display: "inline-block", marginLeft: "10px" }}>
        {props.item}
      </div>
    </li>
  );
}

export default ListItem;
