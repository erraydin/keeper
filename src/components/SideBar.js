import React from "react";
import classes from "./SideBar.module.css";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      <div className={classes.SideBar}>
        {/* <NavLink activeClassName={classes.active} to="/" exact>
          <span ><span class="material-icons" style={{verticalAlign: "middle"}}>note</span> <span style={{verticalAlign: "middle"}}>Notes</span></span>
        </NavLink>
        <NavLink activeClassName={classes.active} to="trash" exact>
          🗑 Trash
        </NavLink> */}

        <nav>
          <ul className={classes.NavigationItems}>
            <li className={classes.NavigationItem}>
              <NavLink activeClassName={classes.active} to="/" exact>
                <span
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  note
                </span>{" "}
                <span style={{ verticalAlign: "middle" }}>Notes</span>
              </NavLink>
            </li>

            <li className={classes.NavigationItem}>
              <NavLink activeClassName={classes.active} to="/trash" exact>
                <span
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  delete
                </span>
                <span style={{ verticalAlign: "middle" }}>Trash</span>
              </NavLink>
            </li>
            <li className={classes.NavigationItem}>
              <NavLink activeClassName={classes.active} to="/edit-labels" exact>
                <span
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  edit
                </span>
                <span style={{ verticalAlign: "middle" }}>Edit Labels</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
