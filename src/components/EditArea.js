import React, { useState } from "react";
import classes from "./EditArea.module.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from '@material-ui/icons/Done';

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
    <form className={classes.Form}>
      <input
        value={title}
        onChange={changeTitle}
        name="title"
        placeholder="Title"
      />

      <div style={{ display: "flex" }}>
        <textarea
          value={content}
          onChange={changeText}
          name="content"
          placeholder="Edit your note..."
          rows="3"
        />
      </div>

      <div className={classes.Buttons}>
        <Button
          tooltipTitle="Confirm changes"
          onClick={() => {
            props.editNote(props.editedIndex, {
              title: title,
              content: content,
              id: props.note.id
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
    </form>
  );

  return <div>{create}</div>;
}

export default EditArea;
