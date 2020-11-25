import React from "react";


function Backdrop (props) {
    let style = {
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: "100",
        left: "0",
        top: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    if (props.transparent) {
        style.backgroundColor = "rgba(0, 0, 0, 0)"
    }
    return props.show ? <div style={style} onClick={props.onClick}></div> :  null;
}

export default Backdrop;