import React from "react";
import classes from "./SideBar.module.css";
import NavigationItem from "./NavigationItem";

function SideBar() {
  return (
    <React.Fragment>
      <div className={classes.SideBar}>
        <nav>
          <ul className={classes.NavigationItems}>
            <NavigationItem path="/" iconName="note" title="Notes" />
            <NavigationItem path="/trash" iconName="delete" title="Trash" />
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
