import firebase from 'firebase';

import baseService from '../services/baseService';
import { SHOW_MESSAGE } from '../reducers/alert';
import { DISABLE_LOADING, ENABLE_LOADING } from '../reducers/loading';
import { GET_TENDERS, EDIT_TENDER, DELETE_TENDER, GET_ONE_TENDER } from '../reducers/tenders';

export const addTenderMethod = (payload, cb) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.post('/tender', payload).then(() => {
        cb();
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

export const getOneTender = (id, cb) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.get(`/tender/${id}`).then((response) => {
        dispatch({ type: DISABLE_LOADING });
        if (response.data.data._id === id) {
            dispatch({ type: GET_ONE_TENDER, payload: response.data.data });
            if (response.data.data.picture) {
                firebase.storage().ref("TenderImages").child(response.data.data.picture).getDownloadURL().then((url) => {
                    response.data.data.imageUrl = url;
                    cb(response.data.data);
                    dispatch({ type: EDIT_TENDER, payload: response.data.data });
                }).catch(error => {
                    console.log(error);
                });
            }
        }
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

export const deleteTender = (tenderId, cb) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.delete(`/tender?tenderId=${tenderId}`).then(() => {
        dispatch({ type: DISABLE_LOADING });
        cb();
    }).catch((error) => {
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

export const getAllTenders = () => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.get('/tender').then(response => {
        dispatch({ type: DISABLE_LOADING });
        response.data.data.map((tender, index) => {
            dispatch({ type: GET_TENDERS, payload: response.data.data });
            if (tender.picture) {
                firebase.storage().ref("TenderImages").child(tender.picture).getDownloadURL().then((url) => {
                    console.log(url);
                    tender.imageUrl = url;
                    dispatch({ type: EDIT_TENDER, payload: tender });
                    return tender;
                }).catch(error => {
                    console.log(error);
                    return tender;
                });
            }
        });
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