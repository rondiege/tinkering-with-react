import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Posts from './Posts/Posts';
import './Blog.css';
import asyncComponent from "../../hoc/asynComponent";
// Commenting this out to show lazy loading,
// need to inform webpack another way on when to import that file
// import NewPost from "./NewPost/NewPost";

const AsyncNewPost = asyncComponent(() => {

    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth: true
    }

    render() {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/*Use link instead of a href to make it so the whole page
                            does not reload and then the current state is lost etc.*/}
                            <li><NavLink
                                to="/posts"
                                exact
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}
                                activeClassName="my-active">Posts</NavLink></li>
                            {/*By default activeClassName is active, this is just to
                            show it is customizable*/}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'

                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Posts</h1>}/>*/}
                {/*<Route path="/new-post" component={NewPost}/>*/}

                {/* Switch makes it so only one route loads, even if there is multiple that match*/}
                <Switch>
                    {/* Exact mean not to just check the prefix of the url,but exactly the path
                path is the endpoint, render takes an arrow function and then takes jsx*/}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    {/*Component takes the name you called it when importing*/}
                    {/*<Route path="/:id" exact component={FullPost}/>*/}
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                    {/*This is a catch all that should be used last in the switch
                    and be used to hand 404s*/}
                    {/*<Redirect render={() => <h1>Not Found</h1>}/>*/}
                </Switch>

                {/*<section className="Posts">*/}
                {/*    {posts}*/}
                {/*</section>*/}
                {/*<section>*/}
                {/*    <FullPost id={this.state.selectedPostId} />*/}
                {/*</section>*/}
                {/*<section>*/}
                {/*    <NewPost />*/}
                {/*</section>*/}
            </div>
        );
    }
}

export default Blog;