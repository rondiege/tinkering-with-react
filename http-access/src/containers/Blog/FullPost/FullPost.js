import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }
    componentDidMount(prevProps, prevState, snapshot) {
        console.log(this.props);
        this.loadData();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData();
    }

    // we have to us both DidMount and DidUpdate when using routes, as routes re-uses components
    loadData() {
        if(this.props.match.params.id) {
            // If we don't do this we will get in infinite loop as setting the state will
            // keep calling render, which will keep calling this function
            if(!this.state.loadedPost || this.state.loadedPost.id != this.props.match.params.id){
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data});
                    });
            }

        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({loadedPost: null});
            })
    }

    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        // we get the post asyc, but we render right away, so we need to be sure we have the info before we load it.
        if(this.props.match.params.id) {
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;