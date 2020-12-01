import React, { useState} from "react";
import { connect } from "react-redux";
import classes from "./Note.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "./Button";
import { Link } from "react-router-dom";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PaletteIcon from "@material-ui/icons/Palette";
import ListItem from "./ListItem";
import ColorPopper from "./ColorPopper";
import { editNote } from "../actions/actions";
import Tooltip from "@material-ui/core/Tooltip";
import { deleteLabelFromNote } from "../actions/actions";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function color(color) {
  switch (color) {
    case "white":
      return classes.white;

    case "orange":
      return classes.orange;

    case "yellow":
      return classes.yellow;

    case "green":
      return classes.green;

    case "turquoise":
      return classes.turquoise;

    case "blue":
      return classes.blue;

    case "darkblue":
      return classes.darkblue;

    case "purple":
      return classes.purple;

    case "pink":
      return classes.pink;

    default:
      return;
  }
}
function Note(props) {
  const [colorPopperLocation, setColorPopperLocation] = useState(null);

  const open = Boolean(colorPopperLocation);
  const id = open ? "simple-popper" : undefined;


  function openColorEditHandler(event) {
    event.stopPropagation();
    setColorPopperLocation((oldColorPopperLocation) => {
      return oldColorPopperLocation ? null : event.currentTarget;
    });
  }


  function closeColorEditHandler() {
    if (open) {
      setColorPopperLocation(null);
    }
  }

  const colorClass = color(props.note.color);

  function removeLabelFromNote(label) {
    props.deleteLabelFromNote(label, props.note.id);
  }

  function changeColorHandler(color) {
    if (color !== props.note.color) {
      const newNote = { ...props.note, color: color };
      props.editNote(props.note.id, newNote);
    }
    closeColorEditHandler();
  }

  function pinHandler(event) {
    event.stopPropagation();
    const newNote = { ...props.note, pinned: !props.note.pinned };
    props.editNote(props.note.id, newNote);
  }

  return (
    <div >
      <div
        className={
          classes.Note +
          " " +
          colorClass +
          " " +
          (props.editing && props.editedId === props.note.id
            ? classes.Hide
            : "")
        }
        onClick={
          props.showEditButton ? () => props.onClick(props.note.id) : null
        }
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "inline-block",
            wordWrap: "break-word",
          }}
        >
          <div
            style={{
              display: "inline-block",
              wordWrap: "break-word",
              width: "100%",
            }}
          >
            <p
              className={classes.Title}
              // style={{ maxWidth: "80%", marginRight: "0", display: "inline-block" }}
              style={{ maxWidth: "85%" }}
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
                {(props.note.checked.length > 0 &&
                  props.note.unchecked.length) > 0 ? (
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
          <div
            className={
              classes.PinButton + (props.editable ? "" : " " + classes.Hide)
            }
          >
            <Button
              tooltipTitle="Pin note"
              onClick={pinHandler}
              disabled={props.editable ? false : true}
            >
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
        
          <div style={{ width: props.editable ? "115px" : "145px" }}></div>
          {props.editable ? (
            <Tooltip title="Change color">
              <button
                type="button"
                onClick={openColorEditHandler}
              >
                <PaletteIcon />
              </button>
            </Tooltip>
          ) : null}
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
      <ClickAwayListener onClickAway={closeColorEditHandler}>
        <Popper
          id={id}
          open={open}
          anchorEl={colorPopperLocation}
          // disablePortal
        >
          <ColorPopper changeColorHandler={changeColorHandler} />
        </Popper>
      </ClickAwayListener>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLabelFromNote: (label, noteId) =>
      dispatch(deleteLabelFromNote(label, noteId)),
    editNote: (id, note) => dispatch(editNote(id, note)),
  };
};

export default connect(null, mapDispatchToProps)(Note);
