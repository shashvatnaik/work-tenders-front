
import jwt from "jsonwebtoken";
import _ from "lodash";

const initialState = {
    user: localStorage.getItem('auth_user') ? jwt.decode(localStorage.getItem('auth_user')) : null,
    socket: null,
    allUserTypes: []
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const GET_USER_TYPES = 'GET_USER_TYPES';
export const EDIT_USER = 'EDIT_USER';

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            state.selectedType = action.payload;
            return _.cloneDeep(state);
        case LOGIN:
            state.user = action.payload.user;
            state.token = action.payload.token;
            return _.cloneDeep(state);
        case EDIT_USER:
            state.user = {...state.user, ...action.payload};
            return _.cloneDeep(state);
        case GET_USER_TYPES:
            state.allUserTypes = action.payload;
            return _.cloneDeep(state);
        case LOGOUT:
            state.user = null;
            return _.cloneDeep(state);
        default:
            return state;
    }
}