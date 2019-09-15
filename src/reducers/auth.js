
import jwt from "jsonwebtoken";
import _ from "lodash";

const initialState = {
    user: localStorage.getItem('auth_user') ? jwt.decode(localStorage.getItem('auth_user')) : null,
    socket: null
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            state.selectedType = action.payload;
            return _.cloneDeep(state);
        default:
            return initialState;
    }
}