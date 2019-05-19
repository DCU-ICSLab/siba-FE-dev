import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

/*--------action type--------*/
const SB_TOGGLE = 'basic/SB_TOGGLE';
const PHONE_ADD_ON_TOGGLE = 'basic/PHONE_ADD_ON_TOGGLE';
const PHONE_ADD_ON_TAB_TOGGLE = 'basic/PHONE_ADD_ON_TAB_TOGGLE';
const SB_TALK = 'basic/SB_TALK';
const SB_CALL = 'basic/SB_CALL';

/*--------create action--------*/
export const sbToggle = createAction(SB_TOGGLE);
export const phoneAddOnToggle = createAction(PHONE_ADD_ON_TOGGLE);
export const phoneAddOnTabToggle = createAction(PHONE_ADD_ON_TAB_TOGGLE);
export const sbTalk = createAction(SB_TALK);
export const sbCall = createAction(SB_CALL);

/*--------state definition--------*/
const initialState = Map({
    frameState: Map({
        sb: true,
        sbTalk: false,
        sbCall: false,
        phoneAddOn: true,
        phoneAddOnTab: true,
    }),
    
});

/*--------reducer--------*/
export default handleActions({
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

}, initialState);