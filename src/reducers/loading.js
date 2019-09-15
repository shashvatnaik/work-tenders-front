export const ENABLE_LOADING = 'ENABLE_LOADING';
export const DISABLE_LOADING = 'DISABLE_LOADING';

const initialState = {value: true};

export default (state = initialState, action) => {
    switch(action.type) {
        case ENABLE_LOADING:
            return {value: true};
        case DISABLE_LOADING:
            return {value: false};
        default:
            return {value: false};
    }
}