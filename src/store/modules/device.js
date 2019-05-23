import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

/*--------action type--------*/
const DEV_SELECT = 'device/DEV_SELECT';
const DEV_ADD_TEXTBOX = 'device/DEV_ADD_TEXTBOX';

/*--------create action--------*/
export const devSelect = createAction(DEV_SELECT);
export const devAddTextBox = createAction(DEV_ADD_TEXTBOX);

/*--------state definition--------*/
const initialState = Map({
    selectedDevice: Map({
        devAuthKey: null,
        devName: null,
    }),

    pallet: List([]),

    hubInfo: List()
});

/*--------reducer--------*/
export default handleActions({
    [DEV_SELECT]: (state, action) => {
        return state.set('selectedDevice', Map(action.payload));
    },

    [DEV_ADD_TEXTBOX]: (state, action) => {
        return state.update('pallet', pallet =>
            pallet.push(
                Map({
                    top: action.payload.top,
                    left: action.payload.left,
                    linked: false, //다른 텍스트 박스로 부터 링크되어 지는지
                    linking: false, // 다른 텍스트를 링크 하는지
                    info: Map(action.payload.info) //텍스트 박스의 세부 정보
                })
            )
        )
    },


}, initialState);