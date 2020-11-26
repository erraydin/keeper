import React, { useState } from "react";
import classes from "./EditArea.module.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from '@material-ui/icons/Done';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function EditArea(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  function changeText(event) {
    setContent(event.target.value);
  }

  const create = (
    <div className={classes.Form}>
      <input
        value={title}
        onChange={changeTitle}
        name="title"
        placeholder="Title"
      />

      <div style={{ display: "flex" }}>
        <TextareaAutosize
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Edit your note..."
        />
      </div>

      <div className={classes.Buttons}>
        <Button
          tooltipTitle="Confirm changes"
          onClick={() => {
            props.editNote(props.note.id, {
              title: title,
              content: content,
              id: props.note.id,
              labels: props.note.labels,
            });
            props.closeEdit();
          }}
        >
          <DoneIcon />
        </Button>
        <Button tooltipTitle="Cancel" onClick={props.closeEdit}>
          <CloseIcon />
        </Button>
      </div>
    </div>
  );

  return <div>{create}</div>;
}

export default EditArea;
