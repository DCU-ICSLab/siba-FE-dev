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
    TestEndBox
} from 'components';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';
import VisibleBox from 'components/TextBox/VisibleBox';
import { ReplaceTimeChanger } from 'utils';

class TestWork extends Component {

    // elem = null;

    _startTest = () => {
        const { testActions, devId } = this.props;
        this._cancelTest();
        testActions.startTest(devId, 0);
    }

    _cancelTest = () => {
        const { testActions } = this.props
        testActions.clearTimeFormat();
        testActions.testboxInit();
        testActions.setTextboxEnd(false);
        testActions.setSendState(false)
    }

    _scrollToBottom = () => {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight - this.chatScroll.clientHeight;
        //this.elem.scrollIntoView({ behavior: "smooth" });
        //this.elem.scrollTop = this.elem.scrollHeight
        //console.log(this.elem.scrollHeight)
    }

    //예약 조회인 경우
    _getReservationInfo = (arg) => {
        const { testActions, devId, connectedDev, vHubId } = this.props;
        testActions.setResState(true)
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({ text: arg })
        testActions.getReservation(connectedDev.getIn([0,'devMac']),vHubId)
    }

    _cancelReservation = (arg, resId) => {
        const { testActions, devId, connectedDev, vHubId } = this.props;
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({ text: arg })
        testActions.cancelReservation(vHubId, resId);
    }

    _sendCommand = (arg, boxId) => {
        const { testActions, devId } = this.props;
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({ text: arg })
        if (boxId !== null)
            testActions.sendCommand(devId, boxId)
        else {
            testActions.setTextboxEnd(true);
        }
        this._scrollToBottom()
    }

    _sendCommandWithDynamic = () => {
        const { testActions, tempMessage, testBoxList, devId} = this.props;

        testActions.saveTempAdditionalType({
            type: '2',
            value: parseInt(tempMessage,10),
        })

        testActions.textBoxEnableChange(); //시간 설정 박스 화면에서 hide
        testActions.addUserTextbox({ text: tempMessage }) //사용자 답 텍스트 박스 추가

        testActions.changeTempMsg('')

        const cboxId = testBoxList.getIn([testBoxList.size - 1, 'buttons', 0, 'cboxId'])

        //자식요소가 있다면
        if(cboxId !== null)
            testActions.sendCommand(devId, cboxId)

        //없다면
        else {
            testActions.setTextboxEnd(true);
        }

    }

    _sendCommandWithTime = () => {
        const { testActions, devId, timeFormat, testBoxList, timeSetter } = this.props;
        const ts = timeFormat.get('date').format('YYYY년 M월 D일 A HH:mm')

        //console.log(timeFormat.get('date'))
        //console.log(timeString)

        testActions.saveTempAdditionalType({
            type: '1',
            value: parseInt(timeFormat.get('date').format('x'),10),
        })

        testActions.textBoxEnableChange(); //시간 설정 박스 화면에서 hide
        testActions.addUserTextbox({ text: ts }) //사용자 답 텍스트 박스 추가

        //자식요소가 있다면
        if(timeSetter.get('cboxId') !== null){
            //testActions.sendCommand(devId, testBoxList.getIn([testBoxList.size - 1, 'buttons', 0, 'cboxId']))
            //testActions.setTextboxEnd(true);
            testActions.changeIntervalSet({
                devId: devId,
                cboxId: testBoxList.getIn([testBoxList.size - 1, 'buttons', 0, 'cboxId'])
            })
        }
        //없다면
        else {
            //testActions.setTextboxEnd(true);
            testActions.changeIntervalSet({
                devId: devId,
                cboxId: null
            })
        }

        //close
        testActions.changeTimeSetter({
            isOpen: false,
            cboxId: null,
        });

        testActions.addIntervalSetBox()

        this._scrollToBottom()
    }

    _sendCommandWithTimeWithInterval = (arg) => {
        const { testActions, isIntervalSet } = this.props;

        testActions.textBoxEnableChange();
        testActions.saveTempAdditionalType({
            type: '4',
            value: arg,
        })

        let userText = '';
        switch(arg){
            case '1':
                userText = '1회 실행'
                break;
            case '2':
                userText = '매일 실행'
                break;
            case '3':
                userText = '매주 실행'
                break;
            default:
                break;
        }

        testActions.addUserTextbox({ text: userText }) //사용자 답 텍스트 박스 추가

        //자식요소가 있다면
        if(isIntervalSet.get('cboxId') !== null){
            testActions.sendCommand(isIntervalSet.get('devId'), isIntervalSet.get('cboxId'))
        }
        //없다면
        else {
            testActions.setTextboxEnd(true);
        }
    }

