import React from "react";
import classes from "./Note.module.css";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';



function Note(props) {
  return (
    <div className={classes.Note}>
      <h2>{props.note.title}</h2>
      <p>{props.note.content}</p>
      <Tooltip title="Delete Note">
      <button
        type="button"
        onClick={() => {
          props.deleteNote(props.index);
        }}
      >
        <DeleteIcon />
      </button>
      </Tooltip>
    </div>
  );
}

export default Note;
