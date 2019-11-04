import jwt from 'jsonwebtoken';

import { Service } from '../services/baseService';
import { SET_USER, LOGIN, LOGOUT, GET_USER_TYPES, EDIT_USER } from '../reducers/auth';
import { SHOW_MESSAGE } from '../reducers/alert';
import { DISABLE_LOADING, ENABLE_LOADING } from '../reducers/loading';

export const SignupMethod = payload => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    Service.post('/signup', payload).then((response) => {
        dispatch({ type: DISABLE_LOADING });
        const user = jwt.verify(response.data.token, 'mysecretkey54');
        localStorage.setItem('auth_user', response.data.token);
        dispatch({ type: LOGIN, payload: { user, token: response.data.token } });
    }).catch((error) => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'Registration Error', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    })
}

export const logoutMethod = () => dispatch => {
    localStorage.removeItem('auth_user');
    dispatch({ type: LOGOUT });
}

export const editUserLocalMethod = payload => dispatch => {
    dispatch({ type: EDIT_USER, payload });
};

export const getTypes = () => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    Service.get('/userTypes').then((response) => {
        dispatch({ type: DISABLE_LOADING });
        dispatch({ type: GET_USER_TYPES, payload: response.data.data });
    }).catch((error) => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({ type: SHOW_MESSAGE, payload: { header: 'Error in getting Types', message: [error.message] } });
    });
}

export const signInMethod = payload => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    Service.post('/signin', payload).then((response) => {
        dispatch({ type: DISABLE_LOADING });
        const user = jwt.verify(response.data.token, 'mysecretkey54');
        localStorage.setItem('auth_user', response.data.token);
        dispatch({ type: LOGIN, payload: { user, token: response.data.token } });
    }).catch((error) => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'Login Error', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    })
}

export const setUser = (type) => (dispatch) => dispatch({ type: SET_USER, payload: type });