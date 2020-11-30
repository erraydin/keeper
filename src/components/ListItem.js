import React from "react";
import classes from "./ListItem.module.css";
import { connect } from "react-redux";
import { listItemCheckedToggle } from "../actions/actions";

function ListItem(props) {
  function toggleHandler (event) {
    props.listItemCheckedToggle(props.listId, props.item, props.checked);
    event.stopPropagation();
  }
  return (
    <li onClick={props.editable ? toggleHandler : null} className={props.editable ? classes.Editable : null}>
      <div className={props.editable ? classes.Checkbox : classes.NotEditable + " " + classes.Checkbox}>
        {props.checked ? (
          <i className="far fa-check-square"></i>
        ) : (
          <i className="far fa-square"></i>
        )}
      </div>
      <div style={{ display: "inline-block", marginLeft: "21px", width: "85%", marginBottom: "5px" }}>
        {props.item.item}
      </div>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    listItemCheckedToggle: (noteId, listItem, checked) =>
      dispatch(listItemCheckedToggle(noteId, listItem, checked)),
  };
};

export default connect(null, mapDispatchToProps)(ListItem);
