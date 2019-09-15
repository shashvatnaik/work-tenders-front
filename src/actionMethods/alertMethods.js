import {REMOVE_MESSAGE, SHOW_MESSAGE} from '../reducers/alert';

export const showAlertMethod = (payload) => dispatch => {
    dispatch({type: SHOW_MESSAGE, payload});
}

export const removeAlertMethod = () => dispatch => {
    dispatch({type: REMOVE_MESSAGE});
}