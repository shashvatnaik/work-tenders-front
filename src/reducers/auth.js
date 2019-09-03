
import jwt from "jsonwebtoken";

const initialState = {
    user: localStorage.getItem('auth_user') ? jwt.decode(localStorage.getItem('auth_user')) : null,
    socket: null
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export default (state = initialState, action) => {
    switch(action) {
        default:
            return initialState;
    }
}