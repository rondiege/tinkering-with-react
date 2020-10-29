import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    {/* if it is a bool and true you can just sent the prop name with no variable*/}
    <NavigationItem link="/" active >Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
</ul>
);

export default navigationItems;