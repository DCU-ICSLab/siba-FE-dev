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

/*--------create action--------*/
export const cancelTest = createAction(CANCEL_TEST, TestAPI.cancelTest);
export const startTest = createAction(START_TEST, TestAPI.startTest);
export const sendCommand = createAction(SEND_COMMAND, TestAPI.startTest);
export const addUserTextbox = createAction(ADD_USER_TEXTBOX)
export const textBoxEnableChange = createAction(TEXTBOX_ENABLE_CHANGE)

/*--------state definition--------*/
const initialState = Map({
    testBoxList: List([]),
    userBoxList: List([])
});

/*--------reducer--------*/
export default handleActions({

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
        return state.setIn(['testBoxList', state.get('testBoxList').size-1, 'enable'], false);
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

}, initialState);