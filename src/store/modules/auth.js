//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'store/api/auth';

/*--------action type--------*/
const KAKAO_AUTH = 'auth/KAKAO_AUTH'; // kakao 로그인
const CREATE_DEVICE = 'auth/CREATE_DEVICE'; // kakao 로그인
const SET_TOKEN = 'auth/SET_TOKEN'; // kakao 로그인
const UPDATE_HUB_STATUS = 'auth/UPDATE_HUB_STATUS'
const VHUB_CREATE = 'auth/VHUB_CREATE'; // kakao 로그인

/*--------create action--------*/
export const kakaoAuth = createAction(KAKAO_AUTH, AuthAPI.getUserInfo);
export const createDevice = createAction(CREATE_DEVICE, AuthAPI.createDevice);
export const setToken = createAction(SET_TOKEN);
export const updateHubStatus = createAction(UPDATE_HUB_STATUS);
export const vhubCreate = createAction(VHUB_CREATE, AuthAPI.vhubCreate);


/*--------state definition--------*/
const initialState = Map({

    userInfo: Map({
        token: null
    }),

    userState: Map({
        isAuthenticated: false,
        user: null,
        hubInfo: List([]),
        deviceInfo: List([])
    }),
    
});

/*--------reducer--------*/
export default handleActions({

    [SET_TOKEN]: (state, action) => {
        return state.setIn(['userInfo', 'token'], action.payload);
    },

    [UPDATE_HUB_STATUS]: (state, action) => {
        const id = state.getIn(['userState', 'hubInfo']).findIndex(hub => hub.get('vhubId') === action.payload.id)
        return state.setIn(['userState','hubInfo', id, 'hubStatus'], action.payload.value);
    },

    ...pender({
        type: KAKAO_AUTH,
        onSuccess: (state, action) => {
            return state.set('userState', Map(
                {
                    isAuthenticated: true,
                    user: Map(action.payload.data.data.user),
                    deviceInfo: List(action.payload.data.data.deviceList.map(device=>Map(device))),
                    hubInfo: List(action.payload.data.data.hubInfo.map(hub=>Map({
                        vhubId: hub.vhubId,
                        hubName: hub.hubName,
                        hubStatus: hub.hubStatus,
                        hubKey: hub.hubKey,
                        devices: List(hub.devices.map(device => Map(device))),
                    }))),
                }
            ));
        },
    }),

    ...pender({
        type: CREATE_DEVICE,
        onSuccess: (state, action) => {
            //const idx = state.getIn(['userState', 'hubInfo']).findIndex(hub => hub.get('vhubId') === action.payload.data.data.vHubId)

            // return state.updateIn(['userState', 'hubInfo', idx, 'devices'], devices => 
            //     devices.push(Map(action.payload.data.data)));
            
            return state.updateIn(['userState', 'deviceInfo'], devices => 
                devices.push(Map(action.payload.data.data)));
        },
    }),

    ...pender({
        type: VHUB_CREATE,
        onSuccess: (state, action) => {
            return state.updateIn(['userState', 'hubInfo'], hubs => 
                hubs.push(Map(action.payload.data.data)));
        },
    }),

}, initialState);