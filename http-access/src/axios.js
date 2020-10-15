import axios from 'axios';

// this assumes the defaults from index.js
// but will override it if provided with
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'

})

instance.defaults.headers.common['Authorization'] = 'Even more secure';

instance.interceptors.request.use(request => {
    console.log(request);

// You must return the  request, but you can also edit the request
    return request;
}, error => {
    console.log(error);
    // We also must return this so the place calling can us it too
    return Promise.reject(error);
})


export default instance;