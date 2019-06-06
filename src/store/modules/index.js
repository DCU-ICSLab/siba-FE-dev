import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { connectRouter } from 'connected-react-router'

import basic from './basic';
import device from './device';
import auth from './auth';

export default (history) => combineReducers({
    router: connectRouter(history),
    basic,
    device,
    auth,
    pender: penderReducer, //pender 리듀서 추가
});