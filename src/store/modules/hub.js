import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
//import * as DeviceAPI from 'store/api/device';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SAVE_RESOURCE_CPU_LOAD = 'hub/SAVE_RESOURCE_CPU_LOAD';

/*--------create action--------*/
export const saveResourceCPULoad = createAction(SAVE_RESOURCE_CPU_LOAD);


/*--------state definition--------*/
const initialState = Map({
    resources: Map({
        cpuLoad: List([]),

    })
});

/*--------reducer--------*/
export default handleActions({
    
    [SAVE_RESOURCE_CPU_LOAD]: (state, action) => {
        return state.updateIn(['resources', 'cpuLoad'], cpuLoad=>cpuLoad.push(action.payload));
    },

    
}, initialState);