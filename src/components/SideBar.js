import React from "react";
import classes from "./SideBar.module.css";
import NavigationItem from "./NavigationItem";
import { connect } from "react-redux";

function SideBar(props) {
  return (
    <React.Fragment>
      <div className={classes.SideBar}>
        <nav>
          <ul className={classes.NavigationItems}>
            <NavigationItem path="/" iconName="note" title="Notes" />
            <li className={classes.NavigationItem} onClick={props.openEditLabels}>
              <div>
                <span
                  className="material-icons-outlined"
                  style={{
                    verticalAlign: "middle",
                    display: "inline-block",
                    width: "30px",
                  }}
                >
                  edit
                </span>{" "}
                <span style={{ verticalAlign: "middle" }}>Edit Labels</span>
              </div>
            </li>
            {props.labels.map((label) => {
              return (
                <NavigationItem
                  key={label.id}
                  path={"/label/" + label.labelName}
                  iconName="label"
                  title={label.labelName}
                />
              );
            })}
            <NavigationItem path="/trash" iconName="delete" title="Trash" />
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
  };
};
export default connect(mapStateToProps)(SideBar);
