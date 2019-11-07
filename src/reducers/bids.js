import _ from 'lodash';

export const ADD_BID = 'ADD_BID';
export const GET_ALL_BIDS = 'GET_ALL_BIDS';
export const DELETE_BID ='DELETE_BID';

const initialState = new Array([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BID:
            if (state && state.length) {
                state.push(action.payload);
            } else {
                state = [action.payload];
            }
            return _.cloneDeep(state);
        case GET_ALL_BIDS:
            state = action.payload;
            return _.cloneDeep(state);
        case DELETE_BID:
            const deleteBidId = _.findIndex(state, x => x._id === action.payload);
            state.splice(deleteBidId, 1);
            return _.cloneDeep(state);
        default:
            return state;
    }
}