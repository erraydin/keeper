import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addNewLabel, addNote } from "../actions/actions";
import classes from "./CreateArea.module.css";
import AddIcon from "@material-ui/icons/Add";
import Button from "./Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CloseIcon from "@material-ui/icons/Close";
import LabelIcon from "@material-ui/icons/Label";
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
  const [isNewNote, setNewNote] = useState(false);
  const [isNewList, setNewList] = useState(true);
  const [labelPopperLocation, setlabelPopperLocation] = useState(null);

  const open = Boolean(labelPopperLocation);
  const id = open ? "simple-popper" : undefined;

  const textAreaRef = useRef(null);

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
    if (!isNewNote) {
      setNewNote(true);
    }
  }

  function cancelExpand() {
    setNewNote(false);
    setNewList(false);
    setTitle("");
    setContent("");
    setlabelPopperLocation(null);
    setChosenLabels(initialChosenLabels);
  }
  //The name was labelHandler
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
    } else {
    }

    setTitle("");
    setContent("");
    setCheckedList([]);
    setUncheckedList([]);
    setNewNote(false);
    setNewList(false);
    setChosenLabels(initialChosenLabels);
  }

  function cancelNoteHandler() {
    setTitle("");
    setContent("");
    setCheckedList([]);
    setUncheckedList([]);
    setNewNote(false);
    setNewList(false);
    setChosenLabels(initialChosenLabels);
  }

  function handleKeyPressForTitle(event) {
    if (event.key === "Enter") {
      textAreaRef.current.focus();
    }
  }

  function handleKeyPressForListItem(event) {
    if (event.key === "Enter") {
      setUncheckedList((prevUncheckedList) => {
        return [...prevUncheckedList, { item: content, id: uuidv4() }];
      });
      setContent("");
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
      {isNewNote ? (
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
              <AddIcon />
            </Button>
            <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
              <CloseIcon />
            </Button>
            <Button tooltipTitle="Add Labels" onClick={openLabelEditHandler}>
              <LabelIcon />
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

  if (isNewList) {
    create = (
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
            <div style={{ position: "relative" }}>
              <div className={classes.Checkbox}>
                {props.checked ? (
                  <i className="far fa-check-square"></i>
                ) : (
                  <i className="far fa-square"></i>
                )}
              </div>
              <input
                className={classes.Input}
                onClick={() => {
                  expand();
                  closeLabelEditHandler();
                }}
                key={item.id}
                value={item.item}
                onChange={changeText}
                name="content"
                placeholder="Add list item..."
                rows="1"
              />
              <div className={classes.Button2}>
                <Button
                  tooltipTitle="Delete List Item"
                  onClick={openLabelEditHandler}
                >
                  <CloseIcon fontSize="small"/>
                </Button>
              </div>
            </div>
          );
        })}
        <div style={{ position: "relative" }}>
          <div className={classes.Checkbox1}>
            {props.checked ? (
              <i className="far fa-check-square"></i>
            ) : (
              <i className="far fa-square"></i>
            )}
          </div>
          <input
            className={classes.Input1}
            ref={textAreaRef}
            onKeyPress={handleKeyPressForListItem}
            onClick={() => {
              expand();
              closeLabelEditHandler();
            }}
            value={content}
            onChange={changeText}
            name="content"
            placeholder="Add list item..."
          />
          <div className={classes.Button1}>
            <Button tooltipTitle="Add list item" onClick={openLabelEditHandler}>
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClickAwayListener onClickAway={onClickAwayHandler}>
      {create}
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
