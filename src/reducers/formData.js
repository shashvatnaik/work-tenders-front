
import _ from 'lodash';

export const GET_CATEGORIES = 'GET_CATEGORIES';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            state.allCategories = action.payload;
            return _.cloneDeep(state);
        default:
            return state;
    }
}