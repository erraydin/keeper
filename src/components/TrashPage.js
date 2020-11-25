import React, {useEffect} from "react";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import {
  deleteNotePermanently,
  restoreNote,
  emptyTrash,
} from "../actions/actions";
import classes from "./TrashPage.module.css";


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
  useEffect(() => {
    console.log(props);
  })
  const yesTrash = (
    <button
      className={classes.Button}
      type="button"
      onClick={props.emptyTrash}
    >
      Empty trash
    </button>
  )


  return (
    <React.Fragment>
      <div className={classes.Notes}>
        {props.trash.length === 0 ? (
          noTrash
        ) : yesTrash}
        <Masonry>
          {props.trash.map((note, index) => {
            return (
              <Note
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
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    trash: state.main.trash,
    notes: state.main.notes,
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
