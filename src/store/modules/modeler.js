//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as ModelerAPI from 'store/api/modeler';
import * as DeviceAPI from 'store/api/device';

/*--------action type--------*/
const CHANGE_BTN_CATEGORY_PAGE = 'modeler/CHANGE_BTN_CATEGORY_PAGE'; 
const INIT_MODELER_TEMP = 'modeler/INIT_MODELER_TEMP'; 
const GET_MODELER_INFO = 'modeler/GET_MODELER_INFO'; 
const CHANGE_DATA_MODAL = 'modeler/CHANGE_DATA_MODAL'
const INIT_MODEL_ADD = 'modeler/INIT_MODEL_ADD'
const CHANGE_MODEL_ADD = 'modeler/CHANGE_MODEL_ADD'
const ADD_DATA_MODEL = 'modeler/ADD_DATA_MODEL'
const BOX_SELECT = 'modeler/BOX_SELECT'
const CHANGE_RULE_MODAL = 'modeler/CHANGE_RULE_MODAL'
const INIT_RULE_ADD = 'modeler/INIT_RULE_ADD'
const CHANGE_RULE_ADD = 'modeler/CHANGE_RULE_ADD'
const ADD_STATE_RULE = 'modeler/ADD_STATE_RULE'
const DELETE_RULE = 'modeler/DELETE_RULE'
const INIT_EVENT_ADD = 'modeler/INIT_EVENT_ADD'
const CHANGE_EVENT_MODAL = 'modeler/CHANGE_EVENT_MODAL'
const CHANGE_EVENT_ADD = 'modeler/CHANGE_EVENT_ADD'
const DEV_INPUT_CHANGE = 'modeler/DEV_INPUT_CHANGE'
const DEV_INPUT_ROW_CHANGE = 'modeler/DEV_INPUT_ROW_CHANGE'
const CHANGE_EVENT_ADDITIONAL_ADD = 'modeler/CHANGE_EVENT_ADDITIONAL_ADD'
const ADD_EVENT = 'modeler/ADD_EVENT'
const SELECT_EVENT = 'modeler/SELECT_EVENT'
const DELETE_EVENT = 'modeler/DELETE_EVENT'
const SEND_TO_THIRD_SERVER = 'modeler/SEND_TO_THIRD_SERVER'
const DOWN_PRIORITY = 'modeler/DOWN_PRIORITY'
const UP_PRIORITY = 'modeler/UP_PRIORITY'
const CHANGE_MAP_MODAL = 'modeler/CHANGE_MAP_MODAL'
const GET_DEVICE_MAP = 'modeler/GET_DEVICE_MAP'
const COPY_MAP_DEVICE = 'modeler/COPY_MAP_DEVICE'

/*--------create action--------*/
export const changeBtnCategoryPage = createAction(CHANGE_BTN_CATEGORY_PAGE);
export const initModelerTemp = createAction(INIT_MODELER_TEMP);
export const getModelerInfo = createAction(GET_MODELER_INFO, ModelerAPI.getModelerInfo);
export const changeDataModal = createAction(CHANGE_DATA_MODAL);
export const initModelAdd = createAction(INIT_MODEL_ADD);
export const changeModelAdd = createAction(CHANGE_MODEL_ADD);
export const addDataModel = createAction(ADD_DATA_MODEL, ModelerAPI.addDataModel);
export const boxSelect = createAction(BOX_SELECT);
export const changeRuleModal = createAction(CHANGE_RULE_MODAL);
export const initRuleAdd = createAction(INIT_RULE_ADD);
export const changeRuleAdd = createAction(CHANGE_RULE_ADD);
export const changeEventModal = createAction(CHANGE_EVENT_MODAL);
export const addStateRule = createAction(ADD_STATE_RULE, ModelerAPI.addNewRule);
export const deleteRule = createAction(DELETE_RULE, ModelerAPI.deleteRule)
export const initEventAdd = createAction(INIT_EVENT_ADD);
export const changeEventAdd = createAction(CHANGE_EVENT_ADD);
export const devInputChange = createAction(DEV_INPUT_CHANGE)
export const devInputRowChange = createAction(DEV_INPUT_ROW_CHANGE)
export const changeEventAdditionalAdd = createAction(CHANGE_EVENT_ADDITIONAL_ADD);
export const addEvent = createAction(ADD_EVENT, ModelerAPI.addEvent);
export const selectEvent = createAction(SELECT_EVENT)
export const deleteEvent = createAction(DELETE_EVENT, ModelerAPI.deleteEvent)
export const sendToThirdServer = createAction(SEND_TO_THIRD_SERVER, ModelerAPI.sendToThirdServer)
export const downPrioriy = createAction(DOWN_PRIORITY)
export const upPrioriy = createAction(UP_PRIORITY)
export const changeMapModal = createAction(CHANGE_MAP_MODAL)
export const getDeviceMap = createAction(GET_DEVICE_MAP, DeviceAPI.getDeviceDetail)
export const copyMapDevice = createAction(COPY_MAP_DEVICE)


