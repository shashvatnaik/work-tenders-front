import _ from 'lodash';

const initialState = [];

export const GET_TENDERS = "GET_TENDERS";

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TENDERS:
            state = action.payload;
            return _.cloneDeep(state);
        default:
            return state;
    }
}