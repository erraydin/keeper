import React, { useState, useRef } from "react";
import classes from "./ArchivePage.module.css";
import EditArea from "./EditArea";
import Backdrop from "./Backdrop";
import Note from "./Note";
import Masonry from "react-masonry-component";
import Header from "./Header";
import SideBar from "./SideBar";
import { deleteNote, editNote } from "../actions/actions";

import { connect } from "react-redux";

function ArchivePage(props) {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);

  const editArea = useRef(null);
  const editedIndex = props.archive.findIndex((note) => {
    return note.id === editedId;
  });

  function editHandler(id) {
    setEditedId(id);
    setEditing(true);
  }

  function closeEditHandler() {
    setEditing(false);
    setEditedId(null);
  }

  const noNotes = (
    <div className={classes.Empty}>
      <span
        className={"material-icons-outlined " + classes.Icon}
        style={{ verticalAlign: "middle" }}
      >
        archive
      </span>
      <p className={classes.Note}>Your archived notes appear here</p>
    </div>
  );
  function backdropClickHandler() {
    editArea.current();
    closeEditHandler();
  }

  return (
    <div className={classes.NotesPage}>
      <Header />
      <SideBar openEditLabels={props.openEditLabels} />
      {editing ? (
        <EditArea
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
      {props.archive.length === 0 ? noNotes : null}
      <div className={classes.Notes}>
      <Masonry>
            {props.archive.map((note) => {
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
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      editNote: (id, note) => dispatch(editNote(id, note)),
      deleteNote: (id) => dispatch(deleteNote(id)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ArchivePage);
