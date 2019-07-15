import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { connectRouter } from 'connected-react-router'

import basic from './basic';
import device from './device';
import auth from './auth';
import test from './test';
import hub from './hub';

export default (history) => combineReducers({
    router: connectRouter(history),
    basic,
    device,
    auth,
    test,
    hub,
    pender: penderReducer, //pender 리듀서 추가
});