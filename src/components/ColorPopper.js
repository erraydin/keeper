import React from "react";
import classes from "./ColorPopper.module.css";
import Tooltip from "@material-ui/core/Tooltip";

const COLORS = [
  "white",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "darkblue",
  "purple",
  "pink",
];
const COLOR_CLASSES = [
  classes.white,
  classes.orange,
  classes.yellow,
  classes.green,
  classes.turquoise,
  classes.blue,
  classes.darkblue,
  classes.purple,
  classes.pink,
];
function ColorPopper(props) {
  return (
    <div className={classes.Frame}>
      <div style={{ display: "flex-box", width: "103px" }}>
        {COLORS.map((color, index) => {
          return (
            <Tooltip key={color} title={color}>
              <div className={classes.Button + " " +COLOR_CLASSES[index]} onClick={() => props.changeColorHandler(color)}></div>
            </Tooltip>
          );
        })}
        {/* <Tooltip title="white">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="orange">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="yellow">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="green">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="turquoise">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="blue">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="darkblue">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="purple">
          <button type="button"></button>
        </Tooltip>
        <Tooltip title="pink">
          <button type="button"></button>
        </Tooltip> */}
      </div>
    </div>
  );
}

export default ColorPopper;
