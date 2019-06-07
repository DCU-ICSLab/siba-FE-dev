//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthApi from 'store/api/auth';

/*--------action type--------*/
const KAKAO_AUTH = 'auth/KAKAO_AUTH'; // kakao 로그인

/*--------create action--------*/
export const kakaoAuth = createAction(KAKAO_AUTH, AuthApi.getUserInfo);

/*--------state definition--------*/
const initialState = Map({
    userState: Map({
        isAuthenticated: false,
        user: null,
        token: ''
    }),
    
});

/*--------reducer--------*/
export default handleActions({

    ...pender({
        type: KAKAO_AUTH,
        onSuccess: (state, action) => {
            return state.set('userState', Map(
                {
                    isAuthenticated: true,
                    user: action.payload.data.data.user,
                    token: ''
                }
            ));
        },
    }),

}, initialState);