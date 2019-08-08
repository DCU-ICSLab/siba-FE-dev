//Duck pattern

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as ModelerAPI from 'store/api/modeler';

/*--------action type--------*/
const CHANGE_BTN_CATEGORY_PAGE = 'modeler/CHANGE_BTN_CATEGORY_PAGE'; 
const INIT_MODELER_TEMP = 'modeler/INIT_MODELER_TEMP'; 
const GET_MODELER_INFO = 'modeler/GET_MODELER_INFO'; 
const CHANGE_DATA_MODAL = 'modeler/CHANGE_DATA_MODAL'
const INIT_MODEL_ADD = 'modeler/INIT_MODEL_ADD'
const CHANGE_MODEL_ADD = 'modeler/CHANGE_MODEL_ADD'
const ADD_DATA_MODEL = 'modeler/ADD_DATA_MODEL'

/*--------create action--------*/
export const changeBtnCategoryPage = createAction(CHANGE_BTN_CATEGORY_PAGE);
export const initModelerTemp = createAction(INIT_MODELER_TEMP);
export const getModelerInfo = createAction(GET_MODELER_INFO, ModelerAPI.getModelerInfo);
export const changeDataModal = createAction(CHANGE_DATA_MODAL);
export const initModelAdd = createAction(INIT_MODEL_ADD);
export const changeModelAdd = createAction(CHANGE_MODEL_ADD);
export const addDataModel = createAction(ADD_DATA_MODEL, ModelerAPI.addDataModel);


/*--------state definition--------*/
const initialState = Map({

    modelerTemp: Map({
        page: '1',
        dataModal: Map({
            isOpen: false,
            modType: '0'
        })
    }),

    modelerInfo: Map({
        sensingBtn: List([]),
        deviceStateBtn: List([]),
        devStateModel: List([]),
        sensingDataModel: List([]),
    }),

    modelAdd: Map({
        key: '',
        type: '1',
        event: '0'
    })
});

/*--------reducer--------*/
export default handleActions({

    [INIT_MODEL_ADD]: (state, action) => {
        return state.set('modelAdd', Map({
            key: '',
            type: '1',
            event: '0'
        }))
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
                sensingBtn: List(action.payload.data.data.sensingBtn.map(item=>Map(item))),
                deviceStateBtn: List(action.payload.data.data.deviceStateBtn.map(item=>Map(item))),
                devStateModel: List(action.payload.data.data.devStateModel.map(item=>Map(item))),
                sensingDataModel: List(action.payload.data.data.sensingDataModel.map(item=>Map(item))),
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

}, initialState);