import React, {Component} from "react";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawToggleHandler = () => {

        // Don't do it this way as the state might not be updated when we try and access it here.
        // this.setState({showSideDrawer: !this.state.showSideDrawer});

        // Use this way when setting state depends on the old state
        this.setState((prevState) =>
        {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar openSideDrawerAct={this.sideDrawToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawToggleHandler}/>
                <div>SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }

}

export default Layout;