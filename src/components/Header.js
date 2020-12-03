import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import Button from "./Button";
import { setFilterText } from "../actions/filters";
import { connect } from "react-redux";

function Header(props) {
  function setfilterText (event) {
    props.setFilterText(event.target.value);
  }
  function clearSearch() {
    props.setFilterText("");
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
        <input type="text" placeholder="Search" value={props.text} onChange={setfilterText}></input>
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
    setFilterText : (filterText) => dispatch(setFilterText(filterText))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
