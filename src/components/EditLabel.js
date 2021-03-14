import React, { useState, useRef } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { editLabel, deleteLabelCompletely } from "../actions/actions";
import classes from "./EditLabel.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory, useLocation } from "react-router-dom";

function EditLabel(props) {
  const [labelName, setLabelName] = useState(props.label);
  const [dialogOpen, setDialogOpen] = useState(false);
  const inputRef = useRef(null);

  const location = useLocation();
  const history = useHistory();
  function changeLabelName(event) {
    setLabelName(event.target.value);
  }
  function handleDialogkOpen() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
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

  function deleteHandler() {
    if ("/label/" + props.label === location.pathname) {
      history.push("/notes");
    }
    props.deleteLabelCompletely(props.label);
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      if (!props.labels.includes(labelName)) {
        props.editLabel(props.label, labelName);
        if ("/label/" + props.label === location.pathname) {
          history.push("/label/" + labelName);
        }
        inputRef.current.blur();
      } else {
        setLabelName(props.label);
      }
    }
  }

  // useEffect(() => {
  //   const index = props.labels.indexOf(props.label);
  //   setLabelName(props.labels[index]);
  // }, [props.labels, props.label]);

  return (
    <div className={classes.InputArea}>
      <Button tooltipTitle="Delete this label" onClick={handleDialogkOpen}>
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
      <Button tooltipTitle="Edit" onClick={editHandler}>
        <EditIcon />
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogContent>
          <DialogContentText>
            We’ll delete this label and remove it from all of your notes. Your
            notes won’t be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.Button}>
            <Button onClick={handleDialogClose} tooltipTitle="Cancel">
              Cancel
            </Button>
          </div>
          <div className={classes.Button}>
            <Button onClick={deleteHandler} tooltipTitle="Delete">
              Delete
            </Button>
          </div>
        </DialogActions>
      </Dialog>
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
    deleteLabelCompletely: (label) => dispatch(deleteLabelCompletely(label)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLabel);
