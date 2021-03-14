import React from "react";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
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
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
