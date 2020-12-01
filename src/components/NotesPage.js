import React, { useState, useRef, useEffect } from "react";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import { addNote, deleteNote, editNote } from "../actions/actions";
import { setFilterLabel } from "../actions/filters";
import classes from "./NotesPage.module.css";
import getVisibleNotes from "../selectors/notes";
import Header from "./Header";
import SideBar from "./SideBar";
import Backdrop from "./Backdrop";

function NotesPage(props) {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);

  const editArea = useRef(null);
  const editedIndex = props.notes.findIndex((note) => {
    return note.id === editedId;
  });

  useEffect(() => {
    console.log(editArea.current);
  }, [editing]);

  function editHandler(id) {
    setEditedId(id);
    setEditing(true);
  }

  function closeEditHandler() {
    setEditing(false);
    setEditedId(null);
  }
  // useEffect(() => {
  //   console.log(props);
  // });

  const path = props.match.path;
  const filterLabel = path === "/" ? "" : path.slice(7, path.length);
  const filterText = props.text;
  const displayedNotes = getVisibleNotes(props.notes, filterLabel, filterText);
  const pinnedNotes = displayedNotes.filter((note) => {
    return note.pinned;
  });
  const unpinnedNotes = displayedNotes.filter((note) => {
    return !note.pinned;
  });

  const noNotes =
    path === "/" ? (
      <div className={classes.Empty}>
        <span
          className={"material-icons-outlined " + classes.Icon}
          style={{ verticalAlign: "middle" }}
        >
          note
        </span>
        <p className={classes.Note}>Notes you add appear here</p>
      </div>
    ) : (
      <div className={classes.Empty}>
        <span
          className={"material-icons " + classes.Icon}
          style={{ verticalAlign: "middle" }}
        >
          label_outline
        </span>
        <p className={classes.Note}>No notes with this label yet</p>
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
      <CreateArea filterLabel={filterLabel} />
      {editing ? (
        <EditArea
          ref={editArea}
          note={props.notes[editedIndex]}
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
      {displayedNotes.length === 0 ? noNotes : null}

      {pinnedNotes.length > 0 ? (
        <div className={classes.Notes}>
          <h5>PINNED</h5>
          <Masonry>
            {pinnedNotes.map((note) => {
              return (
                <Note
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
      ) : null}

      <div className={classes.Notes + (pinnedNotes.length > 0 ? " " +classes.NotesWhenPinned : "")}>
        {pinnedNotes.length > 0 && unpinnedNotes.length > 0 ? <h5>OTHERS</h5> : null}
        <Masonry>
          {unpinnedNotes.map((note) => {
            return (
              <Note
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
    notes: state.main.notes,
    text: state.filters.filterText,
    labels: state.main.labels,
    filterLabel: state.filters.filterLabel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    editNote: (id, note) => dispatch(editNote(id, note)),
    setFilterLabel: (filterLabel) => dispatch(setFilterLabel(filterLabel)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
