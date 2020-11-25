import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import { addNote, deleteNote, editNote } from "../actions/actions";
import classes from "./NotesPage.module.css";
import Backdrop from "./Backdrop";
import getVisibleNotes from "../selectors/notes";

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
  useEffect(() => {
    console.log(props);
  })

  
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
  
  const path = props.match.path;
  const filterLabel =props.match.path === "/" ? "" : path.slice(7, path.length);
  const filterText = props.text;
  const displayedNotes = getVisibleNotes(props.notes, filterLabel, filterText);
  //const displayedNotes = props.notes;
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
      {displayedNotes.length === 0 ? noNotes : null}
      <div className={classes.Notes}>
        <Masonry>
          {displayedNotes.map((note, index) => {
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
    text: state.filters.filterText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    editNote: (id, note) => dispatch(editNote(id, note)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
