import React, { useState, useEffect } from "react";
import classes from "./AddLabelItem.module.css";

function AddLabelItem(props) {
  const [checked, setChecked] = useState(props.label === props.filterLabel);

  useEffect (() => {
    setChecked(props.chosenLabels.includes(props.label));
  }, [props.chosenLabels, props.label]) 

  function toggleHandler() {
    props.clickHandler(props.label, checked);
    setChecked((prevChecked) => {
      return !prevChecked;
    });
  }
  return (
    <li key={props.label} onClick={toggleHandler}>
      <div className={classes.Checkbox}>
        {checked ? (
          <i className="far fa-check-square"></i>
        ) : (
          <i className="far fa-square"></i>
        )}
      </div>
      <div style={{ display: "inline-block", marginLeft: "25px", width: "85%", marginBottom: "6px", fontSize: "0.9em" }}>
        {props.label}
      </div>
    </li>
  );
}

export default AddLabelItem;
