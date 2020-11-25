import React from "react";
import classes from "./Note.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "./Button";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Note(props) {
  return (
    <div className={classes.Note}>
      <h2>{props.note.title}</h2>
      <p>{props.note.content}</p>
      {props.note.title === "" && props.note.content === "" ? (
        <p style={{ color: "gray" }}>Empty note</p>
      ) : null}
      <div className={classes.Labels}>
        {props.note.labels.map((label) => {
          return <span className={classes.Label}>{label}</span>;
        })}
      </div>
      <Button
        tooltipTitle={props.deleteTooltip}
        onClick={() => props.deleteNote(props.index)}
      >
        {props.showEditButton ? <DeleteIcon /> : <DeleteForeverIcon />}
      </Button>

      {props.showEditButton ? (
        <Button tooltipTitle="Edit" onClick={() => props.onClick(props.index)}>
          <EditIcon />
        </Button>
      ) : (
        <Button
          tooltipTitle="Restore"
          onClick={() => props.onClick(props.index)}
        >
          <RestoreFromTrashIcon />
        </Button>
      )}
    </div>
  );
}

export default Note;
