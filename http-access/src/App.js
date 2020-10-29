import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
    render() {
        return (
            // <BrowserRouter basename="my-super-cool-app">
            <BrowserRouter>
                <div className="App">
                    <Blog/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
