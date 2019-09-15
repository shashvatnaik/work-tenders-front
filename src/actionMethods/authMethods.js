import {SET_USER} from '../reducers/auth';

export const SignupMethod = (payload) => (dispatch) => {

}

export const setUser = (type) => (dispatch) => dispatch({type: SET_USER, payload: type});