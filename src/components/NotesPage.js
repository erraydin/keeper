import React, { useState } from "react";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import { addNote, deleteNote, editNote } from "../actions/actions";
import classes from "./NotesPage.module.css";
import Backdrop from "./Backdrop";

function NotesPage(props) {
  const [editedIndex, setEditedIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  function editHandler(index) {
    setEditedIndex(index);
    setEditing(true);
  }

  function closeEditHandler() {
    setEditing(false);
    setEditedIndex(null);
  }

  const noNotes = (
    <div className={classes.Empty}>
      <span
        className={"material-icons " + classes.Icon}
        style={{ verticalAlign: "middle" }}
      >
        note
      </span>
      <p className={classes.Note}>Notes you add appear here</p>
    </div>
  );
  
  return (
    <React.Fragment>
      <CreateArea />
      {editing ? (
        <EditArea
          note={props.notes[editedIndex]}
          editNote={props.editNote}
          editedIndex={editedIndex}
          closeEdit={closeEditHandler}
        ></EditArea>
      ) : null}
      <Backdrop show={editing} onClick={closeEditHandler} transparent={false} />
      {props.notes.length === 0 ? noNotes : null}
      <div className={classes.Notes}>
        <Masonry>
          {props.notes.map((note, index) => {
            return (
              <Note
                key={note.id}
                note={note}
                index={index}
                deleteNote={props.deleteNote}
                deleteTooltip="Delete Note"
                showEditButton={true}
                onClick={editHandler}
              />
            );
          })}
        </Masonry>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    notes: state.main.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    deleteNote: (index) => dispatch(deleteNote(index)),
    editNote: (index, note) => dispatch(editNote(index, note)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
