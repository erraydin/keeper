import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { editLabel } from "../actions/actions";
import classes from "./EditLabel.module.css";
import { useHistory, useLocation } from "react-router-dom";

function EditLabel(props) {
  const [labelName, setLabelName] = useState(props.label);
  const inputRef = useRef(null);

  const location = useLocation();
  const history = useHistory();
  function changeLabelName(event) {
    setLabelName(event.target.value);
  }

  function editHandler() {
    if (!props.labels.includes(labelName)) {
      props.editLabel(props.label, labelName);
      if ("/label/" + props.label === location.pathname) {
        history.push("/label/" + labelName);
      }
    } else {
      setLabelName(props.label);
      inputRef.current.focus();
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      if (!props.labels.includes(labelName)) {
        props.editLabel(props.label, labelName);
        if ("/label/" + props.label === location.pathname) {
          history.push("/label/" + labelName);
        }
        inputRef.current.blur();
      } else{
        setLabelName(props.label);
      }
      
    }
  }

  useEffect(() => {
    const index = props.labels.indexOf(props.label);
    setLabelName(props.labels[index]);
  }, [props.labels, props.label]);

  return (
    <div className={classes.InputArea}>
      <Button tooltipTitle="Delete this label" onClick={editHandler}>
        <DeleteForeverIcon />
      </Button>
      <input
        ref={inputRef}
        type="text"
        className={classes.Input}
        onKeyPress={handleEnter}
        style={{ display: "inline-block", paddingLeft: "0" }}
        value={labelName}
        onChange={changeLabelName}
        name="label name"
        placeholder="Edit label name..."
      />
      <Button tooltipTitle="Confirm edit" onClick={editHandler}>
        <EditIcon />
      </Button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
    filterLabel: state.filters.filterLabel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editLabel: (oldLabel, newLabel) => dispatch(editLabel(oldLabel, newLabel)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLabel);
