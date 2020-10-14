import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItems from "../NavigationItem/NavigationItem";

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    {/* if it is a bool and true you can just sent the prop name with no variable*/}
    <NavigationItems link="/" active >Burger Bulder</NavigationItems>
    <NavigationItems link="/">Checkout</NavigationItems>
</ul>
);

export default navigationItems;