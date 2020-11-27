import React, { useState, useRef } from "react";
import classes from "./EditArea.module.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LabelIcon from "@material-ui/icons/Label";
import Popper from "@material-ui/core/Popper";
import AddLabels from "./AddLabels";

function EditArea(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);
  const [chosenLabels, setChosenLabels] = useState(props.note.labels);

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  const textAreaRef = useRef(null);

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
    <div className={classes.Form}>
      <input
        value={title}
        onChange={changeTitle}
        onKeyPress={handleKeyPressForTitle}
        name="title"
        placeholder="Title"
        autoComplete="Off"
      />

      <div style={{ display: "flex" }}>
        <TextareaAutosize
          ref={textAreaRef}
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Edit your note..."
        />
      </div>
      <div className={classes.Labels} onClick={closeLabelEditHandler}>
        {chosenLabels.map((label) => {
          return (
            <span key={label} className={classes.Label}>
              {label}
            </span>
          );
        })}
      </div>
      <div className={classes.Buttons}>
        <Button
          tooltipTitle="Confirm changes"
          onClick={() => {
            props.editNote(props.note.id, {
              title: title,
              content: content,
              id: props.note.id,
              labels: chosenLabels,
            });
            props.closeEdit();
          }}
        >
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
  );

  return <div>{create}</div>;
}

export default EditArea;
