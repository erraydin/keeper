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
          <p>Keep your notes organized.</p>
        </div>
        <div className={classes.ButtonArea}>
          <button onClick={props.startLogin}>Login with Google</button>
          {/* <button>Guest Mode</button> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
