import React, { useState } from "react";
import classes from "./CreateArea.module.css";
import AddIcon from "@material-ui/icons/Add";
import Button from "./Button";
import LabelIcon from "@material-ui/icons/Label";
import CloseIcon from "@material-ui/icons/Close";

function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [labels, setLabels] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  //const [addingLabel, setAddingLabel] = useState(false);

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  function changeText(event) {
    setContent(event.target.value);
  }

  function expand() {
    setExpanded(true);
  }

  function addNoteHandler() {
    props.addNote({ title: title, content: content });
    setTitle("");
    setContent("");
    setExpanded(false);
  }

  function cancelNoteHandler() {
    setExpanded(false);
    setTitle("");
    setContent("");
  }

  const create = (
    <form className={classes.Form}>
      {isExpanded ? (
        <input
          value={title}
          onChange={changeTitle}
          name="title"
          placeholder="Title"
        />
      ) : null}
      <div style={{ display: "flex" }}>
        <textarea
          onClick={expand}
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
      </div>
      {isExpanded ? (
        <div className={classes.Buttons}>
          <Button tooltipTitle="Add Note" onClick={addNoteHandler}>
            <AddIcon />
          </Button>

          <Button tooltipTitle="Add Label" onClick>
            <LabelIcon />
          </Button>

          <Button tooltipTitle="Cancel" onClick={cancelNoteHandler}>
            <CloseIcon />
          </Button>
        </div>
      ) : null}
    </form>
  );

  return <div>{create}</div>;
}

export default CreateArea;
