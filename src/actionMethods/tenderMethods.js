import baseService from '../services/baseService';
import { SHOW_MESSAGE } from '../reducers/alert';
import { DISABLE_LOADING, ENABLE_LOADING } from '../reducers/loading';
import { GET_TENDERS } from '../reducers/tenders';

export const addTenderMethod = (payload, cb) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.post('/tender', payload).then(() => {
        dispatch({ type: DISABLE_LOADING });
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

export const getAllTenders = () => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.get('/tender').then(response => {
        dispatch({ type: DISABLE_LOADING });
        dispatch({ type: GET_TENDERS, payload: response.data.data });
    }).catch(error => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'Registration Error', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    });
}