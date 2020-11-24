import React from "react";
import CreateArea from "./CreateArea";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import {addNote, deleteNote} from "../actions/actions";


function NotesPage(props) {
  return (
    <React.Fragment>
      <CreateArea addNote={props.addNote}/>
      <div style={{ marginLeft: "236px"}}>
        <Masonry >
        {props.notes.map((note, index) => {
          return <Note note={note} index={index} deleteNote={props.deleteNote}/>;
        })}
        </Masonry>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addNote: (note) => dispatch(addNote(note)),
      deleteNote: (index) => dispatch(deleteNote(index))
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
