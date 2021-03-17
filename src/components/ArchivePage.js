import React, { useState, useRef } from "react";
import classes from "./ArchivePage.module.css";
import EditArea from "./EditArea";
import Backdrop from "./Backdrop";
import Note from "./Note";
import Masonry from "react-masonry-component";
import Header from "./Header";
import SideBar from "./SideBar";
import getVisibleNotes from "../selectors/notes";
import {
  deleteNote,
  editNote,
  editAndArchive,
  editAndUnarchive,
} from "../actions/actions";

import { connect } from "react-redux";

function ArchivePage(props) {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);

  const editArea = useRef(null);
  const editedIndex = props.archive.findIndex((note) => {
    return note.id === editedId;
  });

  const displayedArchiveNotes = getVisibleNotes(
    props.archive,
    "",
    props.text,
    props.color
  );

  function editHandler(id) {
    setEditedId(id);
    setEditing(true);
  }

  function closeEditHandler() {
    setEditing(false);
    setEditedId(null);
  }

  function backdropClickHandler() {
    editArea.current();
    closeEditHandler();
  }

  const noNotes = (
    <div className={classes.Empty}>
      <span className={"material-icons-outlined " + classes.Icon}>archive</span>
      <p className={classes.Note}>Your archived notes appear here</p>
    </div>
  );

  return (
    <div className={classes.NotesPage}>
      <Header />
      <SideBar openEditLabels={props.openEditLabels} />
      {editing ? (
        <EditArea
          editAndArchive={props.editAndArchive}
          editAndUnarchive={props.editAndUnarchive}
          archive={props.archive}
          ref={editArea}
          note={props.archive[editedIndex]}
          editNote={props.editNote}
          // editedId={editedId}
          closeEdit={closeEditHandler}
        ></EditArea>
      ) : null}
      <Backdrop
        show={editing}
        onClick={backdropClickHandler}
        transparent={false}
      />
      {props.archive.length === 0 && props.text === "" && props.color === ""
        ? noNotes
        : null}

      <div className={classes.Notes}>
        {props.text === "" && props.color === "" ? null : (
          <h3 className={classes.SearchResult}>Search Results:</h3>
        )}
        <Masonry>
          {displayedArchiveNotes.map((note) => {
            return (
              <Note
                archived={true}
                editable={true}
                type={note.type}
                editedId={editedId}
                editing={editing}
                key={note.id}
                note={note}
                // index={index}
                deleteNote={props.deleteNote}
                deleteTooltip="Delete Note"
                showEditButton={true}
                onClick={editHandler}
              />
            );
          })}
        </Masonry>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    archive: state.main.archive,
    text: state.filters.filterText,
    color: state.filters.filterColor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editNote: (id, note) => dispatch(editNote(id, note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    editAndArchive: (oldNote, newNote) =>
      dispatch(editAndArchive(oldNote, newNote)),
    editAndUnarchive: (oldNote, newNote) =>
      dispatch(editAndUnarchive(oldNote, newNote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchivePage);
