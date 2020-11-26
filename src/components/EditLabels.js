import React, { useState } from "react";
import classes from "./EditLabels.module.css";
import { addNewLabel } from "../actions/actions";
import { connect } from "react-redux";
import Button from "./Button";
import AddIcon from "@material-ui/icons/Add";
import EditLabel from "./EditLabel";

function AddLabels(props) {
  const [newLabel, setNewLabel] = useState("");

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
  }

  // <input
  //   onChange={() => {
  //     return;
  //   }}
  //   checked={props.chosenLabels[index]}
  //   type="checkbox"
  //   id={index}
  //   style={{ marginRight: "8px" }}
  // />;

  return (
    <div className={classes.Form}>
      <div className={classes.InputArea}>
        <input
          onKeyPress={handleEnter}
          className={classes.Input}
          autoComplete="off"
          name="label"
          placeholder="Add label..."
          value={newLabel}
          onChange={changeNewLabel}
        />{" "}
        <Button tooltipTitle="Add new label" onClick={addHandler}>
          <AddIcon />
        </Button>
      </div>
      <ul>
        {props.labels.map((item) => {
          return (
            <li key={item.id}>
              <div className={classes.InputArea}>
                <EditLabel label={item} />
              </div>
            </li>
          );
        })}
      </ul>
      <Button tooltipTitle="Add new label" onClick={addHandler}>
        Done
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
    addNewLabel: (label) => dispatch(addNewLabel(label)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddLabels);
