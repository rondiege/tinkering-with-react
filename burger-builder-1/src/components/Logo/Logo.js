import React from "react";
import burgerLogo from "../../assests/images/burger-logo.png";
import classes from "./logo.module.css"


const logo = (props) => (
   <div className={classes.Logo} style={{height: props.height}}>
       <img src={burgerLogo} alt={"Better Burger"}/>
   </div>
);

export default logo;