import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" exact="true"><h1>Keeper</h1></Link>
    </header>
  );
}

export default Header;
