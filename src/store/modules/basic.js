import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as DeviceAPI from 'store/api/device';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SB_TOGGLE = 'basic/SB_TOGGLE';
const PHONE_ADD_ON_TOGGLE = 'basic/PHONE_ADD_ON_TOGGLE';
const PHONE_ADD_ON_TAB_TOGGLE = 'basic/PHONE_ADD_ON_TAB_TOGGLE';
const SB_TALK = 'basic/SB_TALK';
const SB_CALL = 'basic/SB_CALL';
const DEVICE_ADD_BOX_CHANGE = 'basic/DEVICE_ADD_BOX_CHANGE';
const DEVICE_WORK_BOX_CHANGE = 'basic/DEVICE_WORK_BOX_CHANGE';
const CHANGE_CODE_MODAL = 'basic/CHANGE_CODE_MODAL';
const CHANGE_COPY = 'basic/CHANGE_COPY';
const CHANGE_DEIVCE_ADD_MODAL = 'basic/CHANGE_DEIVCE_ADD_MODAL';
const DEVICE_REG_VALUE_CHANGE = 'basic/DEVICE_REG_VALUE_CHANGE';
const DEVICE_REG_INPUT_CLEAR = 'basic/DEVICE_REG_INPUT_CLEAR'
const GET_DEVICE_AUTH_KEY = 'basic/GET_DEVICE_AUTH_KEY'
//const GET_VIRTUAL_HUB = 'basic/GET_VIRTUAL_HUB'
const CHANGE_HUB_ADD_MODAL = 'basic/CHANGE_HUB_ADD_MODAL'
const HUB_REG_VALUE_CHANGE = 'basic/HUB_REG_VALUE_CHANGE'
const HUB_REG_INPUT_CLEAR = 'basic/HUB_REG_INPUT_CLEAR'
const GET_HUB_AUTH_KEY = 'basic/GET_HUB_AUTH_KEY'
const DEVICE_LIST_MODAL_CHANGE = 'basic/DEVICE_LIST_MODAL_CHANGE'
const CHANGE_COPY_STATE = 'basic/CHANGE_COPY_STATE'

/*--------create action--------*/
export const sbToggle = createAction(SB_TOGGLE);
export const phoneAddOnToggle = createAction(PHONE_ADD_ON_TOGGLE);
export const phoneAddOnTabToggle = createAction(PHONE_ADD_ON_TAB_TOGGLE);
export const sbTalk = createAction(SB_TALK);
export const sbCall = createAction(SB_CALL);
export const deviceAddBoxChange = createAction(DEVICE_ADD_BOX_CHANGE);
export const deviceWorkBoxChange = createAction(DEVICE_WORK_BOX_CHANGE);
export const changeCodeModal = createAction(CHANGE_CODE_MODAL);
export const changeDeviceAddModal = createAction(CHANGE_DEIVCE_ADD_MODAL);
export const changeHubAddModal = createAction(CHANGE_HUB_ADD_MODAL);
export const changeCopy = createAction(CHANGE_COPY);
export const deviceRegValueChange = createAction(DEVICE_REG_VALUE_CHANGE);
export const deviceRegInputClear = createAction(DEVICE_REG_INPUT_CLEAR);
export const getDeviceAuthKey = createAction(GET_DEVICE_AUTH_KEY, DeviceAPI.getDeviceAuthKey);
export const hubRegValueChange = createAction(HUB_REG_VALUE_CHANGE);
export const hubRegInputClear = createAction(HUB_REG_INPUT_CLEAR);
export const deviceListModalChange = createAction(DEVICE_LIST_MODAL_CHANGE);
export const changeCopyState = createAction(CHANGE_COPY_STATE);
export const getHubAuthKey = createAction(GET_HUB_AUTH_KEY, DeviceAPI.getDeviceAuthKey);
//export const getVirtualHub = createAction(GET_VIRTUAL_HUB);

/*--------state definition--------*/
const initialState = Map({
    frameState: Map({
        sb: true,
        sbTalk: false,
        sbCall: false,
        phoneAddOn: true,
        phoneAddOnTab: true,
        deviceAddBox: false,
        deviceWorkBox: false,
        codeModal: false,
        deviceModal: false,
        deviceListModal: false,
        hubModal: false,
        copy: false,
    }),

    regInput: Map({
        devName: '',
        authKey: '',
        //vHubId: null,
        devType: '3',
        devDefName: '',
        category: null
    }),

    hubInput: Map({

    }),

    keyCopy: false
});

/*--------reducer--------*/
export default handleActions({

    [CHANGE_COPY_STATE]: (state, action) => {
        return state.set('keyCopy', action.payload);
    },
    
    [DEVICE_LIST_MODAL_CHANGE]: (state, action) => {
        return state.setIn(['frameState', 'deviceListModal'], !action.payload);
    },

    [SB_TOGGLE]: (state, action) => {
        return state.setIn(['frameState', 'sb'], !action.payload);
    },

    [SB_TALK]: (state, action) => {
        return state.setIn(['frameState', 'sbTalk'], !action.payload);
    },

    [SB_CALL]: (state, action) => {
        return state.setIn(['frameState', 'sbCall'], action.payload);
    },

    [PHONE_ADD_ON_TOGGLE]: (state, action) => {
        return state.setIn(['frameState', 'phoneAddOn'], action.payload);
    },

    [PHONE_ADD_ON_TAB_TOGGLE]: (state, action) => {
        return state.setIn(['frameState', 'phoneAddOnTab'], action.payload);
    },

    [DEVICE_ADD_BOX_CHANGE]: (state, action) => {
        return state.setIn(['frameState', 'deviceAddBox'], action.payload);
    },

    [DEVICE_WORK_BOX_CHANGE]: (state, action) => {
        return state.setIn(['frameState', 'deviceWorkBox'], action.payload);
    },

    [CHANGE_CODE_MODAL]: (state, action) => {
        return state.setIn(['frameState', 'codeModal'], action.payload);
    },

    [CHANGE_COPY]: (state, action) => {
        return state.setIn(['frameState', 'copy'], action.payload);
    },

    [CHANGE_DEIVCE_ADD_MODAL]: (state, action) => {
        return state.setIn(['frameState', 'deviceModal'], action.payload);
    },

    [CHANGE_HUB_ADD_MODAL]: (state, action) => {
        return state.setIn(['frameState', 'hubModal'], action.payload);
    },

    [DEVICE_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('regInput', Map({
            devName: '',
            authKey: '',
            //vHubId: null,
            devType: '3',
            devDefName: '',
            category: null
        }));
    },

    [DEVICE_REG_VALUE_CHANGE]: (state, action) => {
        return state.setIn(['regInput', action.payload.key], action.payload.value);
    },

    [HUB_REG_VALUE_CHANGE]: (state, action) => {
        return state.setIn(['hubInput', action.payload.key], action.payload.value);
    },

    [HUB_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('hubInput', Map({
            hubName: '',
            authKey: '',
            hubType: '1',
        }));
    },

    // [GET_VIRTUAL_HUB]: (state, action) => {
    //     return state.setIn(['regInput', 'vHubId'], action.payload.hubId);
    // },


    ...pender({
        type: GET_DEVICE_AUTH_KEY,
        onSuccess: (state, action) => {
            return state.setIn(['regInput', 'authKey'], action.payload.data.data);
        },
    }),

    ...pender({
        type: GET_HUB_AUTH_KEY,
        onSuccess: (state, action) => {
            return state.setIn(['hubInput', 'authKey'], action.payload.data.data);
        },
    }),
    
}, initialState);