import React, { useState, useRef } from "react";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import {
  addNote,
  deleteNote,
  editNote,
  archiveNote,
  editAndArchive,
  editAndUnarchive,
} from "../actions/actions";
import classes from "./NotesPage.module.css";
import getVisibleNotes from "../selectors/notes";
import Header from "./Header";
import SideBar from "./SideBar";
import Backdrop from "./Backdrop";

function NotesPage(props) {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(null);

  // const editedNoteIndexInArchive = props.archive.findIndex(note => {
  //   return note.id === editedNote.id
  // })
  // const editedNoteInArchive = (editedNoteIndexInArchive > -1);

  const editArea = useRef(null);
  // let editedIndex = props.notes.findIndex((note) => {
  //   return note.id === editedId;
  // });

  // useEffect(() => {
  //   console.log(editArea.current);
  // }, [editing]);

  function editHandler(id) {
    setEditedId(id);
    setEditing(true);
    let editedIndex = props.notes.findIndex((note) => {
      return note.id === id;
    });
    if (editedIndex > -1) {
      setEditedNote(props.notes[editedIndex]);
    } else {
      editedIndex = props.archive.findIndex((note) => {
        return note.id === id;
      });
      setEditedNote(props.archive[editedIndex]);
    }
  }

  function closeEditHandler() {
    setEditing(false);
    setEditedId(null);
    setEditedNote(null);
  }
  // useEffect(() => {
  //   console.log(props);
  // });

  const path = props.match.path;
  const filterLabel = path === "/" ? "" : path.slice(7, path.length);
  const filterText = props.text;
  const filterColor = props.color;
  const displayedNotes = getVisibleNotes(
    props.notes,
    filterLabel,
    filterText,
    filterColor
  );
  const pinnedNotes = displayedNotes.filter((note) => {
    return note.pinned;
  });
  const unpinnedNotes = displayedNotes.filter((note) => {
    return !note.pinned;
  });
  let archivedNotes = [];
  if (filterLabel !== "") {
    archivedNotes = getVisibleNotes(
      props.archive,
      filterLabel,
      filterText,
      filterColor
    );
  }

  const noNotes =
    path === "/notes" ? (
      <div className={classes.Empty}>
        <span className={"material-icons-outlined " + classes.Icon}>note</span>
        <p className={classes.Note}>Notes you add appear here</p>
      </div>
    ) : (
      <div className={classes.Empty}>
        <span className={"material-icons " + classes.Icon}>label_outline</span>
        <p className={classes.Note}>No notes with this label yet</p>
      </div>
    );

  function backdropClickHandler() {
    editArea.current();
    closeEditHandler();
  }

  return (
    <div>
      <div className={classes.NotesPage}>
        <Header />
        <SideBar openEditLabels={props.openEditLabels} />
        <CreateArea filterLabel={filterLabel} />

        {editing ? (
          <EditArea
            editAndUnarchive={props.editAndUnarchive}
            editAndArchive={props.editAndArchive}
            archive={props.archive}
            ref={editArea}
            note={editedNote}
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
        {displayedNotes.length === 0 &&
        archivedNotes.length === 0 &&
        props.text === "" &&
        props.color === ""
          ? noNotes
          : null}

        {pinnedNotes.length > 0 ? (
          <div className={classes.Notes}>
            {props.text === "" && props.color === "" ? null : (
              <h3 className={classes.SearchResult}>Search Results:</h3>
            )}
            <h5>PINNED</h5>
            <Masonry>
              {pinnedNotes.map((note) => {
                return (
                  <Note
                    archived={false}
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

        <div
          className={
            classes.Notes +
            (pinnedNotes.length > 0 ? " " + classes.NotesWhenPinned : "")
          }
        >
          {(props.text !== "" || props.color !== "") &&
          pinnedNotes.length === 0 ? (
            <h3 className={classes.SearchResult}>Search Results:</h3>
          ) : null}
          {pinnedNotes.length > 0 && unpinnedNotes.length > 0 ? (
            <h5>OTHERS</h5>
          ) : null}
          <Masonry>
            {unpinnedNotes.map((note) => {
              return (
                <Note
                  archived={false}
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

        <div
          className={
            classes.Notes +
            (archivedNotes.length > 0 ? " " + classes.NotesWhenPinned : "")
          }
        >
          {archivedNotes.length > 0 ? <h5>ARCHIVE</h5> : null}
          <Masonry>
            {archivedNotes.map((note) => {
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
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    notes: state.main.notes,
    archive: state.main.archive,
    text: state.filters.filterText,
    color: state.filters.filterColor,
    labels: state.main.labels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    editNote: (id, note) => dispatch(editNote(id, note)),
    archiveNote: (note) => dispatch(archiveNote(note)),
    editAndArchive: (oldNote, newNote) =>
      dispatch(editAndArchive(oldNote, newNote)),
    editAndUnarchive: (oldNote, newNote) =>
      dispatch(editAndUnarchive(oldNote, newNote)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
