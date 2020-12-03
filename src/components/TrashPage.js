import React, { useEffect } from "react";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import {
  deleteNotePermanently,
  restoreNote,
  emptyTrash,
} from "../actions/actions";
import classes from "./TrashPage.module.css";
import Header from "./Header";
import SideBar from "./SideBar";
import getVisibleNotes from "../selectors/notes";

const noTrash = (
  <div className={classes.Empty}>
    <span
      className={"material-icons " + classes.Icon}
      style={{ verticalAlign: "middle" }}
    >
      delete_outline
    </span>
    <p className={classes.Note}>No notes in Trash</p>
  </div>
);

function TrashPage(props) {
  // useEffect(() => {
  //   console.log(props);
  // });
  const displayedTrashNotes = getVisibleNotes(props.trash, "", props.text, props.color);
  const yesTrash = (
    props.text === "" ?
    <button
      style={{ marginTop: "110px" }}
      className={classes.Button}
      type="button"
      onClick={props.emptyTrash}
    >
      Click here to empty trash
    </button> : 
    <h3 className={classes.SearchResult}>Search Results:</h3>
  );


  return (
    <div className={classes.NotePage}>
      <Header />
      <SideBar openEditLabels={props.openEditLabels} />
      <div className={classes.Notes}>
        {props.trash.length === 0 ? noTrash : yesTrash}
        <Masonry>
          {displayedTrashNotes.map((note, index) => {
            return (
              <Note
                archived={false}
                editable={false}
                type={note.type}
                key={note.id}
                note={note}
                index={index}
                deleteNote={props.deleteNotePermanently}
                deleteTooltip="Delete Permanently"
                showEditButton={false}
                restoreNote={props.restoreNote}
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
    trash: state.main.trash,
    notes: state.main.notes,
    text: state.filters.filterText,
    color: state.filters.filterColor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNotePermanently: (index) => dispatch(deleteNotePermanently(index)),
    restoreNote: (index) => dispatch(restoreNote(index)),
    emptyTrash: () => dispatch(emptyTrash()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrashPage);
