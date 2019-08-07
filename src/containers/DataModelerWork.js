import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, Map } from 'immutable';
import * as testActions from 'store/modules/test';
import * as deviceActions from 'store/modules/device';
import {
    TestPallet,
    TestBox,
    TestTextBox,
    TestUserTextBox,
    TestWindow,
    SendReceiveBox,
    TestToolBox,
    TestEndBox,
    SensingPallet
} from 'components';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';

class DataModelerWork extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    componentDidUpdate(){
    }

    render() {

        const {
        } = this.props;

        return (
            <Fragment>
                <SensingPallet>
                </SensingPallet>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            selectedDevice: state.device.get('selectedDevice'),
            devAuthKey: state.device.getIn(['selectedDevice', 'devAuthKey']),
            vHubId: state.device.getIn(['selectedDevice', 'vHubId']),
            devId: state.device.getIn(['selectedDevice', 'devId']),
            testBoxList: state.test.get('testBoxList'),
            userBoxList: state.test.get('userBoxList'),
            timeSetter: state.test.get('timeSetter'),
            timeFormat: state.test.get('timeFormat'),
            pallet: state.device.getIn(['graph', 'pallet']),
            linkers: state.device.getIn(['graph', 'linkers']),
            cmdList: state.test.get('cmdList'),
            isEnd: state.test.get('isEnd'),
            isSend: state.test.get('isSend'),
            isRes: state.test.get('isRes'),
            tab: state.test.get('tab'),
            addonTab: state.test.get('addonTab'),
            isIntervalSet: state.test.get('isIntervalSet'),
            tempMessage: state.test.get('tempMessage'),
            isDuplicate: state.test.get('isDuplicate'),
            connectedDev: state.device.get('connectedDev'),
            userId: state.auth.getIn(['userState', 'user', 'userId']), 
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            // basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
            testActions: bindActionCreators(testActions, dispatch),
        })
    )(DataModelerWork)
)