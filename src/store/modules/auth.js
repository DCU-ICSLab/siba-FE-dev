//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'store/api/auth';

/*--------action type--------*/
const KAKAO_AUTH = 'auth/KAKAO_AUTH'; // kakao 로그인

/*--------create action--------*/
export const kakaoAuth = createAction(KAKAO_AUTH, AuthAPI.getUserInfo);

/*--------state definition--------*/
const initialState = Map({
    userState: Map({
        isAuthenticated: false,
        user: null,
        hubInfo: List([])
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
                    user: Map(action.payload.data.data.user),
                    hubInfo: List(action.payload.data.data.hubInfo.map(hub=>Map({
                        vhubId: hub.vhubId,
                        devices: List(hub.devices.map(device => Map(device))),
                    }))),
                }
            ));
        },
    }),

}, initialState);