import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import * as testActions from 'store/modules/test';
import * as deviceActions from 'store/modules/device';
import { TestPallet, TestBox, TestTextBox, TestUserTextBox, TestWindow } from 'components';

class TestWork extends Component {

    _startTest = () => {
        const { testActions, devAuthKey } = this.props;
        testActions.startTest(devAuthKey, 0);
    }

    _cancelTest = () => {
        
    }

    _sendCommand = (arg, boxId) => {
        const { testActions, devAuthKey } = this.props;
        testActions.textBoxEnableChange();
        testActions.addUserTextbox({text: arg})
        testActions.sendCommand(devAuthKey,boxId)
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        const {
            testBoxList,
            userBoxList
        } = this.props;

        return (
            <Fragment>
                <TestPallet>
                    <TestWindow 
                    startTest={this._startTest}
                    cancelTest={this._cancelTest}>
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
                                        sendCommand={this._sendCommand}>
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
            testBoxList: state.test.get('testBoxList'),
            userBoxList: state.test.get('userBoxList'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            // basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
            testActions: bindActionCreators(testActions, dispatch),
        })
    )(TestWork)
)