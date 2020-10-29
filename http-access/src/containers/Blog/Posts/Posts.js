import React, {Component} from "react";

import './Posts.css';
import Post from "../../../components/Post/Post";
import axiosInstance from "../../../axios";
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {

    componentDidMount() {
        axiosInstance.get('/posts').then(
            response => {
                const posts = response.data.slice(0, 4);
                // Hard coding an author
                const updatedPosts = posts.map(post => {
                    return {...post, 'author': 'Jesse'}
                });
                this.setState({posts: updatedPosts, error: false});
                // console.log(response);
            }
        ).catch(error => {
            console.log(error);
            this.setState({error: true});
        });
    }

    state = {
        posts: []
    }

    showFullPostHandler = (id) => {
        this.props.history.push({pathname: '/' + id});
        // this.props.history.push('/' +id);
        // this.setState({'selectedPostId': id});
    }

    render() {

        let posts = <p style={{textAlign: "center"}}>Something when wrong... totally my bad.</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                    <Post title={post.title}
                          key={post.id}
                          author={post.author}
                          showFull={() => this.showFullPostHandler(post.id)}/>
                    // </Link>
                )
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/*<Route path="/:id" exact component={FullPost}/>*/}
                {/*For nested routing use the match url to not have to manually change all of the urls*/}
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;