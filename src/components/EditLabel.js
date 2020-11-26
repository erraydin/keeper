import React, { useState } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
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

  function changeLabelName(event) {
    setLabelName(event.target.value);
  }

  function editHandler() {
    console.log(labelName);
    props.editLabel(props.label.id, labelName);
  }

  
  return (
    <div>
      <input
        style={{ display: "inline-block", marginLeft: "10px" }}
        value={labelName}
        onChange={changeLabelName}
        name="label name"
        placeholder="Change label name"
      />
      <Button tooltipTitle="Add new label" onClick={editHandler}>
        <AddIcon />
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
