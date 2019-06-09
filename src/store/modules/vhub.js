//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as VHubApi from 'store/api/vhub';

/*--------action type--------*/
const VHUB_CREATE = 'vhub/VHUB_CREATE'; // kakao 로그인

/*--------create action--------*/
export const vhubCreate = createAction(VHUB_CREATE, VHubApi.vhubCreate);

/*--------state definition--------*/
const initialState = Map({
    
    vhubCreationInfo: {
        msg: null
    }
});

/*--------reducer--------*/
export default handleActions({

    ...pender({
        type: VHUB_CREATE,
        onSuccess: (state, action) => {
            return state.set('vhubCreationInfo', action.payload.msg);
        },
    }),

}, initialState);