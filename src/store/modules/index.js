import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { connectRouter } from 'connected-react-router'

import basic from './basic';

export default (history) => combineReducers({
    router: connectRouter(history),
    basic,
    pender: penderReducer, //pender 리듀서 추가
});