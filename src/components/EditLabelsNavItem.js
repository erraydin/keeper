import React from "react";
import classes from "./EditLabelsNavItem.module.css";

function EditLabelsNavItem(props) {
  return (
    <li className={classes.NavigationItem} onClick={props.openEditLabels}>
      <div>
        <span
          className="material-icons-outlined"
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            width: "30px",
          }}
        >
          edit
        </span>{" "}
        <span style={{ verticalAlign: "middle", display: "inline-block", paddingBottom: "2px" }}>Edit Labels</span>
      </div>
    </li>
  );
}

export default EditLabelsNavItem;