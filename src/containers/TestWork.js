import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, Map } from 'immutable';
import * as testActions from 'store/modules/test';
import * as deviceActions from 'store/modules/device';
import { TestPallet, TestBox, TestTextBox, TestUserTextBox, TestWindow } from 'components';
import {ReplaceTimeChanger} from 'utils';

class TestWork extends Component {

    _startTest = () => {
        const { testActions, devId } = this.props;
        testActions.startTest(devId, 0);
    }

    _cancelTest = () => {
        
    }

    _sendCommand = (arg, boxId) => {
        const { testActions, devId } = this.props;
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({text: arg})
        testActions.sendCommand(devId,boxId)
    }

    _sendCommandWithTime = () => {
        const { testActions, devId, timeFormat, testBoxList } = this.props;
        const timeString = timeFormat.get('date').format('YYYY년 M월 D일 A HH:mm')

        testActions.textBoxEnableChange();
        testActions.addUserTextbox({text: timeString})
        testActions.sendCommand(devId,testBoxList.getIn([testBoxList.size-1, 'buttons', 0, 'cboxId']))
        testActions.changeTimeSetter();
    }

    _changeTimeSetter = () => {
        const { testActions, timeSetter } = this.props;
        if(!timeSetter){
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

        switch(name){
            case 'md':
                convertDate = isUp? date.add(1, 'days') : date.subtract(1, 'days')
                const day =date.format('dddd');
                value = convertDate.format("M월 D일 dddd").replace(day, ReplaceTimeChanger(day))
                break;
            case 'h':
                convertDate = isUp? date.add(1, 'hours') : date.subtract(1, 'hours')
                value = convertDate.format('H')
                break;
            default: // 't'
                convertDate = isUp? date.add(1, 'minutes') : date.subtract(1, 'minutes')
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

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        const {
            testBoxList,
            userBoxList,
            timeSetter,
            timeFormat
        } = this.props;

        return (
            <Fragment>
                <TestPallet>
                    <TestWindow 
                    startTest={this._startTest}
                    cancelTest={this._cancelTest}
                    changeTimeSetter={this._changeTimeSetter}
                    timeSetter={timeSetter}
                    timeFormat={timeFormat}
                    changeTimeValue={this._changeTimeValue}
                    sendCommand={this._sendCommandWithTime}>
                        {
                            testBoxList.map((box,index) => {
                                return(
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
                                            time={userBoxList.getIn([index,'time'])}>
                                                {userBoxList.getIn([index,'text'])}
                                            </TestUserTextBox>
                                        }
                                    </Fragment>
                                )
                            })
                        }
                        {/* <TestTextBox 
                                    key={1}
                                    preText={'명령 목록입니다.'}
                                    postText={'수행할 명령을 클릭해주세요.'}
                                    enable={true}
                                    time={new Date()}
                                    sendCommand={this._sendCommand}
                                    buttons={
                                        List([
                                            Map({
                                                btnCode: 0,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                            Map({
                                                btnCode: 1,
                                                btnName: '테스트',
                                                evCode: 0,
                                                btnType: '1',
                                                cboxId: 1
                                            }),
                                        ])
                                    }>
                                    </TestTextBox>
                                    <TestUserTextBox>
                                    </TestUserTextBox> */}
                    </TestWindow>
                    <TestBox>

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
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            // basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
            testActions: bindActionCreators(testActions, dispatch),
        })
    )(TestWork)
)