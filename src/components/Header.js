import React, { useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "./Button";
import { setFilterText, setFilterColor } from "../actions/filters";
import { connect } from "react-redux";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ColorPopper from "./ColorPopper";

function Header(props) {
  const [colorPopperLocation, setColorPopperLocation] = useState(null);

  const open = Boolean(colorPopperLocation);
  const id = open ? "simple-popper" : undefined;

  function openColorEditHandler(event) {
    event.stopPropagation();
    setColorPopperLocation((oldColorPopperLocation) => {
      return oldColorPopperLocation ? null : event.currentTarget;
    });
  }
  function closeColorEditHandler() {
    if (open) {
      setColorPopperLocation(null);
    }
  }
  function setfilterText(event) {
    props.setFilterText(event.target.value);
  }

  function setFilterColor (color) {
    props.setFilterColor(color);
    closeColorEditHandler()
  }
  function clearSearch() {
    props.setFilterText("");
    props.setFilterColor("");
  }
  return (
    <header className={classes.header}>
      <Link to="/" exact="true">
        <h1>Keeper</h1>
      </Link>
      <div className={classes.Search}>
        <div className={classes.SearchButton}>
          <Button tooltipTitle="Search">
            <SearchIcon />
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={props.text}
          onChange={setfilterText}
        ></input>
        <div className={classes.ClearButton}>
          <Button
            tooltipTitle="Filter by color"
            onClick={openColorEditHandler}
          >
            <PaletteOutlinedIcon />
          </Button>
        </div>
        <ClickAwayListener onClickAway={closeColorEditHandler}>
          <Popper
            id={id}
            open={open}
            anchorEl={colorPopperLocation}
            disablePortal
          >
            <ColorPopper changeColorHandler={setFilterColor}/>
          </Popper>
        </ClickAwayListener>
        <div className={classes.ClearButton}>
          <Button tooltipTitle="Clear search" onClick={clearSearch}>
            <ClearIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    text: state.filters.filterText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterText: (filterText) => dispatch(setFilterText(filterText)),
    setFilterColor: (filterColor) => dispatch(setFilterColor(filterColor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
