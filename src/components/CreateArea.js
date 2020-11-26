import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addNewLabel, addNote } from "../actions/actions";
import classes from "./CreateArea.module.css";
import AddIcon from "@material-ui/icons/Add";
import Button from "./Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CloseIcon from "@material-ui/icons/Close";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Popper from "@material-ui/core/Popper";
import AddLabels from "./AddLabels";

function CreateArea(props) {
  
  let initialChosenLabels = [];
  if (props.filterLabel !== ""){
    initialChosenLabels = [props.filterLabel];
  }
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [chosenLabels, setChosenLabels] = useState(initialChosenLabels);
  const [isExpanded, setExpanded] = useState(false);
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);

  // useEffect(() => {
  //   console.log(chosenLabels);
  // }, [chosenLabels])


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

  function addNewChosenLabelHandler(label) {
    if (label !=="" && !chosenLabels.includes(label)) {
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

  function expand() {
    if (!isExpanded) {
      setExpanded(true);
    }
  }

  function cancelExpand() {
    setExpanded(false);
    setTitle("");
    setContent("");
    setlabelPopperLocation(null);
    setChosenLabels(initialChosenLabels);
  }
  //open label edit, bad naming
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

  

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  function addNoteHandler() {
    props.addNote({ title: title, content: content, labels: chosenLabels });
    setTitle("");
    setContent("");
    setExpanded(false);
    setChosenLabels(initialChosenLabels);
  }

  function cancelNoteHandler() {
    setExpanded(false);
    setTitle("");
    setContent("");
    setChosenLabels(initialChosenLabels);
  }

  function handleKeyPressForTitle(event) {
    if (event.key === "Enter") {
      textAreaRef.current.focus();
    }
  }

  const textAreaRef = useRef(null);
  const create = (
    <div className={classes.Form}>
      {isExpanded ? (
        <input
          onKeyPress={handleKeyPressForTitle}
          onClick={closeLabelEditHandler}
          autoComplete="off"
          value={title}
          onChange={changeTitle}
          name="title"
          placeholder="Title"
        />
      ) : null}
      <div style={{ display: "flex" }}>
        <TextareaAutosize
          ref={textAreaRef}
          onClick={() => {
            expand();
            closeLabelEditHandler();
          }}
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Take a note..."
          rows="1"
        />
      </div>
      {isExpanded ? (
        <React.Fragment>
          <div className={classes.Labels} onClick={closeLabelEditHandler}>
            {chosenLabels.map((label) => {
              return (
                <span key={label} className={classes.Label}>
                  {label}
                </span>
              );
            })}
            
          </div>
          <div className={classes.Buttons} onClick={closeLabelEditHandler}>
            <Button tooltipTitle="Add Note" onClick={addNoteHandler}>
              <AddIcon />
            </Button>
            <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
              <CloseIcon />
            </Button>
            <Button tooltipTitle="Add Labels" onClick={labelHandler}>
              <LabelOutlinedIcon />
            </Button>
          </div>
          <Popper id={id} open={open} anchorEl={labelPopperLocation}>
            <AddLabels
              chosenLabels={chosenLabels}
              addNewChosenLabelHandler={addNewChosenLabelHandler}
              clickHandler={toggleLabelClickHandler}
              confirmHandler={closeLabelEditHandler}
              filterLabel={props.filterLabel}
            />
          </Popper>
        </React.Fragment>
      ) : null}
    </div>
  );

  return (
    <ClickAwayListener onClickAway={cancelExpand}>{create}</ClickAwayListener>
  );
}
const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
    notes: state.main.notes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    addNewLabel: (label) => dispatch(addNewLabel(label)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateArea);
