import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, Map } from 'immutable';
import * as testActions from 'store/modules/test';
import * as deviceActions from 'store/modules/device';
import * as modelerActions from 'store/modules/modeler';
import {
    SensingPallet,
    DataModalWrapper,
    RuleModalWrapper,
    EventModalWrapper
} from 'components';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';

class DataModelerWork extends Component {

    _deleteRule = (modId, boxId, idx) => {
        const {modelerActions, deviceActions} = this.props
        modelerActions.deleteRule(modId, boxId, idx).then(arg=>{
            console.log(arg)
            if(arg.status === 200){
                deviceActions.deleteRule({
                    idx: arg.data.data.idx,
                    boxId: arg.data.data.boxId,
                })
            }
        })
    }

    _buttonSelect = (item) => {
        const {modelerActions} = this.props

        if(item !== null){
            modelerActions.boxSelect(Map({
                preText: item.get('preText'),
                postText: item.get('postText'),
                headRow: item.get('headRow'),
                footRow: item.get('footRow'),
                type: 6,
                boxId: item.get('boxId'),
                rules: item.get('rules'),
            }))
        }
        else{
            modelerActions.boxSelect(null)
        }
    }

    _initModelAdd = () => {
        const {modelerActions} = this.props
        modelerActions.initModelAdd();
    }

    _getFirstItem = () => {
        const {modelerInfo} = this.props

        let firstItem = null
        if(modelerInfo.get('devStateModel').size!==0){
            firstItem = modelerInfo.getIn(['devStateModel',0,'dataKey'])
        }
        else if(modelerInfo.get('sensingDataModel').size!==0){
            firstItem = modelerInfo.getIn(['sensingDataModel',0,'dataKey'])
        }

        return firstItem
    }

    _initEventAdd = () => {
        const {modelerActions, devName, authKey} = this.props
        const firstItem = this._getFirstItem()

        if(firstItem)
            modelerActions.initEventAdd({
                dataKey: firstItem,
                devName: devName,
                authKey: authKey
            });
    }

    _initRuleAdd = () => {
        const {modelerActions } = this.props
        const firstItem = this._getFirstItem()

        if(firstItem)
            modelerActions.initRuleAdd(firstItem);
    }

    _changeModelAdd = (name, value) => {
        const {modelerActions} = this.props
        modelerActions.changeModelAdd({
            name: name,
            value: value
        });
    }

    _changeRuleAdd = (name, value) => {
        const {modelerActions} = this.props
        if(name==='type' && value==='1'){
            modelerActions.changeRuleAdd({
                name: 'convert',
                value: ''
            });
            modelerActions.changeRuleAdd({
                name: 'fixValue',
                value: ''
            });    
        }
        modelerActions.changeRuleAdd({
            name: name,
            value: value
        });
    }

    _changeEventAdd = (name, value) => {
        const {modelerActions} = this.props
        modelerActions.changeEventAdd({
            name: name,
            value: value
        });
    }

    _addDataModel = (modType) => {
        console.log(modType)
        const {modelerActions, modelAdd, devId} = this.props
        modelerActions.addDataModel(devId,{
            dataKey: modelAdd.get('key'),
            devId: devId,
            dataType: modelAdd.get('type'),
            modType: modType,
            isEv: modelAdd.get('event')==='1',
        })

        this._changeDataModal(false, modType)
    }

    _addStateRule = () => {
        const {modelerActions, deviceActions, ruleAdd, devId, selectedBox} = this.props
        modelerActions.addStateRule({
            modId: null,
            devId: devId,
            boxId: selectedBox.get('boxId'),
            modDevId: devId,
            dataKey: ruleAdd.get('key'),
            ruleType: ruleAdd.get('type'),
            ruleValue: ruleAdd.get('fixValue'),
            mapVal: ruleAdd.get('convert'),
            priority: ruleAdd.get('priority'),
        }, devId).then(arg=>{
            console.log(arg)
            if(arg.status === 200){
                deviceActions.addRule({
                    boxId: selectedBox.get('boxId'),
                    rule: arg.data.data
                })

                this._changeRuleModal(false)
            }
        })
    }

    _addEvent = () => {
        const {modelerActions, eventAdd, devId} = this.props
        modelerActions.addEvent(eventAdd, devId)
        this._changeEventModal(false)
    }

    _changeEventAdditionalAdd = (category, e) => {
        const { modelerActions } = this.props

        if(e.target.name === 'devName'){
            const set = e.target.value.split('#')
            modelerActions.changeEventAdditionalAdd({
                category: category,
                name: 'devName',
                value: set[0],
            })
            modelerActions.changeEventAdditionalAdd({
                category: category,
                name: 'authKey',
                value: set[1],
            })
            console.log(set[0])
        }
        else{
            modelerActions.changeEventAdditionalAdd({
                category: category,
                name: e.target.name,
                value: e.target.value,
            })
        }
    }

    _changeDataModal = (isOpen, modType) => {
        const {modelerActions} = this.props
        modelerActions.changeDataModal({
            isOpen: isOpen,
            modType: modType
        })
        if(isOpen){
            this._initModelAdd()
        }
    }

    _changeRuleModal = (arg) => {
        const {modelerActions} = this.props
        modelerActions.changeRuleModal(arg)
        if(arg){
            this._initRuleAdd()
        }
    }

    _changeEventModal = (arg) => {
        const {modelerActions} = this.props
        modelerActions.changeEventModal(arg)
        if(arg){
            this._initEventAdd()
        }
    }

