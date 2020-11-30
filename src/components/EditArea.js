import React, { useState, useRef } from "react";
import classes from "./EditArea.module.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LabelIcon from "@material-ui/icons/Label";
import Popper from "@material-ui/core/Popper";
import AddLabels from "./AddLabels";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { v4 as uuidv4 } from "uuid";


function EditArea(props, ref) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(
    props.note.content ? props.note.content : ""
  );
  const [checkedList, setCheckedList] = useState(
    props.note.checked ? props.note.checked : []
  );
  const [uncheckedList, setUncheckedList] = useState(
    props.note.unchecked ? props.note.unchecked : []
  );
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);
  const [chosenLabels, setChosenLabels] = useState(props.note.labels);

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  const textAreaRef = useRef(null);
  const newListItemRef = useRef(null);

  function confirmEditHandler() {
    if (props.note.type === "note") {
      props.editNote(props.note.id, {
        title: title,
        content: content,
        id: props.note.id,
        labels: chosenLabels,
        type: "note",
      });
    } else {
      const newUncheckedList = [...uncheckedList];
      if (content !== ""){
        newUncheckedList.push({item: content, id: uuidv4()})
      }
      props.editNote(props.note.id, {
        title: title,
        checked: checkedList,
        unchecked: newUncheckedList,
        id: props.note.id,
        labels: chosenLabels,
        type: "list",
      });
    }

    props.closeEdit();
  }
  ref.current = confirmEditHandler;
  function enterHandlerForListItems(event) {
    if (event.key === "Enter") {
      newListItemRef.current.focus();
    }
  }

  function labelHandler(event) {
    setlabelPopperLocation((oldLabelPopperLocation) => {
      return oldLabelPopperLocation ? null : event.currentTarget;
    });
  }
  function openLabelEditHandler(event) {
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
  function createListToggleHandler(item) {
    const index = uncheckedList.findIndex((listItem) => {
      return item.id === listItem.id;
    });
    if (index > -1) {
      setUncheckedList((prevUncheckedList) => {
        return prevUncheckedList.filter((listItem) => {
          return listItem.id !== item.id;
        });
      });
      setCheckedList((prevCheckedList) => {
        return [item, ...prevCheckedList];
      });
    } else {
      setCheckedList((prevCheckedList) => {
        return prevCheckedList.filter((listItem) => {
          return listItem.id !== item.id;
        });
      });
      setUncheckedList((prevUncheckedList) => {
        return [...prevUncheckedList, item];
      });
    }
  }

  function changeListItem(event, index, checked) {
    if (checked) {
      setCheckedList((prevCheckedList) => {
        const newCheckedList = [...prevCheckedList];
        newCheckedList[index] = {
          item: event.target.value,
          id: prevCheckedList[index].id,
        };
        return newCheckedList;
      });
    } else {
      setUncheckedList((prevUncheckedList) => {
        const newUncheckedList = [...prevUncheckedList];
        newUncheckedList[index] = {
          item: event.target.value,
          id: prevUncheckedList[index].id,
        };
        return newUncheckedList;
      });
    }
  }

  function handleKeyPressForListItem(event) {
    if (event.key === "Enter" && content !== "") {
      setUncheckedList((prevUncheckedList) => {
        return [...prevUncheckedList, { item: content, id: uuidv4() }];
      });
      setContent("");
    }
    newListItemRef.current.focus();
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
  function addNewListItem() {
    if (content !== "") {
      setUncheckedList((prevUncheckedList) => {
        return [...prevUncheckedList, { item: content, id: uuidv4() }];
      });
      setContent("");
    }
    newListItemRef.current.focus();
  }
  function addCheckedListItem() {
    if (content !== "") {
      setCheckedList((prevCheckedList) => {
        return [...prevCheckedList, { item: content, id: uuidv4() }];
      });
      setContent("");
      // textAreaRef.current.focus();
    }
    newListItemRef.current.focus();
  }

  function deleteListItem(item) {
    if (checkedList.includes(item)) {
      setCheckedList((prevCheckedList) => {
        return prevCheckedList.filter((listItem) => {
          return listItem.id !== item.id;
        });
      });
    } else {
      setUncheckedList((prevUncheckedList) => {
        return prevUncheckedList.filter((listItem) => {
          return listItem.id !== item.id;
        });
      });
    }
  }

  const create = (
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

      <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
        <TextareaAutosize
          rowsMax={8}
          ref={textAreaRef}
          value={content}
          onClick={closeLabelEditHandler}
          onChange={changeText}
          name="content"
          placeholder="Edit your note..."
        />
      </div>
      <React.Fragment>
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
            <CheckCircleIcon />
          </Button>
          <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
            <CancelIcon />
          </Button>
          <Button tooltipTitle="Edit Labels" onClick={labelHandler}>
            <LabelIcon />
          </Button>
        </div>
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
            filterLabel={props.filterLabel}
          />
        </Popper>
      </React.Fragment>
    </div>
  );

  const createList = (
    <div className={classes.Form}>
      <input
        onKeyPress={handleKeyPressForTitle}
        onClick={closeLabelEditHandler}
        autoComplete="off"
        value={title}
        onChange={changeTitle}
        name="title"
        placeholder="Title"
      />
      {uncheckedList.map((item, index) => {
        return (
          <div key={item.id} style={{ position: "relative" }}>
            <div
              className={classes.Checkbox}
              onClick={() => createListToggleHandler(item)}
            >
              <i className="far fa-square"></i>
            </div>
            <input
              onKeyPress={enterHandlerForListItems}
              autoComplete="off"
              className={classes.Input}
              onClick={closeLabelEditHandler}
              value={item.item}
              onChange={(event) => changeListItem(event, index, false)}
              name="content"
              placeholder="Empty list item..."
              rows="1"
            />
            <div className={classes.Button2}>
              <Button
                tooltipTitle="Delete List Item"
                onClick={() => deleteListItem(item)}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </div>
          </div>
        );
      })}
      {checkedList.length > 0 ? <hr /> : null}
      {checkedList.map((item, index) => {
        return (
          <div key={item.id} style={{ position: "relative" }}>
            <div
              className={classes.Checkbox}
              onClick={() => createListToggleHandler(item)}
            >
              <i className="far fa-check-square"></i>
            </div>
            <input
              onKeyPress={enterHandlerForListItems}
              autoComplete="off"
              style={
                item.item === "" ? null : { textDecoration: "line-through" }
              }
              className={classes.Input}
              onClick={closeLabelEditHandler}
              value={item.item}
              onChange={(event) => changeListItem(event, index, true)}
              name="content"
              placeholder="Empty list item..."
              rows="1"
            />
            <div className={classes.Button2}>
              <Button
                tooltipTitle="Delete List Item"
                onClick={() => deleteListItem(item)}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </div>
          </div>
        );
      })}
      <div style={{ position: "relative" }}>
        <div className={classes.Checkbox1}>
          <i className="far fa-square" onClick={addCheckedListItem}></i>
        </div>
        <input
          autoComplete="off"
          className={classes.Input1}
          ref={newListItemRef}
          onKeyPress={handleKeyPressForListItem}
          onClick={closeLabelEditHandler}
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Add list item..."
        />
        <div className={classes.Button1}>
          <Button tooltipTitle="Add list item" onClick={addNewListItem}>
            <AddIcon />
          </Button>
        </div>
      </div>
      <React.Fragment>
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
          <Button tooltipTitle="Confirm Edit" onClick={confirmEditHandler}>
            <CheckCircleIcon />
          </Button>
          <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
            <CancelIcon />
          </Button>
          <Button tooltipTitle="Add Labels" onClick={openLabelEditHandler}>
            <LabelIcon />
          </Button>
        </div>
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
            filterLabel={props.filterLabel}
          />
        </Popper>
      </React.Fragment>
    </div>
  );

  return <div>{props.note.type === "note" ? create : createList}</div>;
}

export default React.forwardRef(EditArea);
