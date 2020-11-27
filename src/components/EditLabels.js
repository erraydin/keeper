import React, { useState, useEffect, useRef } from "react";
import classes from "./EditLabels.module.css";
import { addNewLabel } from "../actions/actions";
import { connect } from "react-redux";
import Button from "./Button";
import AddIcon from "@material-ui/icons/Add";
import EditLabel from "./EditLabel";


function EditLabels(props) {
  const [newLabel, setNewLabel] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  function changeNewLabel(event) {
    setNewLabel(event.target.value);
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      props.addNewLabel(newLabel);
      setNewLabel("");
    }
  }

  function addHandler() {
    props.addNewLabel(newLabel);
    setNewLabel("");
    inputRef.current.focus()
  }


  return (
    <div className={classes.Form}>
      <div className={classes.InputArea}><p stye={{marginLeft: "20px", padding: "10px"}}>Edit Labels</p></div>
      <div className={classes.InputArea}>
        <input
          ref={inputRef}
          onKeyPress={handleEnter}
          className={classes.Input}
          autoComplete="off"
          name="label"
          placeholder="Add label..."
          value={newLabel}
          onChange={changeNewLabel}
          maxLength="40"
        />{" "}
        <Button tooltipTitle="Create new label" onClick={addHandler}>
          <AddIcon />
        </Button>
      </div>
      <ul>
        {props.labels.map((label) => {
          return (
            <li key={label}>
              <div className={classes.InputArea}>
                <EditLabel label={label} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={classes.DoneButton}>
      <Button tooltipTitle="Close" onClick={props.closeEditLabels}>
        Close
      </Button>
      </div>
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
    addNewLabel: (label) => dispatch(addNewLabel(label)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLabels);
