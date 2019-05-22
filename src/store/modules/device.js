import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

/*--------action type--------*/
const DEV_SELECT = 'basic/DEV_SELECT';

/*--------create action--------*/
export const devSelect = createAction(DEV_SELECT);

/*--------state definition--------*/
const initialState = Map({
    selectedDevice: Map({
        devAuthKey: null,
        devName: null,
    }),

    hubInfo: List()
});

/*--------reducer--------*/
export default handleActions({
    [DEV_SELECT]: (state, action) => {
        return state.set('selectedDevice', Map(action.payload));
    },


}, initialState);