/*--------state definition--------*/
const initialState = Map({

    modelerTemp: Map({
        page: '1',
        dataModal: Map({
            isOpen: false,
            modType: '0'
        }),
        ruleModal: false,
        eventModal: false,
        mapModal: false,
        selectEvent: null,
        res: null
    }),

    modelerInfo: Map({
        boxRules: List([]),
        devStateModel: List([]),
        sensingDataModel: List([]),
        events: List([])
    }),

    modelAdd: Map({
        key: '',
        type: '1',
        event: '0'
    }),

    ruleAdd: Map({
        priority: 0,
        key: '',
        type: '1',
        convert: '',
        fixValue:''
    }),

    eventAdd: Map({
        priority: 0,
        dataKey: '',
        ruleType: '1',
        outputType: '1',
        ruleValue:'',

        notifyBoxDTO: Map({
            headRow: 1,
            footRow: 1,
            preText: '',
            postText: ''
        }),

        thirdServerDTO: Map({
            host: '',
            port: '',
            path: '',
        }),

        controlDTO: Map({
            devName: '',
            authKey: '',
            devId: null,
            evCode: undefined
        })
    }),

    mapDevice: null,

    selectedBox: null
});

/*--------reducer--------*/
export default handleActions({

    [COPY_MAP_DEVICE]: (state, action) => {
        return state.set('mapDevice', action.payload);
    },

    [UP_PRIORITY]: (state, action) => {
        return state.setIn([action.payload.name, 'priority'], action.payload.value)
    },

    [DOWN_PRIORITY]: (state, action) => {
        return state.setIn([action.payload.name, 'priority'], action.payload.value)
    },

    [SELECT_EVENT]: (state, action) => {
        return state.setIn(['modelerTemp', 'selectEvent'], Map(action.payload))
    },

    [DEV_INPUT_ROW_CHANGE]: (state, action) => {
        return state.setIn(['eventAdd', 'notifyBoxDTO', action.payload.key], action.payload.row)
    },

    [DEV_INPUT_CHANGE]: (state, action) => {
        return state.setIn(['eventAdd', 'notifyBoxDTO', action.payload.key], action.payload.text)
    },

    [CHANGE_EVENT_ADD]: (state, action) => {
        return state.setIn(['eventAdd', action.payload.name], action.payload.value)
    },

    [CHANGE_EVENT_ADDITIONAL_ADD]: (state, action) => {
        return state.setIn(['eventAdd', action.payload.category,  action.payload.name], action.payload.value)
    },

    [CHANGE_EVENT_MODAL]: (state, action) => {
        return state.setIn(['modelerTemp', 'eventModal'], action.payload)
    },
    
    [CHANGE_RULE_MODAL]: (state, action) => {
        return state.setIn(['modelerTemp', 'ruleModal'], action.payload)
    },

    [CHANGE_MAP_MODAL]: (state, action) => {
        return state.setIn(['modelerTemp', 'mapModal'], action.payload)
    },

    [BOX_SELECT]: (state, action) => {
        return state.set('selectedBox', action.payload)
    },

    [INIT_EVENT_ADD]: (state, action) => {
        return state.set('eventAdd', Map({
            priority: state.getIn(['modelerInfo','events']).size+1,
            dataKey: action.payload.dataKey,
            ruleType: '1',
            outputType: '1',
            ruleValue:'',

            notifyBoxDTO: Map({
                headRow: 1,
                footRow: 1,
                preText: '',
                postText: ''
            }),

            thirdServerDTO: Map({
                host: '',
                port: '',
                path: '',
            }),

            controlDTO: Map({
                devName: action.payload.devName,
                authKey: action.payload.authKey,
                devId: action.payload.devId,
                evCode: ''
            })
        }))
    },

    [INIT_MODEL_ADD]: (state, action) => {
        return state.set('modelAdd', Map({
            key: '',
            type: '1',
            event: '0'
        }))
    },

    [INIT_RULE_ADD]: (state, action) => {
        return state.set('ruleAdd', Map({
            priority: state.getIn(['selectedBox','rules']).size+1,
            key: action.payload,
            type: '1',
            convert: '',
            fixValue:'',
        }))
    },

    [CHANGE_RULE_ADD]: (state, action) => {
        return state.setIn(['ruleAdd', action.payload.name], action.payload.value)
    },

    [CHANGE_MODEL_ADD]: (state, action) => {
        return state.setIn(['modelAdd', action.payload.name], action.payload.value)
    },

    [INIT_MODELER_TEMP]: (state, action) => {
        return state.set('modelerTemp', Map(action.payload))
    },

    [CHANGE_DATA_MODAL]: (state, action) => {
        return state.setIn(['modelerTemp','dataModal'], Map({
            isOpen: action.payload.isOpen,
            modType: action.payload.modType,
        }))
    },

    [CHANGE_BTN_CATEGORY_PAGE]: (state, action) => {
        return state.setIn(['modelerTemp', 'page'], action.payload)
    },

    ...pender({
        type: GET_MODELER_INFO,
        onSuccess: (state, action) => {
            return state.set('modelerInfo', Map({
                boxRules: List(action.payload.data.data.boxRules.map(item=>Map({
                    boxId: item.boxId,
                    devId: item.devId,
                    footRow: item.footRow,
                    headRow: item.headRow,
                    postText: item.postText,
                    preText: item.preText,
                    rules: List(item.rules.map(item=>Map(item))),
                }))),
                devStateModel: List(action.payload.data.data.devStateModel.map(item=>Map(item))),
                sensingDataModel: List(action.payload.data.data.sensingDataModel.map(item=>Map(item))),
                events: List(action.payload.data.data.events.map(item=>{
                    return Map({
                        eventId: item.eventId,
                        priority: item.priority,
                        dataKey: item.dataKey,
                        devId: item.devId,
                        outputType: item.outputType,
                        ruleType: item.ruleType,
                        ruleValue: item.ruleValue,
                        notifyBoxDTO: Map(item.notifyBoxDTO),
                        thirdServerDTO: Map(item.thirdServerDTO),
                        controlDTO: Map(item.controlDTO),
                    })
                }))
            }))
        },
    }),

    ...pender({
        type: ADD_DATA_MODEL,
        onSuccess: (state, action) => {
            if(action.payload.data.data.modType==='0'){
                return state.updateIn(['modelerInfo', 'devStateModel'], devStateModel=>
                devStateModel.push(Map(action.payload.data.data)))
            }
            else{
                return state.updateIn(['modelerInfo', 'sensingDataModel'], sensingDataModel=>
                sensingDataModel.push(Map(action.payload.data.data)))
            }
        },
    }),

    ...pender({
        type: ADD_STATE_RULE,
        onSuccess: (state, action) => {
            const data = action.payload.data.data;
            const idx = state.getIn(['modelerInfo', 'boxRules']).findIndex(box => box.get('boxId') === data.boxId)

            //const palletIdx = state.getIn(['selectedBox', 'pallet']).findIndex(box => box.get('id') === data.boxId)

            return state.updateIn(['modelerInfo','boxRules', idx, 'rules'], rules=>
            rules.push(Map(data)))
            .updateIn(['selectedBox','rules'], rules=>
            rules.push(Map(data)))
        },
    }),

    ...pender({
        type: DELETE_RULE,
        onSuccess: (state, action) => {

            const data = action.payload.data.data;
            const idx = state.getIn(['modelerInfo', 'boxRules']).findIndex(box => box.get('boxId') === data.boxId)

            return state.updateIn(['modelerInfo','boxRules', idx, 'rules'], rules=>
            rules.delete(data.idx))
            .updateIn(['selectedBox', 'rules'], rules=>
            rules.delete(data.idx))
        },
    }),

    ...pender({
        type: ADD_EVENT,
        onSuccess: (state, action) => {
            const data = action.payload.data.data;
            return state.updateIn(['modelerInfo','events'], events=>
            events.push(Map(data)))
        },
    }),

    ...pender({
        type: DELETE_EVENT,
        onSuccess: (state, action) => {
            const data = action.payload.data.data;
            const idx = state.getIn(['modelerInfo', 'events']).findIndex(event => event.get('eventId') === data)
            return state.updateIn(['modelerInfo','events'], events=>
            events.delete(idx))
            .setIn(['modelerTemp', 'selectEvent'], null)
        },
    }),

    ...pender({
        type: SEND_TO_THIRD_SERVER,
        onSuccess: (state, action) => {
            return state.setIn(['modelerTemp','res'], Map({
                msg: '3rd 서버와 연결이 성공하였습니다.',
                status: true
            }))
        },
        onFailure: (state, action) => {
            return state.setIn(['modelerTemp','res'], Map({
                msg: '3rd 서버와 연결이 실패하였습니다.',
                status: false
            }))
        },
    }),

    ...pender({
        type: GET_DEVICE_MAP,
        onSuccess: (state, action) => {
            const dataset =  Map({
                vHubId: action.payload.data.data.vhubId,
                devId: action.payload.data.data.devId,
                devAuthKey: action.payload.data.data.devAuthKey,
                blockIdCounter: action.payload.data.data.blockIdCounter,
                devName: action.payload.data.data.devName,
                codeIdCounter: action.payload.data.data.codeIdCounter,
                haveEntry: action.payload.data.data.haveEntry,
                eventCodeIdCounter: action.payload.data.data.eventCodeIdCounter,
                testLogList: List(action.payload.data.data.testLogList.map(log=>Map(log))),
                pallet: List(
                    action.payload.data.data.pallet.map(box=>{
                        return Map({
                            id: box.id,
                            //height: box.height,
                            linked: box.linked,
                            linking: box.linking,
                            pos: Map(box.pos),
                            postorder: box.postorder,
                            preorder: box.preorder,
                            headRow: box.headRow,
                            footRow: box.footRow,
                            type: box.type,
                            parentBox: List(box.parentBox.map(pbox=>Map(pbox))),
                            info: Map({
                                buttons: List(box.info.buttons.map(btn=>Map({
                                    code: btn.code,
                                    eventCode: btn.eventCode,
                                    name:btn.name,
                                    idx: btn.idx,
                                    isSpread: btn.isSpread,
                                    type: btn.type,
                                    linker: btn.linker ? Map({
                                        childId: btn.linker.childId,
                                        code: btn.linker.code,
                                        parentId: btn.linker.parentId,
                                        m: Map(btn.linker.m),
                                        z: Map(btn.linker.z)
                                    }) : null
                                })))
                            }),
                            rules: box.rules!==null ? List(box.rules.map(rule=>Map(rule))) : List([])
                        })
                    })
                ),
                linkers: List(
                    action.payload.data.data.linkers.map(linker=>Map({
                        childId: linker.childId,
                        code: linker.code,
                        parentId: linker.parentId,
                        m: Map(linker.m),
                        z: Map(linker.z)
                    }))
                ),  
            })

            return state.set('mapDevice', dataset);
        },
    }),

}, initialState);