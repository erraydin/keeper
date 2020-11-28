import React, { useState, useRef } from "react";
import classes from "./EditArea.module.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LabelIcon from "@material-ui/icons/Label";
import Popper from "@material-ui/core/Popper";
import AddLabels from "./AddLabels";
import Backdrop from "./Backdrop";

function EditArea(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);
  const [chosenLabels, setChosenLabels] = useState(props.note.labels);

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  const textAreaRef = useRef(null);
  function confirmEditHandler() {
    props.editNote(props.note.id, {
      title: title,
      content: content,
      id: props.note.id,
      labels: chosenLabels,
    });
    props.closeEdit();
  }

  function labelHandler(event) {
    setlabelPopperLocation((oldLabelPopperLocation) => {
      return oldLabelPopperLocation ? null : event.currentTarget;
    });
  }

  function closeLabelEditHandler() {
    if (open) {
      setlabelPopperLocation(null);
    }
  }

  function addNewChosenLabelHandler(label) {
    if (label !== "" && !chosenLabels.includes(label)) {
      setChosenLabels((prevChosenLabels) => {
        return [label, ...prevChosenLabels];
      });
    }
  }

  function removeLabelFromNote(label) {
    setChosenLabels((prevChosenLabels) => {
      return prevChosenLabels.filter((chosenLabel) => {
        return label !== chosenLabel;
      });
    });
  }

  function toggleLabelClickHandler(label, checked) {
    if (checked) {
      setChosenLabels((prevChosenLabels) => {
        return prevChosenLabels.filter((chosenLabel) => {
          return label !== chosenLabel;
        });
      });
    } else {
      setChosenLabels((prevChosenLabels) => {
        return [label, ...prevChosenLabels];
      });
    }
  }

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  function changeText(event) {
    setContent(event.target.value);
  }

  function handleKeyPressForTitle(event) {
    if (event.key === "Enter") {
      textAreaRef.current.focus();
    }
  }

  const create = (
    <React.Fragment>
    <div className={classes.Form}>
      <input
        value={title}
        onChange={changeTitle}
        onClick={closeLabelEditHandler}
        onKeyPress={handleKeyPressForTitle}
        name="title"
        placeholder="Title"
        autoComplete="Off"
      />

      <div style={{ display: "flex" }}>
        <TextareaAutosize
          ref={textAreaRef}
          value={content}
          onClick={closeLabelEditHandler}
          onChange={changeText}
          name="content"
          placeholder="Edit your note..."
        />
      </div>
      <div className={classes.Labels} onClick={closeLabelEditHandler}>
        {chosenLabels.map((label) => {
          return (
            <div key={label} className={classes.Label}>
              <div className={classes.LabelText}>{label}</div>
              <div className={classes.Button}>
                <Button
                  tooltipTitle="Delete label"
                  onClick={() => removeLabelFromNote(label)}
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
      </div>
      <div className={classes.Buttons} onClick={closeLabelEditHandler}>
        <Button tooltipTitle="Confirm changes" onClick={confirmEditHandler}>
          <DoneIcon />
        </Button>
        <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
          <CloseIcon />
        </Button>
        <Button tooltipTitle="Edit Labels" onClick={labelHandler}>
          <LabelIcon />
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={labelPopperLocation}
          disablePortal
        >
          <AddLabels
            chosenLabels={chosenLabels}
            addNewChosenLabelHandler={addNewChosenLabelHandler}
            clickHandler={toggleLabelClickHandler}
            confirmHandler={closeLabelEditHandler}
            filterLabel=""
          />
        </Popper>
      </div>
    </div>
    <Backdrop show={true} onClick={confirmEditHandler} transparent={false} />
    </React.Fragment>
  );

  return <div>{create}</div>;
}

export default EditArea;
