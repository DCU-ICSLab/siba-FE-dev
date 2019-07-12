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
const SELECT_DEV_REPO = 'auth/SELECT_DEV_REPO'; // kakao 로그인
const SELECT_DEV_REPO_CLEAR = 'auth/SELECT_DEV_REPO_CLEAR'; // kakao 로그인
const PUSH_DEV_REPO = 'auth/PUSH_DEV_REPO'; // kakao 로그인
const POP_DEV_REPO = 'auth/POP_DEV_REPO'; // kakao 로그인
const LINK_HUB_AND_REPO = 'auth/LINK_HUB_AND_REPO'; // kakao 로그인
const REPO_DELETION = 'auth/REPO_DELETION';
const REPO_UNLINK = 'auth/REPO_UNLINK';
const REPO_LINK = 'auth/REPO_LINK';

/*--------create action--------*/
export const kakaoAuth = createAction(KAKAO_AUTH, AuthAPI.getUserInfo);
export const createDevice = createAction(CREATE_DEVICE, AuthAPI.createDevice);
export const setToken = createAction(SET_TOKEN);
export const updateHubStatus = createAction(UPDATE_HUB_STATUS);
export const vhubCreate = createAction(VHUB_CRT, AuthAPI.vhubCreate);
export const pushClog = createAction(PUSH_CLOG);
export const fold = createAction(FOLD);
export const selectDevRepo = createAction(SELECT_DEV_REPO);
export const selectDevRepoClear = createAction(SELECT_DEV_REPO_CLEAR);
export const pushDevRepo = createAction(PUSH_DEV_REPO);
export const popDevRepo = createAction(POP_DEV_REPO);
export const linkHubAndRepo = createAction(LINK_HUB_AND_REPO, AuthAPI.linkHubAndRepo);
export const repoDeletion = createAction(REPO_DELETION, AuthAPI.repoDeletion);
export const repoUnlink = createAction(REPO_UNLINK);
export const repoLink = createAction(REPO_LINK);


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

    tempDevRepo: Map({
        hubId: null,
        limitSize: 0,
        list: List([]),
        bucket: List([])
    }),

    msg: Map({
        status: true,
        text: null
    })
    
});

/*--------reducer--------*/
export default handleActions({

    [SELECT_DEV_REPO_CLEAR]: (state, action) => {
        return state.set('tempDevRepo', Map({
            hubId: action.payload.hubId,
            limitSize: action.payload.limitSize,
            list: List(action.payload.list),
            bucket: List([])
        }))
    },

    [SELECT_DEV_REPO]: (state, action) => {
        return state.setIn(['tempDevRepo', 'list', action.payload.devId, 'vhubId'], action.payload.hubId)
    },

    [PUSH_DEV_REPO]: (state, action) => {
        return state.updateIn(['tempDevRepo', 'bucket'], bucket=>bucket.push(action.payload))
    },

    [POP_DEV_REPO]: (state, action) => {
        const index = state.getIn(['tempDevRepo', 'bucket']).findIndex(item => item.get('devId') === action.payload.devId)
        return state.updateIn(['tempDevRepo', 'bucket'], bucket=>bucket.delete(index))
    },

    // [SELECT_DEV_REPO]: (state, action) => {
    //     return state.update('tempDevRepo', list => 
    //             list.push(Map(action.payload.dev)));
    // },

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

    [REPO_LINK]: (state, action) => {
        const idx = state.getIn(['userState', 'deviceInfo']).findIndex(dev => dev.get('devId') === action.payload.devId)
        return state.setIn(['userState','deviceInfo', idx, 'vhubId'], action.payload.hubId);
    },

    [REPO_UNLINK]: (state, action) => {
        const idx = state.getIn(['userState', 'deviceInfo']).findIndex(dev => dev.get('devId') === action.payload.devId)
        return state.setIn(['userState','deviceInfo', idx, 'vhubId'], null);
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

    ...pender({
        type: LINK_HUB_AND_REPO,
        onSuccess: (state, action) => {
            if(action.payload.data.status){
                const hubIndex = state.getIn(['userState', 'hubInfo']).findIndex(item => item.get('vhubId') === action.payload.data.data.hubId)
                const bucket = state.getIn(['tempDevRepo', 'bucket'])
                return state.updateIn(['userState', 'hubInfo', hubIndex, 'devices'], devices=>devices.concat(bucket))
            }
            else{
                return state.set('msg', Map({
                    status: action.payload.data.status,
                    text: action.payload.data.msg
                }))
            }
        },
    }),

    ...pender({
        type: REPO_DELETION,
        onSuccess: (state, action) => {
            if(action.payload.data.status){
                const hubIndex = state.getIn(['userState', 'hubInfo']).findIndex(item => item.get('vhubId') === action.payload.data.data.hubId)
                const devIndex = state.getIn(['userState', 'hubInfo', hubIndex, 'devices']).findIndex(item => item.get('devId') === action.payload.data.data.devId)
                return state.updateIn(['userState', 'hubInfo', hubIndex, 'devices'], devices=>devices.delete(devIndex))
            }
            else{
                return state.set('msg', Map({
                    status: action.payload.data.status,
                    text: action.payload.data.msg
                })) 
            }
        },
    }),

}, initialState);