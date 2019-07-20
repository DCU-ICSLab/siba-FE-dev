//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as TestAPI from 'store/api/test';

/*--------action type--------*/
const CANCEL_TEST = 'test/CANCEL_TEST'; // 테스트 취소
const START_TEST = 'test/START_TEST'; // 테스트 시작
const SEND_COMMAND = 'test/SEND_COMMAND'; // 메시지 전송
const ADD_USER_TEXTBOX = 'test/ADD_USER_TEXTBOX'; // 사용자 명령 박스 추가
const TEXTBOX_ENABLE_CHANGE = 'test/TEXTBOX_ENABLE_CHANGE'
const CHANGE_TIME_SETTER = 'test/CHANGE_TIME_SETTER'
const CHANGE_TIME_FORMAT = 'test/CHANGE_TIME_FORMAT'
const CHANGE_TIME_FORMAT_ALL = 'test/CHANGE_TIME_FORMAT_ALL'
const TESTBOX_INIT = 'test/TESTBOX_INIT'
const SAVE_TEMP_TYPE = 'test/SAVE_TEMP_TYPE'
const SET_TEXTBOX_END = 'test/SET_TEXTBOX_END'
const SEND_BUILDING_JSON = 'test/SEND_BUILDING_JSON'
const SET_DUPLICATE = 'test/SET_DUPLICATE'
const SET_SEND_STATE = 'test/SET_SEND_STATE'

/*--------create action--------*/
export const cancelTest = createAction(CANCEL_TEST, TestAPI.cancelTest);
export const startTest = createAction(START_TEST, TestAPI.startTest);
export const sendCommand = createAction(SEND_COMMAND, TestAPI.startTest);
export const addUserTextbox = createAction(ADD_USER_TEXTBOX)
export const textBoxEnableChange = createAction(TEXTBOX_ENABLE_CHANGE)
export const changeTimeSetter = createAction(CHANGE_TIME_SETTER)
export const changeTimeFormatAll = createAction(CHANGE_TIME_FORMAT_ALL)
export const changeTimeFormat = createAction(CHANGE_TIME_FORMAT)
export const testboxInit = createAction(TESTBOX_INIT)
export const saveTempType = createAction(SAVE_TEMP_TYPE)
export const setTextboxEnd = createAction(SET_TEXTBOX_END)
export const sendBuildingJson = createAction(SEND_BUILDING_JSON, TestAPI.sendBuildingJson)
export const setDuplicate = createAction(SET_DUPLICATE)
export const setSendState = createAction(SET_SEND_STATE)

/*--------state definition--------*/
const initialState = Map({
    testBoxList: List([]),
    userBoxList: List([]),
    cmdList: List([]),
    timeSetter: false,
    timeFormat: Map({
        date: null,
        md: '',
        h: '',
        t: ''
    }),

    isEnd: false,
    isSend: false,

    testResult: Map({
        msg: '',
        status: false
    }),

    isDuplicate: false
});

/*--------reducer--------*/
export default handleActions({

    [SET_SEND_STATE]: (state, action) => {
        return state.set('isSend', action.payload);
    },

    [SET_DUPLICATE]: (state, action) => {
        return state.set('isDuplicate', action.payload);
    },

    [SET_TEXTBOX_END]: (state, action) => {
        return state.set('isEnd', action.payload);
    },

    [SAVE_TEMP_TYPE]: (state, action) => {
        return state.update('cmdList', cmdList =>
            cmdList.push(
                Map({
                    btnType: action.payload.btnType,
                    eventCode: action.payload.eventCode,
                    additional: List([])
                })
            )
        );
    },

    [TESTBOX_INIT]: (state, action) => {
        return state.set('testBoxList', List([])).set('cmdList', List([]))
    },

    [ADD_USER_TEXTBOX]: (state, action) => {
        return state.update('userBoxList', boxes =>
            boxes.push(
                Map({
                    text: action.payload.text,
                    time: new Date()
                })
            )
        );
    },

    [TEXTBOX_ENABLE_CHANGE]: (state, action) => {
        return state.setIn(['testBoxList', state.get('testBoxList').size - 1, 'enable'], false);
    },

    [CHANGE_TIME_SETTER]: (state, action) => {
        return state.set('timeSetter', !state.get('timeSetter'));
    },

    [CHANGE_TIME_FORMAT]: (state, action) => {
        return state.setIn(['timeFormat', action.payload.name], action.payload.value);
    },

    [CHANGE_TIME_FORMAT_ALL]: (state, action) => {
        return state.set('timeFormat', Map({
            date: action.payload.date,
            md: action.payload.md,
            h: action.payload.h,
            t: action.payload.t,
        }));
    },

    ...pender({
        type: START_TEST,
        onSuccess: (state, action) => {

            const boxInfo = action.payload.data.data;

            return state.update('testBoxList', boxes =>
                boxes.push(
                    Map({
                        boxId: boxInfo.boxId,
                        preText: boxInfo.preText,
                        postText: boxInfo.postText,
                        boxType: boxInfo.boxType,
                        enable: true,
                        time: new Date(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            );
        },
    }),

    ...pender({
        type: SEND_COMMAND,
        onSuccess: (state, action) => {

            const boxInfo = action.payload.data.data;

            return state.update('testBoxList', boxes =>
                boxes.push(
                    Map({
                        boxId: boxInfo.boxId,
                        preText: boxInfo.preText,
                        postText: boxInfo.postText,
                        boxType: boxInfo.boxType,
                        enable: true,
                        time: new Date(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            );
        },
    }),

    ...pender({
        type: SEND_BUILDING_JSON,
        onSuccess: (state, action) => {

            return state.set('testResult', Map({
                msg: action.payload.msg,
                status: action.payload.status
            }));
        },

        onFailure: (state, action) => {

            return state.set('testResult', Map({
                msg: action.payload.msg,
                status: action.payload.status
            }));
        },
    }),

}, initialState);