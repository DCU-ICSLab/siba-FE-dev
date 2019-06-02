import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

/*--------action type--------*/
const DEV_SELECT = 'device/DEV_SELECT';
const DEV_BOX_FOCUS = 'device/DEV_BOX_FOCUS';
const DEV_BOX_UNSELECT = 'device/DEV_BOX_UNSELECT';
const DEV_DRAG_START = 'device/DEV_DRAG_START';
const DEV_DRAG_STATE_CHANGE = 'device/DEV_DRAG_STATE_CHANGE';
const DEV_ADD_TEXTBOX = 'device/DEV_ADD_TEXTBOX';
const DEV_DELETE_TEXTBOX = 'device/DEV_DELETE_TEXTBOX';
const DEV_POSITION_CHANGE = 'device/DEV_POSITION_CHANGE';
const DEV_TEXTBOX_LOC_CHANGE = "device/DEV_TEXTBOX_LOC_CHANGE"
const DEV_BLOCK_ID_CNT = 'device/DEV_BLOCK_ID_CNT';
const DEV_CODE_ID_CNT = 'device.DEV_CODE_ID_CNT';
const DEV_TYPE_SELECT = 'device/DEV_TYPE_SELECT';
const DEV_ADD_BTN = 'device/DEV_ADD_BTN';
const DEV_ADD_BTN_SIDE = 'device/DEV_ADD_BTN_SIDE';
const DEV_CP_BTN = 'device/DEV_CP_BTN';
const DEV_INPUT_CHANGE = 'device/DEV_INPUT_CHANGE';
const DEV_INPUT_TARGET_CHANGE = 'device/DEV_INPUT_TARGET_CHANGE';
const DEV_BTN_INFO_CHANGE = 'device/DEV_BTN_INFO_CHANGE';
const DEV_BTN_INFO_TARGET_CHANGE = 'device/DEV_BTN_INFO_TARGET_CHANGE';
const DEV_TEXTBOX_HEIGHT_CHANGE = 'device/DEV_TEXTBOX_HEIGHT_CHANGE';
const DEV_TARGET_TEXTBOX_HEIGHT_CHANGE = 'device/DEV_TARGET_TEXTBOX_HEIGHT_CHANGE';
const DEV_BOX_SELECT = 'device/DEV_BOX_SELECT';
const DEV_ADD_LINKER = 'device/DEV_ADD_LINKER';
const DEV_SELECT_LINKER = 'device/DEV_SELECT_LINKER';
const DEV_SELECT_LINKER_CLEAR = 'device/DEV_SELECT_LINKER_CLEAR';
const DEV_SELECT_LINKER_CHANGE = 'device/DEV_SELECT_LINKER_CHANGE';
const DEV_SELECT_LINKER_VISIBLE = 'device/DEV_SELECT_LINKER_VISIBLE'
const DEV_SELECT_LINKER_TARGET = 'device/DEV_SELECT_LINKER_TARGET'
const DEV_SELECT_LINKER_TARGET_CLEAR = 'device/DEV_SELECT_LINKER_TARGET_CLEAR';
const DEV_LINKER_DOCKING_SRC = 'device/DEV_LINKER_DOCKING_SRC';
const DEV_LINKER_DOCKING_DEST = 'device/DEV_LINKER_DOCKING_DEST';

/*--------create action--------*/
export const devSelect = createAction(DEV_SELECT);
export const devDragStart = createAction(DEV_DRAG_START);
export const devDragStateChange = createAction(DEV_DRAG_STATE_CHANGE);
export const devBoxFocus = createAction(DEV_BOX_FOCUS);
export const devBoxUnSelect = createAction(DEV_BOX_UNSELECT);
export const devAddTextBox = createAction(DEV_ADD_TEXTBOX);
export const devDeleteTextBox = createAction(DEV_DELETE_TEXTBOX);
export const devPositionChange = createAction(DEV_POSITION_CHANGE);
export const devTextboxLocChange = createAction(DEV_TEXTBOX_LOC_CHANGE);
export const devBlockIdCnt = createAction(DEV_BLOCK_ID_CNT);
export const devCodeIdCnt = createAction(DEV_CODE_ID_CNT);
export const devTypeSelect = createAction(DEV_TYPE_SELECT);
export const devAddBtn = createAction(DEV_ADD_BTN);
export const devAddBtnSide = createAction(DEV_ADD_BTN_SIDE);
export const devCopyBtn = createAction(DEV_CP_BTN);
export const devInputChange = createAction(DEV_INPUT_CHANGE);
export const devInputTargetChange = createAction(DEV_INPUT_TARGET_CHANGE);
export const devBtnInfoChange = createAction(DEV_BTN_INFO_CHANGE);
export const devBtnInfoTargetChange = createAction(DEV_BTN_INFO_TARGET_CHANGE);
export const devTextBoxHeightChange = createAction(DEV_TEXTBOX_HEIGHT_CHANGE);
export const devTargetTextboxHeightChange = createAction(DEV_TARGET_TEXTBOX_HEIGHT_CHANGE);
export const devBoxSelect = createAction(DEV_BOX_SELECT);
export const devAddLinker = createAction(DEV_ADD_LINKER);
export const devSelectLinker = createAction(DEV_SELECT_LINKER);
export const devSelectLinkerTarget = createAction(DEV_SELECT_LINKER_TARGET);
export const devSelectLinkerTargetClear = createAction(DEV_SELECT_LINKER_TARGET_CLEAR);
export const devSelectLinkerClear = createAction(DEV_SELECT_LINKER_CLEAR);
export const devSelectLinkerChange = createAction(DEV_SELECT_LINKER_CHANGE);
export const devSelectLinkerVisible = createAction(DEV_SELECT_LINKER_VISIBLE);
export const devLinkerDockingSrc = createAction(DEV_LINKER_DOCKING_SRC);
export const devLinkerDockingDest = createAction(DEV_LINKER_DOCKING_DEST);

