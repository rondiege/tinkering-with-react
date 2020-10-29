// If you are using React 16.6 or later you can now use React Lazy instead of this

import React, { Component } from "react";

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component : null
        }

        componentDidMount() {
            importComponent().then(cmp => {
                this.setState({component: cmp.default});
                });
        }

        render() {

            const C = this.state.component;

            return C ? <C {...this.props} /> : null;

        }
    }
}

export default asyncComponent;