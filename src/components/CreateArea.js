import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addNewLabel, addNote, addList } from "../actions/actions";
import classes from "./CreateArea.module.css";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "./Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import LabelIcon from "@material-ui/icons/Label";
import NoteIcon from "@material-ui/icons/Note";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Popper from "@material-ui/core/Popper";
import AddLabels from "./AddLabels";
import { v4 as uuidv4 } from "uuid";
// import ListCreateArea from "./ListCreateArea";

function CreateArea(props) {
  let initialChosenLabels = [];
  if (props.filterLabel !== "") {
    initialChosenLabels = [props.filterLabel];
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [uncheckedList, setUncheckedList] = useState([]);
  const [chosenLabels, setChosenLabels] = useState(initialChosenLabels);
  const [isExpanded, setExpanded] = useState(false);
  const [isNewNote, setNewNote] = useState(false);
  const [isNewList, setNewList] = useState(false);
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  const textAreaRef = useRef(null);
  const newListItemRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current && isExpanded) {
      textAreaRef.current.focus();
    }
    if (newListItemRef.current && isExpanded) {
      newListItemRef.current.focus();
    }
  }, [isNewList, isExpanded]);

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
        return [item, ...prevUncheckedList];
      });
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

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  function changeText(event) {
    setContent(event.target.value);
  }

  function expand() {
    if (!isExpanded) {
      setNewNote(true);
      setExpanded(true);
      setNewList(false);
    }
  }
  function hideCheckboxes() {
    setNewNote(true);
    setNewList(false);
    setUncheckedList([]);
    setCheckedList([]);
  }

  function newListHandler() {
    setNewNote(false);
    setExpanded(true);
    setNewList(true);
  }

  function cancelExpand() {
    setExpanded(false);
    setNewNote(false);
    setNewList(false);
    setTitle("");
    setContent("");
    setlabelPopperLocation(null);
    setChosenLabels(initialChosenLabels);
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

  function addNoteHandler() {
    if (isNewNote) {
      props.addNote({
        type: "note",
        title: title,
        content: content,
        labels: chosenLabels,
      });
    } else if (isNewList) {
      console.log(title);
      props.addList({
        type: "list",
        title: title,
        checked: checkedList,
        unchecked: uncheckedList,
        labels: chosenLabels,
      });
    }
    setTitle("");
    setContent("");
    setCheckedList([]);
    setUncheckedList([]);
    setExpanded(false);
    setNewNote(false);
    setNewList(false);
    setChosenLabels(initialChosenLabels);
  }

  function cancelNoteHandler() {
    setTitle("");
    setContent("");
    setCheckedList([]);
    setUncheckedList([]);
    setExpanded(false);
    setNewNote(false);
    setNewList(false);
    setChosenLabels(initialChosenLabels);
  }

  function handleKeyPressForTitle(event) {
    if (event.key === "Enter") {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      } else if (newListItemRef.current) {
        newListItemRef.current.focus();
      }
      
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

  function onClickAwayHandler() {
    if (isNewNote) {
      if (title === "" && content === "") {
        cancelExpand();
      } else {
        addNoteHandler();
      }
    } else {
      if (
        title === "" &&
        checkedList.length === 0 &&
        uncheckedList.length === 0
      ) {
        cancelExpand();
      } else {
        addNoteHandler();
      }
    }
  }
  //Create Note Area
  let create = (
    <div className={classes.Form}>
      {isNewNote || isNewList ? (
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
      <div
        style={{ width: "100%", display: "inline-block", position: "relative" }}
      >
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
        <div
          style={{
            display: "inline-block",
            position: "absolute",
            top: "10px",
            right: "5px",
          }}
          className={isNewNote ? classes.Hidden : null}
        >
          <Button tooltipTitle="New List" onClick={newListHandler}>
            <CheckBoxOutlinedIcon />
          </Button>
        </div>
      </div>
      {isNewNote ? (
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
            <Button tooltipTitle="Add Note" onClick={addNoteHandler}>
              <AddCircleIcon />
            </Button>
            <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
              <CancelIcon />
            </Button>
            <Button tooltipTitle="Add Labels" onClick={openLabelEditHandler}>
              <LabelIcon />
            </Button>
            <Button tooltipTitle="Show checkboxes" onClick={newListHandler}>
              <CheckBoxIcon />
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
  //Create List Area

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
      {uncheckedList.map((item) => {
        return (
          <div key={item.id} style={{ position: "relative" }}>
            <div
              className={classes.Checkbox}
              onClick={() => createListToggleHandler(item)}
            >
              <i className="far fa-square"></i>
            </div>
            <input
              autoComplete="off"
              className={classes.Input}
              onClick={closeLabelEditHandler}
              value={item.item}
              onChange={changeText}
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
      {checkedList.map((item) => {
        return (
          <div key={item.id} style={{ position: "relative" }}>
            <div
              className={classes.Checkbox}
              onClick={() => createListToggleHandler(item)}
            >
              <i className="far fa-check-square"></i>
            </div>
            <input
              autoComplete="off"
              style={
                item.item === "" ? null : { textDecoration: "line-through" }
              }
              className={classes.Input}
              onClick={closeLabelEditHandler}
              value={item.item}
              onChange={changeText}
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
          <Button tooltipTitle="Add Note" onClick={addNoteHandler}>
            <AddCircleIcon />
          </Button>
          <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
            <CancelIcon />
          </Button>
          <Button tooltipTitle="Add Labels" onClick={openLabelEditHandler}>
            <LabelIcon />
          </Button>
          <Button tooltipTitle="Hide checkboxes" onClick={hideCheckboxes}>
            <NoteIcon />
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
    </div>
  );

  return (
    <ClickAwayListener onClickAway={onClickAwayHandler}>
      {isNewList ? createList : create}
    </ClickAwayListener>
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
    addList: (list) => dispatch(addList(list)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateArea);

// function CreateArea(props) {
//   let initialChosenLabels = [];
//   if (props.filterLabel !== "") {
//     initialChosenLabels = [props.filterLabel];
//   }

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [chosenLabels, setChosenLabels] = useState(initialChosenLabels);
//   const [isExpanded, setExpanded] = useState(false);
//   const [labelPopperLocation, setlabelPopperLocation] = useState(null);

//   function toggleLabelClickHandler(label, checked) {
//     if (checked) {
//       setChosenLabels((prevChosenLabels) => {
//         return prevChosenLabels.filter((chosenLabel) => {
//           return label !== chosenLabel;
//         });
//       });
//     } else {
//       setChosenLabels((prevChosenLabels) => {
//         return [label, ...prevChosenLabels];
//       });
//     }
//   }

//   function addNewChosenLabelHandler(label) {
//     if (label !== "" && !chosenLabels.includes(label)) {
//       setChosenLabels((prevChosenLabels) => {
//         return [label, ...prevChosenLabels];
//       });
//     }
//   }

//   function removeLabelFromNote(label) {
//     setChosenLabels((prevChosenLabels) => {
//       return prevChosenLabels.filter(chosenLabel => {
//         return label !== chosenLabel;
//       })
//     });
//   }

//   function changeTitle(event) {
//     setTitle(event.target.value);
//   }

//   function changeText(event) {
//     setContent(event.target.value);
//   }

//   function expand() {
//     if (!isExpanded) {
//       setExpanded(true);
//     }
//   }

//   function cancelExpand() {
//     setExpanded(false);
//     setTitle("");
//     setContent("");
//     setlabelPopperLocation(null);
//     setChosenLabels(initialChosenLabels);
//   }
//   //open label edit, bad naming
//   function labelHandler(event) {
//     setlabelPopperLocation((oldLabelPopperLocation) => {
//       return oldLabelPopperLocation ? null : event.currentTarget;
//     });
//   }

//   function closeLabelEditHandler() {
//     if (open) {
//       setlabelPopperLocation(null);
//     }
//   }

//   const open = Boolean(labelPopperLocation);
//   const id = open ? "simple-popper" : undefined;

//   function addNoteHandler() {
//     props.addNote({ title: title, content: content, labels: chosenLabels });
//     setTitle("");
//     setContent("");
//     setExpanded(false);
//     setChosenLabels(initialChosenLabels);
//   }

//   function cancelNoteHandler() {
//     setExpanded(false);
//     setTitle("");
//     setContent("");
//     setChosenLabels(initialChosenLabels);
//   }

//   function handleKeyPressForTitle(event) {
//     if (event.key === "Enter") {
//       textAreaRef.current.focus();
//     }
//   }

//   function onClickAwayHandler() {
//     if (title === "" && content === "") {
//       cancelExpand();
//     } else {
//       addNoteHandler();
//     }
//   }

//   const textAreaRef = useRef(null);
//   const create = (
//     <div className={classes.Form}>
//       {isExpanded ? (
//         <input
//           onKeyPress={handleKeyPressForTitle}
//           onClick={closeLabelEditHandler}
//           autoComplete="off"
//           value={title}
//           onChange={changeTitle}
//           name="title"
//           placeholder="Title"
//         />
//       ) : null}
//       <div style={{ display: "flex" }}>
//         <TextareaAutosize
//           ref={textAreaRef}
//           onClick={() => {
//             expand();
//             closeLabelEditHandler();
//           }}
//           value={content}
//           onChange={changeText}
//           name="content"
//           placeholder="Take a note..."
//           rows="1"
//         />
//       </div>
//       {isExpanded ? (
//         <React.Fragment>
//           <div className={classes.Labels} onClick={closeLabelEditHandler}>
//             {chosenLabels.map((label) => {
//               return (
//                 <div key={label} className={classes.Label}>
//                   <div className={classes.LabelText}>{label}</div>
//                   <div className={classes.Button}>
//                     <Button
//                       tooltipTitle="Delete label"
//                       onClick={() => removeLabelFromNote(label)}
//                     >
//                       <span
//                         className="material-icons-outlined"
//                         style={{
//                           verticalAlign: "middle",
//                           display: "inline-block",
//                           fontSize: "15px",
//                         }}
//                       >
//                         close
//                       </span>
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className={classes.Buttons} onClick={closeLabelEditHandler}>
//             <Button tooltipTitle="Add Note" onClick={addNoteHandler}>
//               <AddIcon />
//             </Button>
//             <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
//               <CloseIcon />
//             </Button>
//             <Button tooltipTitle="Add Labels" onClick={labelHandler}>
//               <LabelIcon />
//             </Button>
//           </div>
//           <Popper id={id} open={open} anchorEl={labelPopperLocation}>
//             <AddLabels
//               chosenLabels={chosenLabels}
//               addNewChosenLabelHandler={addNewChosenLabelHandler}
//               clickHandler={toggleLabelClickHandler}
//               confirmHandler={closeLabelEditHandler}
//               filterLabel={props.filterLabel}
//             />
//           </Popper>
//         </React.Fragment>
//       ) : null}
//     </div>
//   );

//   return (
//     <ClickAwayListener onClickAway={onClickAwayHandler}>{create}</ClickAwayListener>
//   );
// }
// const mapStateToProps = (state) => {
//   return {
//     labels: state.main.labels,
//     notes: state.main.notes,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNote: (note) => dispatch(addNote(note)),
//     addNewLabel: (label) => dispatch(addNewLabel(label)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CreateArea);
