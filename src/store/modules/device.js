import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

/*--------action type--------*/
const DEV_SELECT = 'device/DEV_SELECT';
const DEV_BOX_SELECT = 'device/DEV_BOX_SELECT';
const DEV_BOX_UNSELECT = 'device/DEV_BOX_UNSELECT';
const DEV_DRAG_START = 'device/DEV_DRAG_START';
const DEV_DRAG_OVER = 'device/DEV_DRAG_OVER';
const DEV_ADD_TEXTBOX = 'device/DEV_ADD_TEXTBOX';
const DEV_POSITION_CHANGE = 'device/DEV_POSITION_CHANGE';
const DEV_TEXTBOX_LOC_CHANGE = "device/DEV_TEXTBOX_LOC_CHANGE"
const DEV_BLOCK_ID_CNT = 'device/DEV_BLOCK_ID_CNT';
const DEV_TYPE_SELECT= 'device/DEV_TYPE_SELECT';

/*--------create action--------*/
export const devSelect = createAction(DEV_SELECT);
export const devDragStart = createAction(DEV_DRAG_START);
export const devDragOver = createAction(DEV_DRAG_OVER);
export const devBoxSelect = createAction(DEV_BOX_SELECT);
export const devBoxUnSelect = createAction(DEV_BOX_UNSELECT);
export const devAddTextBox = createAction(DEV_ADD_TEXTBOX);
export const devPositionChange = createAction(DEV_POSITION_CHANGE);
export const devTextboxLocChange = createAction(DEV_TEXTBOX_LOC_CHANGE);
export const devBlockIdCnt = createAction(DEV_BLOCK_ID_CNT);
export const devTypeSelect = createAction(DEV_TYPE_SELECT);

/*--------state definition--------*/
const initialState = Map({
    selectedDevice: Map({
        devAuthKey: null,
        devName: null,

        //텍스트 블록을 담기 위한 배열
        pallet: List([]),
    }),

    //드래그시 사용하는 original x,y 박스
    tempBox: null,

    selectedBox: null,

    //pallet div 내에서 scroll한 x,y 포지션 구하기 위함
    scrollPos: Map({
        top: 0,
        left: 0
    }),

    dragType: 1,

    //블록 아이디를 발급해주기 위함
    blockIdCounter: 0,

    hubInfo: List()
});

/*--------reducer--------*/
export default handleActions({
    [DEV_SELECT]: (state, action) => {
        return state.set('selectedDevice', Map(action.payload));
    },

    [DEV_BOX_SELECT]: (state, action) => {
        return state.set('selectedBox', Map({
            index: action.payload.index,
            block: Map(state.getIn(['selectedDevice','pallet', action.payload.index]))
        }));
    },

    [DEV_TYPE_SELECT]: (state, action) => {
        return state.set('dragType', action.payload.type);
    },

    [DEV_BOX_UNSELECT]: (state, action) => {
        return state.set('selectedBox', null);
    },

    [DEV_DRAG_START]: (state, action) => {
        return state.set('tempBox', action.payload ? Map(action.payload) : null);
    },

    [DEV_DRAG_OVER]: (state, action) => {
        return state.updateIn(['selectedDevice','pallet'], pallet =>
            pallet.setIn([action.payload.index, 'pos', 'isDragging'], false)
        )
    },

    [DEV_POSITION_CHANGE]: (state, action) => {
        return state.set('scrollPos', Map(action.payload));
    },

    [DEV_ADD_TEXTBOX]: (state, action) => {
        return state.updateIn(['selectedDevice','pallet'], pallet =>
            pallet.push(
                Map({
                    pos: Map({
                        top: action.payload.top,
                        left: action.payload.left,
                        isDragging: false
                    }),
                    type: action.payload.type, //1이면 button, 2이면 dynamic, 3이면 time
                    preorder: null,
                    postorder: null,
                    linkedId: null,
                    linkingId: null,
                    id: action.payload.id,
                    linked: false, //다른 텍스트 박스로 부터 링크되어 지는지
                    linking: false, // 다른 텍스트를 링크 하는지
                    info: Map(action.payload.info) //텍스트 박스의 세부 정보
                })
            )
        )
    },

    [DEV_TEXTBOX_LOC_CHANGE]: (state, action) => {
        return state.updateIn(['selectedDevice','pallet'], pallet =>
            pallet.setIn([action.payload.index, 'pos'], Map({
                top: action.payload.top,
                left: action.payload.left,
                isDragging: true
            }))
        )
    },

    [DEV_BLOCK_ID_CNT]: (state, action) => {
        return state.set('blockIdCounter', action.payload);
    },

}, initialState);