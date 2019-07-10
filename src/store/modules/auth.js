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
const VHUB_CRT = 'auth/VHUB_CRT'; // kakao 로그인
const PUSH_CLOG = 'auth/PUSH_CLOG'; // kakao 로그인
const FOLD = 'auth/FOLD'; // kakao 로그인

/*--------create action--------*/
export const kakaoAuth = createAction(KAKAO_AUTH, AuthAPI.getUserInfo);
export const createDevice = createAction(CREATE_DEVICE, AuthAPI.createDevice);
export const setToken = createAction(SET_TOKEN);
export const updateHubStatus = createAction(UPDATE_HUB_STATUS);
export const vhubCreate = createAction(VHUB_CRT, AuthAPI.vhubCreate);
export const pushClog = createAction(PUSH_CLOG);
export const fold = createAction(FOLD);


/*--------state definition--------*/
const initialState = Map({

    userInfo: Map({
        token: null
    }),

    userState: Map({
        isAuthenticated: false,
        user: null,
        hubInfo: List([]),
        deviceInfo: List([]),
        clogList: List([])
    }),
    
});

/*--------reducer--------*/
export default handleActions({

    [FOLD]: (state, action) => {
        const id = state.getIn(['userState', 'hubInfo']).findIndex(hub => hub.get('vhubId') === action.payload.hubId)
        const foldValue = state.getIn(['userState','hubInfo', id, 'fold']);
        return state.setIn(['userState','hubInfo', id, 'fold'], !foldValue);
    },

    [PUSH_CLOG]: (state, action) => {
        return state.updateIn(['userState', 'clogList'], logs => 
                logs.unshift(Map({
                    hubId: action.payload.hubId,
                    actTime: action.payload.actTime,
                    messageType: action.payload.messageType,
                })));
    },

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
                    clogList: List(action.payload.data.data.clogList.map(log=>Map(log))),
                    hubInfo: List(action.payload.data.data.hubInfo.map(hub=>Map({
                        vhubId: hub.vhubId,
                        hubName: hub.hubName,
                        hubStatus: hub.hubStatus,
                        hubType: hub.hubType,
                        hubKey: hub.hubKey,
                        fold: false,
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
        type: VHUB_CRT,
        onSuccess: (state, action) => {

            const hub = action.payload.data.data

            return state.updateIn(['userState', 'hubInfo'], hubs => 
                hubs.push(Map({
                    devices: List([]),
                    hubKey: hub.hubKey,
                    hubStatus: hub.hubStatus,
                    hubType: hub.hubType,
                    vhubId: hub.vhubId,
                    hubName: hub.hubName,
                    hubPort: hub.hubPort,
                    hubIp: hub.hubIp,
                    fold: false
                })));
        },
    }),

}, initialState);