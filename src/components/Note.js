import React from "react";
import classes from "./Note.module.css";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from "./Button";
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

function Note(props) {
  return (
    <div className={classes.Note} onClick={props.showEditButton ? () => props.onClick(props.index) : null}>
      <h2>{props.note.title}</h2>
      <p>{props.note.content}</p>
      {props.note.title === "" && props.note.content === "" ? (
        <p style={{ color: "gray" }}>Empty note</p>
      ) : null}
      <div className={classes.ButtonArea}>
        <div className={classes.Labels}>
          {props.note.labels.map((label) => {
            return <span className={classes.Label}>{label}</span>;
          })}
        </div>
        <Button
          tooltipTitle={props.deleteTooltip}
          onClick={(event) => {
            event.stopPropagation();
            return props.deleteNote(props.note.id);
          }}
        >
          {props.showEditButton ? <DeleteOutlinedIcon /> : <DeleteForeverOutlinedIcon />}
        </Button>

        {props.showEditButton ? (
          <Button
            tooltipTitle="Edit"
            onClick={() => props.onClick(props.index)}
          >
            <EditOutlinedIcon />
          </Button>
        ) : (
          <Button
            tooltipTitle="Restore"
            onClick={() => props.restoreNote(props.note.id)}
          >
            <RestoreFromTrashOutlinedIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Note;
