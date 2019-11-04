import axios from 'axios';
import store from '../store';
import {LOGOUT} from "../reducers/auth";
//const heroku = 'https://work-tenders.herokuapp.com';
const local = 'http://localhost:5000'; 
export const baseURL = local;
const baseService  = axios.create({ baseURL  });
export const Service = axios.create({ baseURL });

baseService.interceptors.request.use( config => {
    if(localStorage.getItem('auth_user') ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('auth_user')}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

baseService.interceptors.response.use( config => {
    return config;
}, error => {
    if(error.response && error.response.status === 401) {
        localStorage.removeItem('auth_user');
        store.dispatch({type: LOGOUT});
        return Promise.reject({response: {data: {error: 'please login first'}}});
    }
    return Promise.reject(error);
});

export default baseService;