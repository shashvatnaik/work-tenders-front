import {ENABLE_LOADING, DISABLE_LOADING} from '../reducers/loading'; 

export const enableLoading = () => dispatch => {
    dispatch({type: ENABLE_LOADING});
}

export const disableLoading = () => dispatch => {
    dispatch({type: DISABLE_LOADING});
}