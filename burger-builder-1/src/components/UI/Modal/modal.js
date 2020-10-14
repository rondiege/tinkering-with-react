import React, {Component} from "react";
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

// this could be a functional component doesn't have to be a class
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal] DidUpdate');
    }

    render() {

        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;