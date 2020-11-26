import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { editLabel } from "../actions/actions";
import classes from "./EditLabel.module.css";


function EditLabel(props) {
  // const [labelName, setLabelName] = useState(
  //   props.labelName ? props.labelName : "am"
  // );

  // useEffect(() => {
  //   if (props.labelName) {
  //     setLabelName(props.labelName);
  //   }
  //   console.log(labelName + " zaa");
  // }, [props.labelName, labelName]);

  const [labelName, setLabelName] = useState(props.label.labelName);
  const inputRef = useRef(null);

  function changeLabelName(event) {
    setLabelName(event.target.value);
  }

  function editHandler() {
    props.editLabel(props.label.id, labelName);
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      props.editLabel(props.label.id, labelName);
      inputRef.current.blur();
    }
  }
  
  useEffect(() => {
    const index = props.labels.findIndex(label => {
      return label.id === props.label.id
    })
    setLabelName(props.labels[index].labelName);
  }, [props.labels, props.label.id])

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editLabel: (id, newLabelName) => dispatch(editLabel(id, newLabelName)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLabel);
