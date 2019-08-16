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

    _initEventAdd = () => {
        const {modelerActions} = this.props
        modelerActions.initEventAdd();
    }

    _initRuleAdd = () => {
        const {modelerActions, modelerInfo} = this.props

        let fisrtItem = null
        if(modelerInfo.get('devStateModel').size!==0){
            fisrtItem = modelerInfo.getIn(['devStateModel',0,'dataKey'])
        }
        else if(modelerInfo.get('sensingDataModel').size!==0){
            fisrtItem = modelerInfo.getIn(['sensingDataModel',0,'dataKey'])
        }
        else{
            fisrtItem = ''
        }
        modelerActions.initRuleAdd(fisrtItem);
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
        }, devId).then(arg=>{
            console.log(arg)
            if(arg.status === 200){
                console.log(arg.data.data)
                deviceActions.addRule({
                    boxId: selectedBox.get('boxId'),
                    rule: arg.data.data
                })
            }
        })
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

    _changeBtnCategory = (page) => {
        const {modelerActions} = this.props
        modelerActions.changeBtnCategoryPage(page);
    }

    componentDidMount() {
        const {modelerActions, devId} = this.props;
        modelerActions.initModelerTemp({
            page: '1',
            dataModal: Map({
                isOpen: false,
                modType: '0',
            }),
            ruleModal: false
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
            ruleAdd
        } = this.props;

        return (
            <Fragment>
                <SensingPallet
                page={modelerTemp.get('page')}
                modelerInfo={modelerInfo}
                changeBtnCategory={this._changeBtnCategory}
                changeDataModal={this._changeDataModal}
                buttonSelect={this._buttonSelect}
                selectedBox={selectedBox}
                changeRuleModal={this._changeRuleModal}
                changeEventModal={this._changeEventModal}
                deleteRule={this._deleteRule}
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
                >
                </RuleModalWrapper>
                <EventModalWrapper
                    dataModal={modelerTemp.get('eventModal')}
                    changeDataModal={this._changeEventModal}
                    changeModelAdd={this._changeRuleAdd}
                    ruleAdd={ruleAdd}
                    addStateRule={this._addStateRule}
                    modelerInfo={modelerInfo}
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
            modelerTemp: state.modeler.get('modelerTemp'),
            modelerInfo: state.modeler.get('modelerInfo'),
            modelAdd: state.modeler.get('modelAdd'),
            ruleAdd: state.modeler.get('ruleAdd'),
            selectedBox: state.modeler.get('selectedBox'),
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