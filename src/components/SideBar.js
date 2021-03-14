import React from "react";
import classes from "./SideBar.module.css";
import NavigationItem from "./NavigationItem";
import EditLabelsNavItem from "./EditLabelsNavItem";
import { connect } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { closeSidebar } from "../actions/ui";

function SideBar(props) {
  function clickAwayHandler() {
    if (props.sidebarOpen) {
      props.closeSidebar();
    }
  }
  return (
    <ClickAwayListener onClickAway={clickAwayHandler} touchEvent={false}>
      <div
        className={
          classes.SideBar +
          " " +
          (props.sidebarOpen ? classes.Open : classes.Close)
        }
      >
        <nav>
          <ul className={classes.NavigationItems}>
            <NavigationItem path="/notes" iconName="note" title="Notes" />

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
            <NavigationItem
              path="/archive"
              iconName="archive"
              title="Archive"
            />
            <NavigationItem path="/trash" iconName="delete" title="Trash" />
          </ul>
        </nav>
      </div>
    </ClickAwayListener>
  );
}
const mapStateToProps = (state) => {
  return {
    labels: state.main.labels,
    sidebarOpen: state.ui.sidebarOpenMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
