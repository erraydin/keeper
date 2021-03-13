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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import PaletteIcon from "@material-ui/icons/Palette";
import ColorPopper from "./ColorPopper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";

function colorToClass(color) {
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

function EditArea(props, ref) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(
    props.note.content ? props.note.content : ""
  );
  const [isPinned, setPinned] = useState(props.note.pinned);
  const [checkedList, setCheckedList] = useState(
    props.note.checked ? props.note.checked : []
  );
  const [uncheckedList, setUncheckedList] = useState(
    props.note.unchecked ? props.note.unchecked : []
  );
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);
  const [chosenLabels, setChosenLabels] = useState(props.note.labels);
  const [color, setColor] = useState(props.note.color);
  const [colorPopperLocation, setColorPopperLocation] = useState(null);

  let colorOpen = Boolean(colorPopperLocation);
  let colorId = colorOpen ? "simple-popper" : undefined;

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper1" : undefined;

  const textAreaRef = useRef(null);
  // const newListItemRef = useRef(null);

  const editedIndexInArchive = props.archive.findIndex((note) => {
    return props.note.id === note.id;
  });

  const isEditedNoteInArchive = editedIndexInArchive > -1;

  function changeColorHandler(newColor) {
    if (newColor !== color) {
      setColor(newColor);
    }
    closeColorEditHandler();
  }

  function openColorEditHandler(event) {
    event.stopPropagation();
    setColorPopperLocation((oldColorPopperLocation) => {
      return oldColorPopperLocation ? null : event.currentTarget;
    });
    setlabelPopperLocation(null);
  }

  function closeColorEditHandler() {
    setColorPopperLocation(null);
  }

  function confirmEditHandler() {
    if (props.note.type === "note") {
      props.editNote(props.note.id, {
        title: title,
        content: content,
        id: props.note.id,
        labels: chosenLabels,
        type: "note",
        pinned: isPinned,
        color: color,
      });
    } else {
      const newUncheckedList = [...uncheckedList];
      if (content !== "") {
        newUncheckedList.push({ item: content, id: uuidv4() });
      }
      props.editNote(props.note.id, {
        title: title,
        checked: checkedList,
        unchecked: newUncheckedList,
        id: props.note.id,
        labels: chosenLabels,
        type: "list",
        pinned: isPinned,
        color: color,
      });
    }

    props.closeEdit();
  }

  function editAndArchiveHandler() {
    if (props.note.type === "note") {
      props.editAndArchive(props.note, {
        title: title,
        content: content,
        id: props.note.id,
        labels: chosenLabels,
        type: "note",
        pinned: isPinned,
        color: color,
      });
    } else {
      const newUncheckedList = [...uncheckedList];
      if (content !== "") {
        newUncheckedList.push({ item: content, id: uuidv4() });
      }
      props.editAndArchive(props.note, {
        title: title,
        checked: checkedList,
        unchecked: newUncheckedList,
        id: props.note.id,
        labels: chosenLabels,
        type: "list",
        pinned: isPinned,
        color: color,
      });
    }

    props.closeEdit();
  }

  function editAndUnarchiveHandler() {
    if (props.note.type === "note") {
      props.editAndUnarchive(props.note, {
        title: title,
        content: content,
        id: props.note.id,
        labels: chosenLabels,
        type: "note",
        pinned: isPinned,
        color: color,
      });
    } else {
      const newUncheckedList = [...uncheckedList];
      if (content !== "") {
        newUncheckedList.push({ item: content, id: uuidv4() });
      }
      props.editAndUnarchive(props.note, {
        title: title,
        checked: checkedList,
        unchecked: newUncheckedList,
        id: props.note.id,
        labels: chosenLabels,
        type: "list",
        pinned: isPinned,
        color: color,
      });
    }

    props.closeEdit();
  }

  ref.current = confirmEditHandler;
  function enterHandlerForListItems(event) {
    if (event.key === "Enter") {
      textAreaRef.current.focus();
    }
  }

  function openLabelEditHandler(event) {
    event.stopPropagation();
    setlabelPopperLocation((oldLabelPopperLocation) => {
      return oldLabelPopperLocation ? null : event.currentTarget;
      // event.currentTarget
    });
    setColorPopperLocation(null);
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
    textAreaRef.current.focus();
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
    textAreaRef.current.focus();
  }
  function addCheckedListItem() {
    if (content !== "") {
      setCheckedList((prevCheckedList) => {
        return [...prevCheckedList, { item: content, id: uuidv4() }];
      });
      setContent("");
      // textAreaRef.current.focus();
    }
    textAreaRef.current.focus();
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
  function togglePinnedHandler() {
    setPinned((prevPinned) => {
      return !prevPinned;
    });
  }

  const popperRef = useRef(null);
  const create = (
    <div className={classes.Form1} ref={popperRef}>
      <div className={classes.Form + " " + colorToClass(color)}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className={classes.Input2}
            value={title}
            onChange={changeTitle}
            onKeyPress={handleKeyPressForTitle}
            name="title"
            placeholder="Title"
            autoComplete="Off"
          />
          <div className={classes.PinButton}>
            <Button tooltipTitle="Pin note" onClick={togglePinnedHandler}>
              <i
                className={
                  "fas fa-thumbtack" +
                  (isPinned
                    ? " " + classes.PinActive
                    : " " + classes.PinInactive)
                }
              ></i>
            </Button>
          </div>
        </div>

        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          <TextareaAutosize
            rowsMax={8}
            ref={textAreaRef}
            value={content}
            onChange={changeText}
            name="content"
            placeholder="Edit your note..."
          />
        </div>
        <React.Fragment>
          <div className={classes.Labels}>
            {chosenLabels.map((label) => {
              return (
                <div key={label} className={classes.Label}>
                  <Link to={"/label/" + label}>
                    <div className={classes.LabelText}>{label}</div>
                  </Link>
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
          <div className={classes.Buttons}>
            <Button tooltipTitle="Confirm changes" onClick={confirmEditHandler}>
              <CheckCircleIcon />
            </Button>
            <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
              <CancelIcon />
            </Button>
            {isEditedNoteInArchive ? (
              <Button
                tooltipTitle="unarchive"
                onClick={editAndUnarchiveHandler}
              >
                <UnarchiveIcon />
              </Button>
            ) : (
              <Button tooltipTitle="Archive" onClick={editAndArchiveHandler}>
                <ArchiveIcon />
              </Button>
            )}
            <Button tooltipTitle="Edit Labels" onClick={openLabelEditHandler}>
              <LabelIcon />
            </Button>
            <Button tooltipTitle="Change Color" onClick={openColorEditHandler}>
              <PaletteIcon />
            </Button>
          </div>
        </React.Fragment>
      </div>
      <ClickAwayListener onClickAway={closeLabelEditHandler} touchEvent={false}>
        <Popper
          style={{ zIndex: "500" }}
          id={id}
          open={open}
          anchorEl={labelPopperLocation}
          modifiers={{
            preventOverflow: {
              escapeWithReference: false,
            },
          }}
          disablePortal
        >
          <AddLabels
            chosenLabels={chosenLabels}
            addNewChosenLabelHandler={addNewChosenLabelHandler}
            clickHandler={toggleLabelClickHandler}
            filterLabel={props.filterLabel}
          />
        </Popper>
      </ClickAwayListener>
      <ClickAwayListener onClickAway={closeColorEditHandler} touchEvent={false}>
        <Popper
          id={colorId}
          open={colorOpen}
          anchorEl={colorPopperLocation}
          disablePortal
        >
          <ColorPopper changeColorHandler={changeColorHandler} />
        </Popper>
      </ClickAwayListener>
    </div>
  );

  const createList = (
    <div className={classes.Form + " " + colorToClass(color)}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className={classes.Input2}
          onKeyPress={handleKeyPressForTitle}
          autoComplete="off"
          value={title}
          onChange={changeTitle}
          name="title"
          placeholder="Title"
        />
        <div className={classes.PinButton}>
          <Button tooltipTitle="Pin note" onClick={togglePinnedHandler}>
            <i
              className={
                "fas fa-thumbtack" +
                (isPinned ? " " + classes.PinActive : " " + classes.PinInactive)
              }
            ></i>
          </Button>
        </div>
      </div>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "315px",
          display: "inline-block",
          width: "100%",
        }}
      >
        {uncheckedList.map((item, index) => {
          return (
            <div key={item.id}>
              <div
                className={classes.Checkbox}
                onClick={() => createListToggleHandler(item)}
              >
                <i className="far fa-square"></i>
              </div>
              <input
                type="text"
                onKeyPress={enterHandlerForListItems}
                autoComplete="off"
                className={classes.Input}
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
            <div key={item.id}>
              <div
                className={classes.Checkbox}
                onClick={() => createListToggleHandler(item)}
              >
                <i className="far fa-check-square"></i>
              </div>
              <input
                type="text"
                onKeyPress={enterHandlerForListItems}
                autoComplete="off"
                style={
                  item.item === "" ? null : { textDecoration: "line-through" }
                }
                className={classes.Input}
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
      </div>
      <div style={{ position: "relative" }}>
        <div className={classes.Checkbox1}>
          <i className="far fa-square" onClick={addCheckedListItem}></i>
        </div>
        <input
          type="text"
          autoComplete="off"
          className={classes.Input1}
          ref={textAreaRef}
          onKeyPress={handleKeyPressForListItem}
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
        <div className={classes.Labels}>
          {chosenLabels.map((label) => {
            return (
              <div key={label} className={classes.Label}>
                <Link to={"/label/" + label}>
                  <div className={classes.LabelText}>{label}</div>
                </Link>
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
        <div className={classes.Buttons}>
          <Button tooltipTitle="Confirm Edit" onClick={confirmEditHandler}>
            <CheckCircleIcon />
          </Button>
          <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
            <CancelIcon />
          </Button>
          {isEditedNoteInArchive ? (
            <Button tooltipTitle="unarchive" onClick={editAndUnarchiveHandler}>
              <UnarchiveIcon />
            </Button>
          ) : (
            <Button tooltipTitle="Archive" onClick={editAndArchiveHandler}>
              <ArchiveIcon />
            </Button>
          )}
          <Button tooltipTitle="Add Labels" onClick={openLabelEditHandler}>
            <LabelIcon />
          </Button>
          <Button tooltipTitle="Change Color" onClick={openColorEditHandler}>
            <PaletteIcon />
          </Button>
        </div>
      </React.Fragment>
      <ClickAwayListener onClickAway={closeLabelEditHandler} touchEvent={false}>
        <Popper
          style={{ zIndex: "500" }}
          id={id}
          open={open}
          anchorEl={labelPopperLocation}
          modifiers={{
            preventOverflow: {
              escapeWithReference: false,
            },
          }}
          disablePortal
        >
          <AddLabels
            chosenLabels={chosenLabels}
            addNewChosenLabelHandler={addNewChosenLabelHandler}
            clickHandler={toggleLabelClickHandler}
            filterLabel={props.filterLabel}
          />
        </Popper>
      </ClickAwayListener>
      <ClickAwayListener onClickAway={closeColorEditHandler} touchEvent={false}>
        <Popper
          id={colorId}
          open={colorOpen}
          anchorEl={colorPopperLocation}
          disablePortal
        >
          <ColorPopper changeColorHandler={changeColorHandler} />
        </Popper>
      </ClickAwayListener>
    </div>
  );

  return <div>{props.note.type === "note" ? create : createList}</div>;
}

export default React.forwardRef(EditArea);
