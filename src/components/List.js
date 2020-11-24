import React from "react";
import classes from "./List.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

function List(props) {
  return (
    <div className={classes.List}>
      <h2>{props.title}</h2>
      <ul>
        {props.content.map((item, index) => {
          return (
            <li>
              <input
                type="checkbox"
                id={index}
                style={{ marginRight: "8px" }}
              ></input>
              <label for={index}>{item}</label>
            </li>
          );
        })}
      </ul>
      <Tooltip title="Delete Note">
        <button
          type="button"
          onClick={() => {
            props.deleteNote(props.id);
          }}
        >
          <DeleteIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default List;