    _changeTimeSetter = (isOpen, boxId) => {
        const { testActions, timeSetter } = this.props;
        if (isOpen) {
            const date = moment();
            const day = date.format('dddd');
            const hour = date.format('H');
            const min = date.format('m');
            const dateString = date.format("M월 D일 dddd").replace(day, ReplaceTimeChanger(day));

            testActions.changeTimeFormatAll({
                date: date,
                md: dateString,
                h: hour,
                t: min
            })
        }
        testActions.changeTimeSetter({
            isOpen: isOpen,
            cboxId: boxId,
        });
    }

    _changeTimeValue = (name, isUp) => {
        const { testActions, timeFormat } = this.props;
        const date = timeFormat.get('date');
        let convertDate;
        let value;

        switch (name) {
            case 'md':
                convertDate = isUp ? date.add(1, 'days') : date.subtract(1, 'days')
                const day = date.format('dddd');
                value = convertDate.format("M월 D일 dddd").replace(day, ReplaceTimeChanger(day))
                break;
            case 'h':
                convertDate = isUp ? date.add(1, 'hours') : date.subtract(1, 'hours')
                value = convertDate.format('H')
                break;
            default: // 't'
                convertDate = isUp ? date.add(1, 'minutes') : date.subtract(1, 'minutes')
                value = convertDate.format('m')
                break;
        }

        testActions.changeTimeFormat({
            name: 'time',
            value: convertDate,
        })

        testActions.changeTimeFormat({
            name: name,
            value: value,
        })
    }

    _setRef = (ref) => {
        this.svgArea = ref
    }

    _setRefScroll = (ref) => {
        this.chatScroll = ref
    }

    _setGraphRef= (ref) => {
        this.graphDiv = ref
    }

    _renderVisibleBox = () => {
        const { testBoxList, pallet, isSend, isRes } = this.props;
        if (testBoxList.size === 0) return;

        const boxId = testBoxList.getIn([testBoxList.size - 1, 'boxId'])

        const boxInfo = pallet.get(pallet.findIndex((box) => box.get('id') === boxId));

        return (
            <Fragment>
                {!isSend && !isRes && <VisibleBox
                    boxInfo={boxInfo}
                    key={boxInfo.get('id')}
                    isCurrent={true}
                    index={0} />}
                {!isSend && !isRes && boxInfo.getIn(['info', 'buttons']).map((btn, index) => {
                    if (btn.get('linker')) {
                        const cboxInfo = pallet.get(pallet.findIndex(box => btn.getIn(['linker', 'childId']) === box.get('id')))
                        return (
                            <VisibleBox
                                boxInfo={cboxInfo}
                                key={cboxInfo.get('id')}
                                isCurrent={false}
                                index={index + 1} />
                        )
                    }
                })}
            </Fragment>
        )
    }


    _saveTempType = (btnType, eventCode) => {
        const { testActions } = this.props
        testActions.saveTempType({
            btnType: btnType,
            eventCode: eventCode,
            additional: null
        })
    }

    _sendCommandToHub = () => {
        const { testActions, cmdList, connectedDev, devId, vHubId, selectedDevice, deviceActions, userId } = this.props
        console.log('test send');
        if (connectedDev.size === 1){
            testActions.setSendState(true)
            testActions.sendBuildingJson(cmdList, connectedDev.getIn([0,'devMac']), vHubId, devId, userId).then((data)=>{
                if(data.status===200){
                    console.log('push new log')
                    console.log(data.data)
                    deviceActions.pushTestLog(data.data);
                }
            })
        }
        else {
            testActions.setDuplicate(true)
        }
    }

    _changeTempMsg = (e) => {
        const { testActions } = this.props
        testActions.changeTempMsg(e.target.value)
    }

    _changeSideTab = (tab) => {
        const { testActions } = this.props
        testActions.changeSideTab(tab)
    }

    _changeAddonTab = (tab) => {
        const { testActions } = this.props
        testActions.changeAddonTab(tab)
    }

    _moveTestMap = () => {
        const { testBoxList, pallet, isSend, isRes } = this.props;
        if (testBoxList.size === 0) return;

        const boxId = testBoxList.getIn([testBoxList.size - 1, 'boxId'])

        const boxInfo = pallet.get(pallet.findIndex((box) => box.get('id') === boxId));

        let x = boxInfo.getIn(['pos', 'x']) + 20 -3;
        let y = boxInfo.getIn(['pos', 'y'])-3;
        let id = boxInfo.get('id');
        let type = boxInfo.get('type')
        let additionalHeight = (type===1 || type===5) ? 32 : (boxInfo.getIn(['info', 'buttons', 0, 'linker'])===null ? 0 : 16)
        let dynamicHeight = boxInfo.get('headRow') * 20 + boxInfo.get('footRow') * 20;
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let height = 45 + 18 * (buttonSize - 1) + dynamicHeight + 20 + additionalHeight+3//base height + button counts*18
        let EntrySt = type===5 ? 10 : 0

        
        this.graphDiv.scrollTop = y-EntrySt-10
        this.graphDiv.scrollLeft = x-10
    }

