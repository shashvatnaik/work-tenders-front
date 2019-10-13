import {Service} from '../services/baseService';
import { DISABLE_LOADING, ENABLE_LOADING } from '../reducers/loading';
import {GET_CATEGORIES} from '../reducers/formData';

export const getCategoriesMethod = () => dispatch => {
    dispatch({type: ENABLE_LOADING});
    Service.get('/categories').then(response => {
        dispatch({type: DISABLE_LOADING});
        dispatch({type:GET_CATEGORIES, payload: response.data.data})
    }).catch(error => {
        console.log(error);
        dispatch({type: DISABLE_LOADING});
    });
}