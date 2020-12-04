import React from "react";
import classes from "./SideBar.module.css";
import NavigationItem from "./NavigationItem";
import EditLabelsNavItem from "./EditLabelsNavItem";
import { connect } from "react-redux";

function SideBar(props) {
  return (
    <React.Fragment>
      <div className={classes.SideBar + " " +  (props.sidebarOpen ? classes.Open : classes.Close)}>
        <nav>
          <ul className={classes.NavigationItems}>
            <NavigationItem path="/" iconName="note" title="Notes" />

            {props.labels.map((label) => {
              return (
                <NavigationItem
                  key={label}
                  path={"/label/" + label}
                  iconName="label"
                  title={label}
                />
              );
            })}
            <EditLabelsNavItem openEditLabels={props.openEditLabels} />
            <NavigationItem path="/archive" iconName="archive" title="Archive" />
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
    sidebarOpen: state.ui.sidebarOpenMobile,
  };
};
export default connect(mapStateToProps)(SideBar);
