import React, { Component } from 'react';
import axiosInstance from "../../axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        'selectedPostId': null,
        'error': true
    }
    componentDidMount() {
        axiosInstance.get('/posts').then(
            response => {
                const posts = response.data.slice(0,4);
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

    showFullPostHandler = (id) => {
        this.setState({'selectedPostId': id});
    }
    render () {
        let posts = <p style={{textAlign:"center"}} >Something when wrong... totaly my bad.</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post key={post.id}
                             title={post.title}
                             author={post.author}
                             showFull={() => this.showFullPostHandler(post.id)}/>
            })
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;