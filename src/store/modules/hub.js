import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as HubAPI from 'store/api/hub';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SAVE_RESOURCE_CPU_LOAD = 'hub/SAVE_RESOURCE_CPU_LOAD';
const PAGE_SWITCHING = 'hub/PAGE_SWITCHING';
const GET_HUB_INFO = 'hub/GET_HUB_INFO';

/*--------create action--------*/
export const saveResourceCPULoad = createAction(SAVE_RESOURCE_CPU_LOAD);
export const pageSwitching = createAction(PAGE_SWITCHING);
export const getHubInfo = createAction(GET_HUB_INFO, HubAPI.getHubInfo);


/*--------state definition--------*/
const initialState = Map({
    resources: Map({
        cpuLoad: List([]),

    }),

    hub: Map({
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

    ...pender({
        type: GET_HUB_INFO,
        onSuccess: (state, action) => {
            return state.set('hub', Map(
                {
                    logInfo: List(action.payload.data.logInfo.map(log=>{
                        return Map(log)
                    }))
                }
            ));
        },
    }),

}, initialState);