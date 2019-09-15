import _ from 'lodash';

export const SHOW_MESSAGE =  'SHOW_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const initialState = {
    message: [],
    header: ""
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_MESSAGE:
            state = action.payload;
            return _.cloneDeep(state);
        case REMOVE_MESSAGE:
            state = initialState;
            return _.cloneDeep(state);
        default:
            return initialState;
    }
}