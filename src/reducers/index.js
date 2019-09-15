import 'bootstrap/dist/css/bootstrap.min.css';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import loading from './loading';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    loading
});