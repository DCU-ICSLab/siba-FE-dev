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
} from 'components';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';
import VisibleBox from 'components/TextBox/VisibleBox';
import { ReplaceTimeChanger } from 'utils';

class TestWork extends Component {

    // elem = null;

    _startTest = () => {
        const { testActions, devId } = this.props;
        testActions.startTest(devId, 0);
    }

    _cancelTest = () => {

    }

    _setRef = (ref) => {
        this.elem = ref
    }

    _scrollToBottom = () => {
        //this.elem.scrollIntoView({ behavior: "smooth" });
        //this.elem.scrollTop = this.elem.scrollHeight
        //console.log(this.elem.scrollHeight)
    }

    _sendCommand = (arg, boxId) => {
        const { testActions, devId } = this.props;
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({ text: arg })
        testActions.sendCommand(devId, boxId)
        this._scrollToBottom()
    }

    _sendCommandWithTime = () => {
        const { testActions, devId, timeFormat, testBoxList } = this.props;
        const timeString = timeFormat.get('date').format('YYYY년 M월 D일 A HH:mm')

        testActions.textBoxEnableChange();
        testActions.addUserTextbox({ text: timeString })
        testActions.sendCommand(devId, testBoxList.getIn([testBoxList.size - 1, 'buttons', 0, 'cboxId']))
        testActions.changeTimeSetter();
        this._scrollToBottom()
    }

    _changeTimeSetter = () => {
        const { testActions, timeSetter } = this.props;
        if (!timeSetter) {
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
        testActions.changeTimeSetter();
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

    _renderVisibleBox = () => {
        const { testBoxList, pallet } = this.props;
        if(testBoxList.size===0) return;

        const boxId = testBoxList.getIn([testBoxList.size-1, 'boxId'])

        const boxInfo = pallet.get(pallet.findIndex((box)=>box.get('id') === boxId));

        return(
            <Fragment>
                <VisibleBox
                boxInfo={boxInfo}
                key={boxInfo.get('id')}
                isCurrent={true}
                index={0}/>
                {boxInfo.getIn(['info','buttons']).map((btn,index)=>{
                    const cboxInfo = pallet.get(pallet.findIndex(box=>btn.getIn(['linker','childId'])=== box.get('id')))
                    return(
                    <VisibleBox
                    boxInfo={cboxInfo}
                    key={cboxInfo.get('id')}
                    isCurrent={false}
                    index={index+1}/>
                    )
                })}
            </Fragment>
        )
    }

    componentDidMount() {
        const g = this.svgArea.childNodes[0]
        const rect = g.getBBox();
        this.svgArea.style.height = rect.height + rect.y + 20 + 'px';
        this.svgArea.style.width = rect.width + rect.x + 20 + 'px';
    }

    componentWillUnmount() {

    }

    render() {

        const {
            testBoxList,
            userBoxList,
            timeSetter,
            timeFormat,
            pallet,
            linkers,
        } = this.props;

        return (
            <Fragment>
                <TestPallet>
                    <TestWindow
                        setRef={this._setRef}
                        startTest={this._startTest}
                        cancelTest={this._cancelTest}
                        changeTimeSetter={this._changeTimeSetter}
                        timeSetter={timeSetter}
                        timeFormat={timeFormat}
                        changeTimeValue={this._changeTimeValue}
                        sendCommand={this._sendCommandWithTime}>
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
                                            changeTimeSetter={this._changeTimeSetter}>
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
                    </TestWindow>
                    <TestBox>
                        <TestToolBox setRef={this._setRef} renderVisibleBox={this._renderVisibleBox}>
                            <g>
                                {pallet.map((boxInfo, index) => {
                                    return (
                                        <TextBox
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
                        <SendReceiveBox>

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
            devAuthKey: state.device.getIn(['selectedDevice', 'devAuthKey']),
            devId: state.device.getIn(['selectedDevice', 'devId']),
            testBoxList: state.test.get('testBoxList'),
            userBoxList: state.test.get('userBoxList'),
            timeSetter: state.test.get('timeSetter'),
            timeFormat: state.test.get('timeFormat'),
            pallet: state.device.getIn(['graph', 'pallet']),
            linkers: state.device.getIn(['graph', 'linkers']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            // basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
            testActions: bindActionCreators(testActions, dispatch),
        })
    )(TestWork)
)