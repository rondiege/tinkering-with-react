import React from "react";
import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo";
import Navigation from "../NavigationItems/NavigationItems"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle openSideDrawerAct={props.openSideDrawerAct} />
        <div className={classes.Logo}>
             <Logo height="80%"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigation/>
        </nav>
    </header>
);

export default toolbar;