    componentDidMount() {
        const { testActions, deviceActions, selectedDevice } = this.props
        const g = this.svgArea.childNodes[0]
        const rect = g.getBBox();
        this.svgArea.style.height = rect.height + rect.y + 20 + 'px';
        this.svgArea.style.width = rect.width + rect.x + 20 + 'px';
        testActions.clearTimeFormat();
        deviceActions.getConnectedDevInfo(selectedDevice.get('devId'))
        //testActions.testboxInit();
    }

    componentWillUnmount() {

    }

    componentDidUpdate(){
        this._scrollToBottom()
        this._moveTestMap()
    }

    render() {

        const {
            testBoxList,
            userBoxList,
            timeSetter,
            timeFormat,
            pallet,
            linkers,
            cmdList,
            isEnd,
            isDuplicate,
            connectedDev,
            selectedDevice,
            isSend,
            tempMessage,
            tab,
            addonTab
        } = this.props;

        console.log(connectedDev.toJS())

        return (
            <Fragment>
                <TestPallet
                    connectedDev={connectedDev}>
                    <TestWindow
                        connectedDev={connectedDev}
                        setRef={this._setRefScroll}
                        startTest={this._startTest}
                        cancelTest={this._cancelTest}
                        changeTimeSetter={this._changeTimeSetter}
                        timeSetter={timeSetter}
                        timeFormat={timeFormat}
                        changeTimeValue={this._changeTimeValue}
                        sendCommand={this._sendCommandWithTime}
                        testBoxList={testBoxList}
                        changeTempMsg={this._changeTempMsg}
                        tempMessage={tempMessage}
                        sendCommandWithDynamic={this._sendCommandWithDynamic}
                        selectedDevice={selectedDevice}
                        isEnd={isEnd}>
                        {
                            testBoxList.map((box, index) => {
                                return (
                                    <Fragment key={box.get('boxId')}>
                                        <TestTextBox
                                            preText={box.get('preText')}
                                            postText={box.get('postText')}
                                            time={box.get('time')}
                                            enable={box.get('enable')}
                                            buttons={box.get('buttons')}
                                            boxType={box.get('boxType')}
                                            sendCommand={this._sendCommand}
                                            changeTimeSetter={this._changeTimeSetter}
                                            saveTempType={this._saveTempType}
                                            getReservationInfo={this._getReservationInfo}
                                            cancelReservation={this._cancelReservation}
                                            sendCommandWithTimeWithInterval={this._sendCommandWithTimeWithInterval}>
                                        </TestTextBox>
                                        {!box.get('enable') &&
                                            <TestUserTextBox
                                                time={userBoxList.getIn([index, 'time'])}>
                                                {userBoxList.getIn([index, 'text'])}
                                            </TestUserTextBox>
                                        }
                                    </Fragment>
                                )
                            })
                        }
                        {
                            isEnd &&
                            <TestEndBox
                                sendCommandToHub={this._sendCommandToHub}
                                isSend={isSend}
                                text={'명령을 전송하시겠습니까?'}>
                            </TestEndBox>
                        }
                        {
                            isDuplicate &&
                            <TestTextBox
                                preText={'연결된 동일 종류의 디바이스가 여러개 존재합니다.'}
                                postText={'명령을 보낼 디바이스를 선택하세요.'}
                                time={new Date()}
                                enable={null}
                                buttons={null}
                                boxType={'1'}
                                sendCommand={this._sendCommand}
                                changeTimeSetter={this._changeTimeSetter}
                                saveTempType={this._saveTempType}>
                            </TestTextBox>
                        }
                        {
                            isSend &&
                            <TestEndBox
                                sendCommandToHub={this._sendCommandToHub}
                                isSend={isSend}
                                text={'명령이 허브에게 전송되었습니다.'}>
                            </TestEndBox>
                        }
                    </TestWindow>
                    <TestBox>
                        <TestToolBox 
                        addonTab={addonTab}
                        changeAddonTab={this._changeAddonTab}
                        tab={tab}
                        changeSideTab={this._changeSideTab}
                        devName={selectedDevice.get('devName')}
                        setGraphRef={this._setGraphRef}
                        setRef={this._setRef} 
                        renderVisibleBox={this._renderVisibleBox}
                        testLogList={selectedDevice.get('testLogList')}>
                            <g>
                                {pallet.map((boxInfo, index) => {
                                    return (
                                        <TextBox
                                            isSelect={false}
                                            boxInfo={boxInfo}
                                            key={boxInfo.get('id')}
                                            index={index}
                                            isEvent={false} />)
                                })}
                            </g>

                            {
                                linkers.map((linkerInfo, index) => {
                                    return (
                                        <Linker
                                            linkerInfo={linkerInfo}
                                            key={index}
                                        />
                                    )
                                })}
                        </TestToolBox>
                        <SendReceiveBox
                            cmdList={cmdList}
                        >

                        </SendReceiveBox>
                    </TestBox>
                </TestPallet>
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
    )(TestWork)
)