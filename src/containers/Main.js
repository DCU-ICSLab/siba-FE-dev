import React, { Component, Fragment } from 'react';
import {
    SibaFrame,
    SibaHeader,
    HubPallet,
    HubNav,
    VirtualHub,
    SideBar,
    VirtualHubAddBtn,
    DeviceAddModalWrapper,
    HubAddModalWrapper
} from 'components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import * as basicActions from 'store/modules/basic';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_BASE_URL, ACCESS_TOKEN } from 'constants/index';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

var stompClient = null;
var socket = null;

class Main extends Component {

    _checkUser = () => {
        const tokenValue = localStorage.getItem(ACCESS_TOKEN)
        if (tokenValue) {
            const { authActions } = this.props;
            console.log(tokenValue)
            axios.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;
            authActions.kakaoAuth().then(() => {
                this._stompConnection(tokenValue);
            })
            authActions.setToken(tokenValue);
            return;
        }

        if (!this.props.token) {
            this.props.history.push('/')
        }
    }

    _stompConnection = (tokenValue) => {

        const { userState } = this.props;

        socket = new SockJS(
            `${API_BASE_URL}/websocket`
        );

        socket.onclose = () => {
            stompClient.disconnect();
            console.log('disconnected')
        };

        stompClient = Stomp.over(socket);
        stompClient.connect('temp', 'temp', (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/keep-alive-${userState.getIn(['user', 'userId'])}`, this._showHubStateChange);
        });
    }

    _showHubStateChange = (message) => {

        const { authActions } = this.props;

        const msg = JSON.parse(message.body)
        const isHubConnect = msg.msgType === 1;

        const outputMessage = isHubConnect ? `${msg.hubName} 허브가 연결되었습니다.` : `${msg.hubName} 허브 연결이 제거 되었습니다.`
        authActions.updateHubStatus({
            id: msg.hubId,
            value: isHubConnect
        })
        authActions.pushClog({
            hubId: msg.hubId,
            messageType: msg.msgType+'',
            actTime: new Date().getTime()
        })
        toast(this._generateToastMessage({
            message: outputMessage
        }), {
                className: 'toast',
                bodyClassName: 'toast',
            })
        console.log(message)
    }

    _generateToastMessage = ({ message }) => {
        return (
            <Fragment>
                <div style={{
                    // borderBottom: '1px solid #dadce0',
                    marginBottom: '3px',
                    paddingBottom: '10px'
                }}>
                    {message}
                    <br />
                </div>
                <div style={{
                    textAlign: 'right',
                    fontSize: '11px'
                }}>
                    {moment().format('MM/DD A HH:mm:ss')}
                </div>
            </Fragment>
        )
    }

    _vhubCreate = () => {
        const { basicActions, authActions, hubInput, hubModal } = this.props;
        authActions.vhubCreate(hubInput);
        basicActions.changeHubAddModal(!hubModal);
    }

    _sbToggle = () => {
        const { basicActions, sb } = this.props;
        basicActions.sbToggle(sb);
    }

    _refreshAuthKey = () => {
        const { basicActions } = this.props;
        basicActions.getDeviceAuthKey();
    }

    _refreshHubKey = () => {
        const { basicActions } = this.props;
        basicActions.getHubAuthKey();
    }

    _hubInput = (event) => {
        //validation 걸어야 함
        const { basicActions, hubInput } = this.props;
        basicActions.hubRegValueChange({
            key: event.target.name,
            value: event.target.value
        });

        if (event.target.name === 'devName') {
            basicActions.deviceRegValueChange({
                key: 'devDefName',
                value: event.target.value
            });
        }
    }

    _valueInput = (event) => {
        //validation 걸어야 함
        const { basicActions, regInput } = this.props;
        basicActions.deviceRegValueChange({
            key: event.target.name,
            value: event.target.value
        });

        if (event.target.name === 'devName') {
            basicActions.deviceRegValueChange({
                key: 'devDefName',
                value: event.target.value
            });
        }
    }

    _hubAddModalChange = () => {
        const { basicActions, hubModal } = this.props;
        basicActions.hubRegInputClear();
        basicActions.getHubAuthKey();
        basicActions.changeHubAddModal(!hubModal);
    }

    _deviceAddModalChange = () => {
        const { basicActions, deviceModal } = this.props;
        basicActions.deviceRegInputClear();
        basicActions.getDeviceAuthKey();
        basicActions.changeDeviceAddModal(!deviceModal);
    }

    _createDevice = () => {
        const { authActions, regInput, deviceModal } = this.props;
        //디바이스 생성 요청 전송 이전에 validation 해야
        authActions.createDevice(regInput);
        basicActions.changeDeviceAddModal(!deviceModal);
    }

    _linkDevicePage = (devId, dev) => {
        this.props.history.push({
            pathname: `/device/${devId}`,
            state: { dev: dev }
        })
    }

    _fold = (hubId) => {
        const { authActions } = this.props; 
        authActions.fold({hubId: hubId})
    }

    componentDidMount() {
        //const { authActions } = this.props;
        this._checkUser();
        //authActions.kakaoAuth()
    }

    render() {
        const {
            sb,
            deviceAddBox,
            deviceWorkBox,
            deviceModal,
            regInput,
            userState,
            hubModal,
            hubInput } = this.props;


        return (
            <Fragment>
                <SibaFrame>
                    <ToastContainer
                        hideProgressBar={true}
                        autoClose={8000}
                        newestOnTop={true}
                    />
                    <SibaHeader userState={userState}></SibaHeader>
                    <SideBar
                        deviceList={userState.get('deviceInfo')}
                        sbToggle={this._sbToggle}
                        sbState={sb}
                        deviceAddBoxOpenFunc={this._deviceAddBoxChange}
                        deviceAddBox={deviceAddBox}
                        deviceWorkBox={deviceWorkBox}
                        deviceWorkBoxChangeFunc={this._deviceWorkBoxChange}
                        hubList={userState.get('hubInfo')}>
                    </SideBar>
                    <HubPallet
                        sbState={sb}
                        size={userState.get('hubInfo').size}
                        deviceAddModalChange={this._deviceAddModalChange}
                        deviceInfo={userState.get('deviceInfo')}
                        logList={userState.get('clogList')}
                        linkDevicePage={this._linkDevicePage}
                        onClick={this._hubAddModalChange}
                    >
                        {
                            userState.get('hubInfo').map((hub, index) =>
                                <VirtualHub
                                    hub={hub}
                                    key={index}
                                    deviceAddModalChange={this._deviceAddModalChange}
                                    foldChange={this._fold}
                                />
                            )
                        }
                        {/* <VirtualHubAddBtn vhubCreate={this._vhubCreate} onClick={this._hubAddModalChange} /> */}
                    </HubPallet>
                    {/* <HubNav></HubNav> */}
                </SibaFrame>
                <HubAddModalWrapper
                    deviceModal={hubModal}
                    deviceAddModalChange={this._hubAddModalChange}
                    regInput={hubInput}
                    refreshAuthKey={this._refreshHubKey}
                    valueInput={this._hubInput}
                    createDevice={this._vhubCreate}>
                </HubAddModalWrapper>
                <DeviceAddModalWrapper
                    deviceModal={deviceModal}
                    deviceAddModalChange={this._deviceAddModalChange}
                    regInput={regInput}
                    refreshAuthKey={this._refreshAuthKey}
                    valueInput={this._valueInput}
                    createDevice={this._createDevice}>
                </DeviceAddModalWrapper>
            </Fragment>
        )
    }
}

export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            token: state.auth.getIn(['userState', 'token']),
            userState: state.auth.get('userState'),
            regInput: state.basic.get('regInput'),
            hubInput: state.basic.get('hubInput'),
            sb: state.basic.getIn(['frameState', 'sb']),
            sbTalk: state.basic.getIn(['frameState', 'sbTalk']),
            sbCall: state.basic.getIn(['frameState', 'sbCall']),
            phoneAddOn: state.basic.getIn(['frameState', 'phoneAddOn']),
            phoneAddOnTab: state.basic.getIn(['frameState', 'phoneAddOnTab']),
            deviceAddBox: state.basic.getIn(['frameState', 'deviceAddBox']),
            deviceWorkBox: state.basic.getIn(['frameState', 'deviceWorkBox']),
            deviceModal: state.basic.getIn(['frameState', 'deviceModal']),
            hubModal: state.basic.getIn(['frameState', 'hubModal'])
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch),
        })
    )(Main)
)