    _changeTextBoxInfo = (event, location) => {
        const { modelerActions } = this.props;
        const textareaLineHeight = 20;
        const minRows = 1
        const maxRows = 4

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows > maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
            return;
        }

        const changeRow = currentRows < maxRows ? currentRows : maxRows

        //deviceActions.devTargetTextboxHeightChange({ key: key, height: height })

        let name = 'postText'
        if(event.target.name === 'preorder') name = 'preText'

        //사본 변경
        modelerActions.devInputChange({ key: name, text: event.target.value });
        modelerActions.devInputRowChange({ key: location, row: changeRow });
    }

    _changeBtnCategory = (page) => {
        const {modelerActions} = this.props
        modelerActions.changeBtnCategoryPage(page);
    }

    _selectEvent = (event) => {
        const {modelerActions} = this.props
        modelerActions.selectEvent(event)
    }

    _deleteEvent = (eventId, type) => {
        const {modelerActions} = this.props
        modelerActions.deleteEvent(eventId, type)
    }

    _sendToThirdServer = (dataset) => {
        const {modelerActions, eventAdd} = this.props
        const path = `http://${eventAdd.getIn(['thirdServerDTO', 'host'])}:${eventAdd.getIn(['thirdServerDTO', 'port'])===''?'80': eventAdd.getIn(['thirdServerDTO', 'port'])}/${eventAdd.getIn(['thirdServerDTO', 'path'])}`
        modelerActions.sendToThirdServer(path, dataset)
    }

    _upPrioriy = (priority, name) => {
        const {modelerActions} = this.props
        modelerActions.upPrioriy({
            name: name,
            value: priority-1
        });
    }

    _downPrioriy = (priority, name) => {
        const {modelerActions} = this.props
        modelerActions.downPrioriy({
            name: name,
            value: priority+1
        });
    }

    componentDidMount() {
        const {modelerActions, devId} = this.props;
        modelerActions.initModelerTemp({
            page: '1',
            dataModal: Map({
                isOpen: false,
                modType: '0',
            }),
            ruleModal: false,
            selectEvent: null,
            res: null
        })
        modelerActions.getModelerInfo(devId)
        modelerActions.boxSelect(null)
    }

    componentWillUnmount() {

    }

    componentDidUpdate(){
    }

    render() {

        const {
            modelerTemp,
            modelerInfo,
            modelAdd,
            selectedBox,
            ruleAdd,
            eventAdd,
            devType,
            deviceInfo,
            devName
        } = this.props;

        return (
            <Fragment>
                <SensingPallet
                page={modelerTemp.get('page')}
                selectEventObj={modelerTemp.get('selectEvent')}
                modelerInfo={modelerInfo}
                changeBtnCategory={this._changeBtnCategory}
                changeDataModal={this._changeDataModal}
                buttonSelect={this._buttonSelect}
                selectedBox={selectedBox}
                changeRuleModal={this._changeRuleModal}
                changeEventModal={this._changeEventModal}
                deleteRule={this._deleteRule}
                selectEvent={this._selectEvent}
                deleteEvent={this._deleteEvent}
                >
                </SensingPallet>
                <DataModalWrapper
                    dataModal={modelerTemp.get('dataModal')}
                    changeDataModal={this._changeDataModal}
                    changeModelAdd={this._changeModelAdd}
                    modelAdd={modelAdd}
                    addDataModel={this._addDataModel}
                >
                </DataModalWrapper>
                <RuleModalWrapper
                    dataModal={modelerTemp.get('ruleModal')}
                    changeDataModal={this._changeRuleModal}
                    changeModelAdd={this._changeRuleAdd}
                    ruleAdd={ruleAdd}
                    addStateRule={this._addStateRule}
                    modelerInfo={modelerInfo}
                    downPrioriy={this._downPrioriy}
                    upPrioriy={this._upPrioriy}
                    selectedBox={selectedBox}
                >
                </RuleModalWrapper>
                <EventModalWrapper
                    dataModal={modelerTemp.get('eventModal')}
                    changeDataModal={this._changeEventModal}
                    changeModelAdd={this._changeEventAdd}
                    eventAdd={eventAdd}
                    addEvent={this._addEvent}
                    modelerInfo={modelerInfo}
                    changeTextBoxInfo={this._changeTextBoxInfo}
                    changeEventAdditionalAdd={this._changeEventAdditionalAdd}
                    devType={devType}
                    sendToThirdServer={this._sendToThirdServer}
                    res={modelerTemp.get('res')}
                    downPrioriy={this._downPrioriy}
                    upPrioriy={this._upPrioriy}
                    deviceInfo={deviceInfo}
                    devName={devName}
                >
                </EventModalWrapper>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            devId: state.device.getIn(['selectedDevice', 'devId']),
            devName: state.device.getIn(['selectedDevice', 'devName']),
            authKey: state.device.getIn(['selectedDevice', 'devAuthKey']),
            modelerTemp: state.modeler.get('modelerTemp'),
            modelerInfo: state.modeler.get('modelerInfo'),
            modelAdd: state.modeler.get('modelAdd'),
            ruleAdd: state.modeler.get('ruleAdd'),
            eventAdd: state.modeler.get('eventAdd'),
            selectedBox: state.modeler.get('selectedBox'),
            devType: state.device.getIn(['selectedDevice','devAuthKey']),
            deviceInfo: state.auth.getIn(['userState','deviceInfo']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            // basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
            testActions: bindActionCreators(testActions, dispatch),
            modelerActions: bindActionCreators(modelerActions, dispatch),
        })
    )(DataModelerWork)
)