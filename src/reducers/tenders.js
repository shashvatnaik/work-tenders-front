import _ from 'lodash';

const initialState = [];

export const GET_TENDERS = "GET_TENDERS";
export const EDIT_TENDER = "EDIT_TENDER";
export const DELETE_TENDER = "DELETE_TENDER";
export const GET_ONE_TENDER = "GET_ONE_TENDER";

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TENDERS:
            state = action.payload;
            return _.cloneDeep(state);
        case EDIT_TENDER:
            const editIndex = _.findIndex(state, tender => tender._id === action.payload._id);
            state[editIndex] = { ...state[editIndex], ...action.payload };
            return _.cloneDeep(state);
        case DELETE_TENDER:
            delete state[action.payload.tenderId];
            return _.cloneDeep(state);
        case GET_ONE_TENDER:
            if (!state.find(tender => tender._id === action.payload._id)) {
                state.push(action.payload);
            }
            return _.cloneDeep(state);
        default:
            return state;
    }
}