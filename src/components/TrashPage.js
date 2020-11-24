import React from "react";
import { connect } from "react-redux";
import Note from "./Note";
import Masonry from "react-masonry-component";
import { deleteNotePermanently } from "../actions/actions";

function TrashPage(props) {
  return (
    <React.Fragment>
      <div style={{ marginLeft: "236px" }}>
        <Masonry>
        {props.trash.map((note, index) => {
          return <Note note={note} index={index} deleteNote={props.deleteNotePermanently}/>;
        })}
        </Masonry>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    trash: state.trash,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      deleteNotePermanently: (index) => dispatch(deleteNotePermanently(index))
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(TrashPage);