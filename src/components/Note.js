import React from "react";
import { connect } from "react-redux";
import classes from "./Note.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "./Button";
import { Link } from "react-router-dom";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItem from "./ListItem";
import { deleteLabelFromNote } from "../actions/actions";

function Note(props) {
  function removeLabelFromNote(label) {
    props.deleteLabelFromNote(label, props.note.id);
  }

  return (
    //outermost div is for hiding original note when editing
    <div
      className={
        classes.Note +
        " " +
        (props.editing && props.editedId === props.note.id ? classes.Hide : "")
      }
      onClick={props.showEditButton ? () => props.onClick(props.note.id) : null}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "inline-block",
          wordWrap: "break-word",
        }}
      >
        <div style={{ display: "inline-block", wordWrap: "break-word", width: "100%" }}>
          <p
            className={classes.Title}
            // style={{ maxWidth: "80%", marginRight: "0", display: "inline-block" }}
            style={{maxWidth: "85%"}}
          >
            {props.note.title}
          </p>

          {props.note.type === "note" ? (
            <div style={{ width: "85%" }}>
              <p>{props.note.content}</p>
              {props.note.title === "" && props.note.content === "" ? (
                <p style={{ color: "gray" }}>Empty note</p>
              ) : null}
            </div>
          ) : (
            <div>
              <ul>
                {props.note.unchecked.map((item) => {
                  return (
                    <ListItem
                      editable={props.editable}
                      key={item.id}
                      item={item}
                      checked={false}
                      listId={props.note.id}
                    />
                  );
                })}
              </ul>
              {(props.note.checked.length > 0 && props.note.unchecked.length) >
              0 ? (
                <hr />
              ) : null}
              <ul>
                {props.note.checked.map((item) => {
                  return (
                    <ListItem
                      editable={props.editable}
                      key={item.id}
                      item={item}
                      checked={true}
                      listId={props.note.id}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={classes.PinButton}>
          <Button tooltipTitle="Pin note">
            <i
              className={
                "fas fa-thumbtack" +
                (props.note.pinned
                  ? " " + classes.PinActive
                  : " " + classes.PinInactive)
              }
            ></i>
          </Button>
        </div>
      </div>

      <div className={classes.Labels}>
        {props.note.labels.slice(0, 3).map((label) => {
          return (
            <div key={label} className={classes.Label}>
              <Link to={"/label/" + label}>
                <span className={classes.LabelText}>{label}</span>
              </Link>

              <div className={classes.Button}>
                <Button
                  tooltipTitle="Delete label"
                  onClick={(event) => {
                    event.stopPropagation();
                    return removeLabelFromNote(label);
                  }}
                >
                  <span
                    className="material-icons-outlined"
                    style={{
                      verticalAlign: "middle",
                      display: "inline-block",
                      fontSize: "15px",
                    }}
                  >
                    close
                  </span>
                </Button>
              </div>
            </div>
          );
        })}
        {props.note.labels.length > 3 ? (
          <div className={classes.RemainingLabels}>
            <span style={{ fontSize: "15px" }}>
              {"+" + (props.note.labels.length - 3)}
            </span>
          </div>
        ) : null}
      </div>
      <div className={classes.ButtonArea}>
        <div style={{ width: "145px" }}></div>
        <Button
          tooltipTitle={props.deleteTooltip}
          onClick={(event) => {
            event.stopPropagation();
            return props.deleteNote(props.note.id);
          }}
        >
          {props.showEditButton ? <DeleteIcon /> : <DeleteForeverIcon />}
        </Button>

        {props.showEditButton ? (
          <Button
            tooltipTitle="Edit"
            onClick={() => props.onClick(props.index)}
          >
            <EditIcon />
          </Button>
        ) : (
          <Button
            tooltipTitle="Restore"
            onClick={() => props.restoreNote(props.note.id)}
          >
            <RestoreFromTrashIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLabelFromNote: (label, noteId) =>
      dispatch(deleteLabelFromNote(label, noteId)),
  };
};

export default connect(null, mapDispatchToProps)(Note);
