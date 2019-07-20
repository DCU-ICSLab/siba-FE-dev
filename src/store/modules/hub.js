import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as HubAPI from 'store/api/hub';
import { pender } from 'redux-pender';
import { deflate } from 'zlib';

/*--------action type--------*/
const SAVE_RESOURCE_CPU_LOAD = 'hub/SAVE_RESOURCE_CPU_LOAD';
const PAGE_SWITCHING = 'hub/PAGE_SWITCHING';
const GET_HUB_INFO = 'hub/GET_HUB_INFO';
const PUSH_HUB_CLOG = 'hub/PUSH_HUB_CLOG'
const MOVE_HUB_INFO = 'hub/MOVE_HUB_INFO'

/*--------create action--------*/
export const saveResourceCPULoad = createAction(SAVE_RESOURCE_CPU_LOAD);
export const pageSwitching = createAction(PAGE_SWITCHING);
export const pushHubClog = createAction(PUSH_HUB_CLOG);
export const moveHubInfo = createAction(MOVE_HUB_INFO);
export const getHubInfo = createAction(GET_HUB_INFO, HubAPI.getHubInfo);


/*--------state definition--------*/
const initialState = Map({
    resources: Map({
        cpuLoad: List([]),

    }),

    hub: Map({
        hubName: '',
        hubStatus: false,
        hubKey:'',
        hubType:'',
        hubPort: null,
        vhubId: null,
        hubIp: null,
        devices:List([]),
        logInfo: List([])
    }),

    page: 1
});

/*--------reducer--------*/
export default handleActions({

    [PAGE_SWITCHING]: (state, action) => {
        return state.set('page', action.payload);
    },
    
    [SAVE_RESOURCE_CPU_LOAD]: (state, action) => {
        return state.updateIn(['resources', 'cpuLoad'], cpuLoad=>cpuLoad.push(action.payload));
    },

    [MOVE_HUB_INFO]: (state, action) => {
        return state.set('hub', Map({
            hubName: action.payload.hubName,
            hubStatus: action.payload.hubStatus,
            hubKey:action.payload.hubKey,
            hubType:action.payload.hubType,
            hubPort: action.payload.hubPort,
            vhubId: action.payload.vhubId,
            hubIp: action.payload.hubIp,
            devices: action.payload.devices,
            logInfo: List([])
        }));
    },

    [PUSH_HUB_CLOG]: (state, action) => {
        return state.updateIn(['hub','logInfo'], logInfo=>logInfo.unshift(Map({
            clog_res: action.payload.clog_res,
            clog_time: Date.now(),
            dev_mac: action.payload.dev_mac,
        })));
    },

    ...pender({
        type: GET_HUB_INFO,
        onSuccess: (state, action) => {
            return state.setIn(['hub','logInfo'], 
            List(action.payload.data.logInfo.map(log=>{
                return Map(log)
            })))
        },
    }),

}, initialState);