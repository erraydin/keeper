import React from "react";
import classes from "./LoginPage.module.css";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

const LoginPage = (props) => {
  return (
    <div className={classes.Screen}>
      <div className={classes.Form}>
        <h1>
          <i className="far fa-lightbulb"></i> <span>Keeper</span>
        </h1>
        <div>
          <input placeholder="Email"></input>
        </div>
        <div>
          <input placeholder="Password"></input>
        </div>
        <div className={classes.ButtonArea}>
          <button>Guest Mode</button>
          <button onClick={props.startLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