/*--------state definition--------*/
const initialState = Map({
    selectedDevice: Map({
        devAuthKey: null,
        devName: null,

        //텍스트 블록을 담기 위한 배열
        pallet: List([]),
        linkers: List([]),

        //블록 아이디를 발급해주기 위함
        blockIdCounter: 0,

        //코드를 발급해주기 위함
        codeIdCounter: 0,
    }),

    linkerVisible: false,

    selectedLinker: null,
    selectedLinkerTarget: null,

    //포커싱 되어진 박스
    selectedBox: null,

    //선택되어진 박스
    targetedBox: null,

    //pallet div 내에서 scroll한 x,y 포지션 구하기 위함
    scrollPos: Map({
        top: 0,
        left: 0
    }),

    //svg 내부에서 드래그 시작 및 종료시에 사용
    isDragging: false,

    //사이드바에서 최초 드래그 시 타입 식별을 위해 사용
    dragType: 1,

    hubInfo: List()
});

/*--------reducer--------*/
export default handleActions({
    [DEV_SELECT]: (state, action) => {
        return state.set('selectedDevice', Map(action.payload));
    },

    [DEV_BOX_FOCUS]: (state, action) => {
        if(action.payload.create){
            return state.merge({
                selectedBox: Map({
                    index: action.payload.index,
                    x: action.payload.x,
                    y: action.payload.y,
                    block: Map(state.getIn(['selectedDevice', 'pallet', action.payload.index]))
                }),
                targetedBox: Map({
                    index: action.payload.index,
                    x: action.payload.x,
                    y: action.payload.y,
                    block: state.getIn(['selectedDevice', 'pallet', action.payload.index])
                })
            })
        }
        else{
            return state.set('selectedBox', Map({
                index: action.payload.index,
                x: action.payload.x,
                y: action.payload.y,
                block: Map(state.getIn(['selectedDevice', 'pallet', action.payload.index]))
            }));
        }
    },

    [DEV_BOX_SELECT]: (state, action) => {
        return state.set('targetedBox', action.payload ? Map(action.payload) : null);
    },

    [DEV_TYPE_SELECT]: (state, action) => {
        return state.set('dragType', action.payload.type);
    },

    [DEV_BOX_UNSELECT]: (state, action) => {
        return state.set('selectedBox', null);
    },

    [DEV_DRAG_START]: (state, action) => {
        return state.mergeIn(['selectedBox'], {x: action.payload.x, y: action.payload.y});
    },

    [DEV_DRAG_STATE_CHANGE]: (state, action) => {
        return state.set('isDragging', action.payload.state);
    },

    [DEV_POSITION_CHANGE]: (state, action) => {
        return state.set('scrollPos', Map(action.payload));
    },

    [DEV_ADD_TEXTBOX]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet =>
            pallet.push(
                Map({
                    pos: Map({
                        top: action.payload.top,
                        left: action.payload.left,
                    }),
                    type: action.payload.type, //1이면 button, 2이면 dynamic, 3이면 time
                    preorder: action.payload.preorder,
                    postorder: action.payload.postorder,
                    linkedId: null,
                    height: 20,
                    parentBox: List([]),
                    id: action.payload.id,
                    linked: false, //다른 텍스트 박스로 부터 링크되어 지는지
                    linking: false, // 다른 텍스트를 링크 하는지
                    info: Map(action.payload.info) //텍스트 박스의 세부 정보
                })
            )
        )
    },

    [DEV_DELETE_TEXTBOX]: (state, action) => {
        return state.deleteIn(['selectedDevice', 'pallet', 
            state.getIn(['selectedDevice', 'pallet']).findIndex(box => box.get('id') === action.payload.id)
        ])
    },

    [DEV_ADD_BTN]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet', action.payload.index, 'info', 'buttons'], buttons =>
            buttons.push(
                Map({
                    code: action.payload.code,
                    name: '',
                    linker: null
                })
            )
        )
    },

    [DEV_ADD_BTN_SIDE]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet', 
        state.getIn(['selectedDevice', 'pallet']).findIndex(box => box.get('id') === action.payload.id), 'info', 'buttons'], 
        buttons =>
            buttons.push(
                Map({
                    code: action.payload.code,
                    name: '',
                    linker: null
                })
            )
        )
    },

    [DEV_CP_BTN]: (state, action) => {
        return state.updateIn(['targetedBox', 'block', 'info','buttons'], buttons =>
            buttons.push(
                Map({
                    code: action.payload.code,
                    name: '',
                    linker: null
                })
            )
        )
    },

    //사본
    [DEV_INPUT_CHANGE]: (state, action) => {
        return state.setIn(['targetedBox', 'block', action.payload.key], action.payload.text)
    },

    //원본
    [DEV_INPUT_TARGET_CHANGE]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet =>
            pallet.setIn([pallet.findIndex(box => box.get('id') === action.payload.id), action.payload.key],action.payload.text)
        )
    },

    //사본
    [DEV_BTN_INFO_CHANGE]: (state, action) => {
        return state.setIn(['targetedBox', 'block', 'info', 'buttons', action.payload.index, action.payload.key], action.payload.text)
    },

    //원본
    [DEV_BTN_INFO_TARGET_CHANGE]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet => 
        pallet.setIn([pallet.findIndex(box => box.get('id') === action.payload.id), 'info', 'buttons', action.payload.index, action.payload.key], action.payload.text)) 
    },

    [DEV_TEXTBOX_LOC_CHANGE]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet', action.payload.index], item =>
            item.set('pos', Map({
                top: action.payload.top,
                left: action.payload.left,
            }))
        )
    },

    [DEV_BLOCK_ID_CNT]: (state, action) => {
        return state.setIn(['selectedDevice','blockIdCounter'], action.payload);
    },

    [DEV_CODE_ID_CNT]: (state, action) => {
        return state.setIn(['selectedDevice','codeIdCounter'], action.payload);
    },

    //원본
    [DEV_TARGET_TEXTBOX_HEIGHT_CHANGE]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet => 
        pallet.setIn([pallet.findIndex(box => box.get('id') === action.payload.id), action.payload.key], action.payload.height))
    },

    //사본
    [DEV_TEXTBOX_HEIGHT_CHANGE]: (state, action) => {
        return state.setIn(['selectedBox', 'block', action.payload.key], action.payload.height)
    },

    [DEV_ADD_LINKER]: (state, action) => {
        return state.updateIn(['selectedDevice', 'linkers'], linkers => 
            linkers.push(
                Map({
                    parentId: action.payload.parentId,
                    code: action.payload.code,
                    childId: action.payload.childId,
                    m: Map(action.payload.m),
                    z: Map(action.payload.z),
                    l: List([])
                })
            )
        );
    },

    [DEV_LINKER_DOCKING_DEST]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet => 
            pallet.updateIn([pallet.findIndex(box => box.get('id') === action.payload.id), 'parentBox'], parentBox => 
                parentBox.push(Map({
                    parentId: action.payload.parentId,
                    code: action.payload.code
                })
            ))
        );
    },

    [DEV_LINKER_DOCKING_SRC]: (state, action) => {
        return state.updateIn(['selectedDevice', 'pallet'], pallet => 
            pallet.updateIn([pallet.findIndex(box => box.get('id') === action.payload.id), 'info', 'buttons'], buttons=>
            buttons.setIn([buttons.findIndex(button => button.get('code') === action.payload.code), 'linker'], Map({
                childId: action.payload.childId,
                code: action.payload.code,
            })
            ))
        );
    },

    [DEV_SELECT_LINKER]: (state, action) => {
        return state.set('selectedLinker',Map({
            m: Map({
                x: action.payload.m.x,
                y: action.payload.m.y
            }),
            z: Map({
                x: action.payload.m.x,
                y: action.payload.m.y
            }),
            parentId: action.payload.parentId,
            code: action.payload.code,
            childId: null,
        }))
    },

    [DEV_SELECT_LINKER_CHANGE]: (state, action) => {
        return state.setIn(['selectedLinker','z'],Map({
            x: action.payload.x,
            y: action.payload.y
        }))
    },

    [DEV_SELECT_LINKER_CLEAR]: (state, action) => {
        return state.set('selectedLinker',null);
    },

    [DEV_SELECT_LINKER_VISIBLE]: (state, action) => {
        return state.set('linkerVisible',action.payload);
    },

    [DEV_SELECT_LINKER_TARGET]: (state, action) => {
        return state.set('selectedLinkerTarget',Map(action.payload));
    },

    [DEV_SELECT_LINKER_TARGET_CLEAR]: (state, action) => {
        return state.set('selectedLinkerTarget',null);
    },

}, initialState);