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
    TestPallet,
    TestBox,
    TestTextBox,
    TestUserTextBox,
    TestWindow,
    SendReceiveBox,
    TestToolBox,
    TestEndBox,
    SensingPallet,
    DataModalWrapper
} from 'components';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';

class DataModelerWork extends Component {

    _initModelAdd = () => {
        const {modelerActions} = this.props
        modelerActions.initModelAdd();
    }

    _changeModelAdd = (name, value) => {
        const {modelerActions} = this.props
        modelerActions.changeModelAdd({
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
            })
        })
        modelerActions.getModelerInfo(devId)
    }

    componentWillUnmount() {

    }

    componentDidUpdate(){
    }

    render() {

        const {
            modelerTemp,
            modelerInfo,
            modelAdd
        } = this.props;

        return (
            <Fragment>
                <SensingPallet
                page={modelerTemp.get('page')}
                modelerInfo={modelerInfo}
                changeBtnCategory={this._changeBtnCategory}
                changeDataModal={this._changeDataModal}
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