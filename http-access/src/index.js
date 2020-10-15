import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'super secure';
//this is default so just an example
axios.defaults.headers.post['Context-Type'] = 'application/json';
// this happens for all axios calls pre sending etc
axios.interceptors.request.use(request => {
    console.log(request);

// You must return the  request, but you can also edit the request
    return request;
}, error => {
    console.log(error);
    // We also must return this so the place calling can us it too
    return Promise.reject(error);
})

axios.interceptors.response.use(
    response => {
        console.log(response)
        return response;
    },error => {
        console.log(error);
        // We also must return this so the place calling can us it too
        return Promise.reject(error);
    }
)
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
