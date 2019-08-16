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
const SAVE_TEMP_ADDITIONAL_TYPE = 'test/SAVE_TEMP_ADDITIONAL_TYPE'
const CLEAR_TIME_FORMAT = 'test/CLEAR_TIME_FORMAT'
const GET_RESERVATION = 'test/GET_RESERVATION'
const CANCEL_RESERVATION = 'test/CANCEL_RESERVATION'
const SET_RES_STATE = 'test/SET_RES_STATE'
const CHANGE_TEMP_MSG = 'test/CHANGE_TEMP_MSG'
const CHANGE_INTERVAL_SET = 'test/CHANGE_INTERVAL_SET'
const ADD_INTERVAL_SET_BOX = 'test/ADD_INTERVAL_SET_BOX'
const CHANGE_SIDE_TAB = 'test/CHANGE_SIDE_TAB'
const CHANGE_ADDON_TAB = 'test/CHANGE_ADDON_TAB'
const GET_DEVICE_STATE  = 'test/GET_DEVICE_STATE'
const SET_HUB_RESULT  = 'test/SET_HUB_RESULT'
const SET_DEV_RESULT  = 'test/SET_DEV_RESULT'

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
export const saveTempAdditionalType = createAction(SAVE_TEMP_ADDITIONAL_TYPE)
export const clearTimeFormat = createAction(CLEAR_TIME_FORMAT)
export const getReservation = createAction(GET_RESERVATION, TestAPI.getReservation)
export const cancelReservation = createAction(CANCEL_RESERVATION, TestAPI.cancelReservation)
export const setResState = createAction(SET_RES_STATE)
export const changeTempMsg = createAction(CHANGE_TEMP_MSG)
export const changeIntervalSet = createAction(CHANGE_INTERVAL_SET)
export const addIntervalSetBox = createAction(ADD_INTERVAL_SET_BOX)
export const changeSideTab = createAction(CHANGE_SIDE_TAB)
export const changeAddonTab = createAction(CHANGE_ADDON_TAB)
export const getDeviceState = createAction(GET_DEVICE_STATE, TestAPI.getDeviceState)
export const setDevResult = createAction(SET_DEV_RESULT)
export const setHubResult = createAction(SET_HUB_RESULT)


/*--------state definition--------*/
const initialState = Map({
    testBoxList: List([]),
    userBoxList: List([]),
    cmdList: List([]),
    timeSetter: Map({
        isOpen: false,
        cboxId: null
    }),
    timeFormat: Map({
        date: null,
        md: '',
        h: '',
        t: ''
    }),

    isEnd: false,
    isSend: false,
    isIntervalSet: Map({
        devId: null,
        cboxId: null
    }),
    isRes: false,
    tempMessage: '',

    hubResult: Map({
        msg: '',
        status: ''
    }),

    deviceResult: Map({
        msg: '',
        status: ''
    }),

    isDuplicate: false,
    tab: '1',
    addonTab: '1'
});

/*--------reducer--------*/
export default handleActions({

    [SET_DEV_RESULT]: (state, action) => {
        return state.set('deviceResult', Map(action.payload))
    },

    [SET_HUB_RESULT]: (state, action) => {
        return state.set('hubResult', Map(action.payload))
    },

    [CHANGE_ADDON_TAB]: (state, action) => {
        return state.set('addonTab', action.payload)
    },

    [CHANGE_SIDE_TAB]: (state, action) => {
        return state.set('tab', action.payload)
    },

    [ADD_INTERVAL_SET_BOX]: (state, action) => {
        return state.update('testBoxList', boxes =>
            boxes.push(
                Map({
                    boxId: -3,
                    preText: '명령 실행 주기를 설정해주세요.',
                    postText: '버튼을 선택해주세요.',
                    boxType: 1,
                    enable: true,
                    time: Date.now(),
                    buttons: List([
                        Map({
                            btnType: '7',
                            btnName: '1회',
                            evCode: null,
                            cboxId: null
                        }),
                        Map({
                            btnType: '7',
                            btnName: '매일',
                            evCode: null,
                            cboxId: null
                        }),
                        Map({
                            btnType: '7',
                            btnName: '매주',
                            evCode: null,
                            cboxId: null
                        }),
                    ])
                })
            )
        );
    },

    [CHANGE_INTERVAL_SET]: (state, action) => {
        return state.set('isIntervalSet', Map(action.payload))
    },

    [CHANGE_TEMP_MSG]: (state, action) => {
        return state.set('tempMessage', action.payload)
    },

    [CLEAR_TIME_FORMAT]: (state, action) => {
        return state.set('timeFormat', Map({
            date: null,
            md: '',
            h: '',
            t: ''
        }))
    },

    [SET_SEND_STATE]: (state, action) => {
        return state.set('isSend', action.payload);
    },

    [SET_RES_STATE]: (state, action) => {
        return state.set('isRes', action.payload);
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

    [SAVE_TEMP_ADDITIONAL_TYPE]: (state, action) => {
        return state.updateIn(['cmdList', state.get('cmdList').size - 1, 'additional'], additional =>
            additional.push(Map(action.payload)));
    },

    [TESTBOX_INIT]: (state, action) => {
        return state.set('testBoxList', List([]))
            .set('userBoxList', List([]))
            .set('cmdList', List([]))
            .set('isEnd', false)
            .set('isSend', false)
            .set('isRes', false)
            .set('isIntervalSet', Map({
                devId: null,
                cboxId: null
            }))
    },

    [ADD_USER_TEXTBOX]: (state, action) => {
        return state.update('userBoxList', boxes =>
            boxes.push(
                Map({
                    text: action.payload.text,
                    time: Date.now()
                })
            )
        );
    },

    [TEXTBOX_ENABLE_CHANGE]: (state, action) => {
        return state.setIn(['testBoxList', state.get('testBoxList').size - 1, 'enable'], false);
    },

    [CHANGE_TIME_SETTER]: (state, action) => {
        return state.set('timeSetter', Map({
            isOpen: action.payload.isOpen,
            cboxId: action.payload.cboxId
        }));
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
                        time: Date.now(),
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
                        time: Date.now(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            )
        },
    }),

    ...pender({
        type: SEND_BUILDING_JSON,
        onSuccess: (state, action) => {

            return state.set('testResult', Map({
                msg: action.payload.data.msg,
                status: action.payload.data.status
            }));
        },

        onFailure: (state, action) => {

            return state.set('testResult', Map({
                msg: action.payload.data.msg,
                status: action.payload.data.status
            }));
        },
    }),

    ...pender({
        type: GET_RESERVATION,
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
                        time: Date.now(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            );
        },
    }),

    ...pender({
        type: CANCEL_RESERVATION,
        onSuccess: (state, action) => {

            return state.update('testBoxList', boxes =>
                boxes.push(
                    Map({
                        boxId: -2,
                        preText: action.payload.data.msg,
                        postText: null,
                        boxType: '1',
                        enable: true,
                        time: Date.now(),
                        buttons: List([])
                    })
                )
            );
        },
    }),

    ...pender({
        type: GET_DEVICE_STATE,
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
                        time: Date.now(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            );
        },
        onFailure: (state, action) => {
            const boxInfo = action.payload.data.data;

            return state.update('testBoxList', boxes =>
                boxes.push(
                    Map({
                        boxId: boxInfo.boxId,
                        preText: boxInfo.preText,
                        postText: boxInfo.postText,
                        boxType: boxInfo.boxType,
                        enable: true,
                        time: Date.now(),
                        buttons: List(boxInfo.buttons.map(btn =>
                            Map(btn)
                        ))
                    })
                )
            );
        },
    }),

}, initialState);