import React, { useState } from "react";
import classes from "./AddLabels.module.css";
import { addNewLabel } from "../actions/actions";
import { connect } from "react-redux";
import Button from "./Button";
import AddIcon from '@material-ui/icons/Add';

function AddLabels(props) {
  const [newLabel, setNewLabel] = useState("");

  function changeNewLabel(event) {
    setNewLabel(event.target.value);
  }

  // useEffect(() => {
  //   console.log(props.labels);
  //   console.log(props.chosenLabels);
  // }, [props.labels, props.chosenLabels]);

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
    <div className={classes.List}>
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
        {props.labels.map((item, index) => {
          return (
            <li key={item.id} onClick={() => props.clickHandler(index)}>
              <div className={classes.Checkbox}>
                {props.chosenLabels[index] ? (
                  <i className="far fa-check-square"></i>
                ) : (
                  <i className="far fa-square"></i>
                )}
              </div>
              <div style={{ display: "inline-block", marginLeft: "10px" }}>
                {item.labelName}
              </div>
            </li>
          );
        })}
      </ul>
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
