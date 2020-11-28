import React, { useState } from "react";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import { addNote, deleteNote, editNote } from "../actions/actions";
import { setFilterLabel } from "../actions/filters";
import classes from "./NotesPage.module.css";
import getVisibleNotes from "../selectors/notes";
import List from "./List";

function NotesPage(props) {
  const [editedId, setEditedId] = useState(null);
  const [editing, setEditing] = useState(false);
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
  const editedIndex = props.notes.findIndex((note) => {
    return note.id === editedId;
  });

  return (
    <React.Fragment>
      <CreateArea filterLabel={filterLabel} />
      {editing ? (
        <EditArea
          note={props.notes[editedIndex]}
          editNote={props.editNote}
          // editedId={editedId}
          closeEdit={closeEditHandler}
        ></EditArea>
      ) : null}
      {displayedNotes.length === 0 ? noNotes : null}
      <div className={classes.Notes}>
        <Masonry>
          {displayedNotes.map((note, index) => {
            return note.type === "note" ? (
              <Note
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
            ) : (
              <List list={note} key={note.id}/>
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
