import React, { useState, useRef } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "./Button";
import { setFilterText, setFilterColor } from "../actions/filters";
import { openSidebar, closeSidebar } from "../actions/ui";
import { connect } from "react-redux";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ColorPopper from "./ColorPopper";
import MenuIcon from "@material-ui/icons/Menu";
import { startLogout } from "../actions/auth";

function color(color) {
  switch (color) {
    case "white":
      return classes.white;

    case "orange":
      return classes.orange;

    case "yellow":
      return classes.yellow;

    case "green":
      return classes.green;

    case "turquoise":
      return classes.turquoise;

    case "blue":
      return classes.blue;

    case "darkblue":
      return classes.darkblue;

    case "purple":
      return classes.purple;

    case "pink":
      return classes.pink;

    default:
      return;
  }
}
function Header(props) {
  const [colorPopperLocation, setColorPopperLocation] = useState(null);

  const open = Boolean(colorPopperLocation);
  const id = open ? "simple-popper" : undefined;
  const menu = useRef(null);
  function openColorEditHandler(event) {
    // event.stopPropagation();
    event.stopPropagation();
    setColorPopperLocation((oldColorPopperLocation) => {
      return oldColorPopperLocation ? null : event.currentTarget;
    });
  }
  function closeColorEditHandler(event) {
    if (open) {
      console.log(event);
      setColorPopperLocation(null);
    }
  }
  function setfilterText(event) {
    props.setFilterText(event.target.value);
  }

  function setFilterColor(color) {
    props.setFilterColor(color);
    closeColorEditHandler();
  }
  function clearSearch() {
    props.setFilterText("");
    props.setFilterColor("");
  }

  function toggleSidebar(event) {
    if (props.sidebarOpen) {
      props.closeSidebar();
    } else {
      event.stopPropagation();
      props.openSidebar();
    }
  }

  return (
    <header className={classes.header}>
      <span
        className={classes.HamburgerMenu}
        onClick={toggleSidebar}
        ref={menu}
      >
        <MenuIcon fontSize="inherit" />
      </span>
      <span className={classes.Keeper}>
        <Link to="/notes" exact="true" onClick={clearSearch}>
          <h1>
            <i className="far fa-lightbulb"></i> <span>Keeper</span>
          </h1>
        </Link>
      </span>
      <div className={classes.Search}>
        <div className={classes.SearchButton}>
          <Button tooltipTitle="Search">
            <SearchIcon />
          </Button>
        </div>
        <input
          type="text"
          placeholder={
            "Search" + (props.color === "" ? "" : " within " + props.color)
          }
          value={props.text}
          onChange={setfilterText}
        ></input>
        <div
          className={
            classes.PaletteButton +
            " " +
            (props.color === "" ? "" : color(props.color))
          }
        >
          <Button tooltipTitle="Filter by color" onClick={openColorEditHandler}>
            <PaletteOutlinedIcon />
          </Button>
        </div>
        <ClickAwayListener
          onClickAway={closeColorEditHandler}
          touchEvent={false}
        >
          <Popper
            id={id}
            open={open}
            anchorEl={colorPopperLocation}
            disablePortal
          >
            <ColorPopper changeColorHandler={setFilterColor} />
          </Popper>
        </ClickAwayListener>
        <div className={classes.ClearButton}>
          <Button
            tooltipTitle="Clear Search and Color Filter"
            onClick={clearSearch}
          >
            <ClearIcon />
          </Button>
        </div>
      </div>
      <div className={classes.LogoutButton}>
        <button onClick={props.startLogout}>Logout</button>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    text: state.filters.filterText,
    color: state.filters.filterColor,
    sidebarOpen: state.ui.sidebarOpenMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterText: (filterText) => dispatch(setFilterText(filterText)),
    setFilterColor: (filterColor) => dispatch(setFilterColor(filterColor)),
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    startLogout: () => dispatch(startLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
