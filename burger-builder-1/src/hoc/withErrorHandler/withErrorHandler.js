import React from "react";

import Modal from "../../components/UI/Modal/modal";

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            });
        }

        // We need to remove the interceptors as they will keep "living" on after a component is removed
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler =  () => {
            this.setState({error: null});
        }
        render(){
            return (
                <React.Fragment>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;