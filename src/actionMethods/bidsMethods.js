import { ADD_BID, GET_ALL_BIDS, DELETE_BID } from '../reducers/bids';
import { ENABLE_LOADING, DISABLE_LOADING } from '../reducers/loading';
import baseService from '../services/baseService';
import { SHOW_MESSAGE } from '../reducers/alert';

export const addBid = (bid, cb) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.post('/bids', bid).then((response) => {
        dispatch({ type: DISABLE_LOADING });
        dispatch({ type: ADD_BID, payload: response.data.data });
        cb();
    }).catch(error => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'error in adding bid. please try later', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    })
}

export const getBids = (userType) => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.get(`/bids?userType=${userType}`).then((response) => {
        dispatch({ type: DISABLE_LOADING });
        dispatch({ type: GET_ALL_BIDS, payload: response.data.data });
    }).catch((error) => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'error in getting bids. please try later', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    })
}

export const deleteBid = bidId => dispatch => {
    dispatch({ type: ENABLE_LOADING });
    baseService.delete(`/bids?bidId=${bidId}`).then(() => {
        dispatch({ type: DISABLE_LOADING });
        dispatch({ type: DELETE_BID, payload: bidId });
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'Bid', message: ["Bid Successfully deleted"]
            }
        });
    }).catch((error) => {
        dispatch({ type: DISABLE_LOADING });
        console.log(error);
        dispatch({
            type: SHOW_MESSAGE, payload: {
                header: 'error in getting bids. please try later', message: error.response ?
                    [error.response.data.message] : [error.message]
            }
        });
    })
}