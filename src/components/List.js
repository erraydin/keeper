import React from "react";
import ListItem from "./ListItem";
import classes from "./List.module.css";
import Button from "./Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


function List(props) {
  return (
    <div className={classes.List}>
      <p className={classes.Title}>{props.list.title}</p>
      <ul>
        {props.list.unchecked.map((item) => {
          return <ListItem key={item.id} item={item} checked={false} listId={props.list.id}/>;
        })}
      </ul>
      {(props.list.checked.length > 0 && props.list.unchecked.length) > 0 ? <hr /> : null}
      <ul>
        {props.list.checked.map((item) => {
          return <ListItem key={item.id} item={item} checked={true} listId={props.list.id}/>;
        })}
      </ul>
      <div className={classes.Labels}>
        {props.list.labels.slice(0, 3).map((label) => {
          return (
            <div key={label} className={classes.Label}>
              <span className={classes.LabelText}>{label}</span>

              <div className={classes.Button}>
                <Button
                  tooltipTitle="Delete label"
                >
                  <span
                    className="material-icons-outlined"
                    style={{
                      verticalAlign: "middle",
                      display: "inline-block",
                      fontSize: "15px",
                    }}
                  >
                    close
                  </span>
                </Button>
              </div>
            </div>
          );
        })}
        {props.list.labels.length > 3 ? (
          <div className={classes.RemainingLabels}>
            <span style={{ fontSize: "15px" }}>{"+" + (props.list.labels.length - 3)}</span>
          </div>
        ) : null}
      </div>
      <div className={classes.ButtonArea}>
        <div style={{ width: "160px" }}></div>
        <Button tooltipTitle="Edit">
          <DeleteIcon />
        </Button>
        <Button tooltipTitle="Edit">
          <EditIcon />
        </Button>
        
      </div>
    </div>
  );
}

export default List;
