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
    DeviceListModal,
    HubAddModalWrapper
} from 'components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import * as basicActions from 'store/modules/basic';
import * as hubActions from 'store/modules/hub';
import * as deviceActions from 'store/modules/device';
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
            axios.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;
            authActions.kakaoAuth().then(() => {

                //연결이 안된 경우에만 수행
                if(stompClient===null)
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
            stompClient.subscribe(`/topic/device-conn-${userState.getIn(['user', 'userId'])}`, this._showDeivceStateChange);
            stompClient.subscribe(`/topic/test-finish-${userState.getIn(['user', 'userId'])}`, this._showDeivceTestStateChange);
        });
    }

    _showDeivceTestStateChange = (message) => {
        const msg = JSON.parse(message.body)
        const { deviceActions } = this.props;
        deviceActions.updateTestLog({
            testId:msg.testId,
            finishedAt:msg.finishedAt,
            durationAt:msg.duration,
            status:msg.status
        });

        toast(this._generateToastMessage({
            message: `#${msg.testId} 테스트가 종료되었습니다.`
        }), {
                className: 'toast',
                bodyClassName: 'toast',
            })
    }

    _showDeivceStateChange = (message) => {
        const { deviceActions, selectedDevice } = this.props;
        const msg = JSON.parse(message.body)
        const isDeviceConnect = msg.msgType === 1;

        const outputMessage = isDeviceConnect ? `디바이스가 연결되었습니다. \n ${msg.mac}` : `디바이스가 제거되었습니다. \n ${msg.mac}`

        if(isDeviceConnect){

            //현재 디바이스 개발 페이지에 진입해 있고 개발하는 디바이스가 연결된 디바이스랑 일치한다면
            if(selectedDevice && selectedDevice.get('vHubId')===msg.devId){
                console.log('create specific')
                deviceActions.pushConnectedDev({
                    devMac: msg.mac
                })
            }
        }
        else{

            //현재 디바이스 개발 페이지에 진입해 있고 개발하는 디바이스가 연결이 끊긴 디바이스랑 일치한다면
            if(selectedDevice && selectedDevice.get('devId')===msg.devId){
                console.log('delete specific')
                deviceActions.deleteConnectedDev({
                    devMac: msg.mac
                })
            }
        }

        this.props.hubActions.pushHubClog({
            clog_res: msg.msgType,
            dev_mac: msg.mac
        })

        toast(this._generateToastMessage({
            message: outputMessage
        }), {
                className: 'toast',
                bodyClassName: 'toast',
            })
    }

    _showHubStateChange = (message) => {

        const { authActions, deviceActions, selectedDevice } = this.props;

        const msg = JSON.parse(message.body)
        const isHubConnect = msg.msgType === 1;

        //허브 연결이 끊기면
        if(!isHubConnect){
            selectedDevice && console.log(selectedDevice.toJS())
            if(selectedDevice && selectedDevice.get('vHubId')===msg.hubId){
                console.log('clear all')
                deviceActions.connectedDevAllClear();
            }
        }

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

    _deviceListModalChange = (hubId, limitSize) => {
        const { basicActions, deviceListModal} = this.props;
        if(!deviceListModal){
            this._selectDevRepoClear(hubId, limitSize)
        }
        basicActions.deviceListModalChange(deviceListModal);
    }

    _createDevice = () => {
        const { authActions, regInput, deviceModal } = this.props;
        //디바이스 생성 요청 전송 이전에 validation 해야
        authActions.createDevice(regInput);
        basicActions.changeDeviceAddModal(!deviceModal);
    }

    _linkDevicePage = (devId, dev) => {
        console.log(dev)
        this.props.history.push({
            pathname: `/device/${devId}`,
            state: { dev: dev }
        })
    }

    _fold = (hubId) => {
        const { authActions } = this.props; 
        authActions.fold({hubId: hubId})
    }

    _selectDevRepo = (idx, dev, flag=false) => {
        const { authActions, tempDevRepo } = this.props; 
        const hubId = tempDevRepo.get('hubId')
        authActions.selectDevRepo({
            devId: idx,
            hubId: !flag ? hubId : null
        })
        if(!flag){
            authActions.pushDevRepo(dev)
        }
        else{
            authActions.popDevRepo({
                devId: dev.get('devId')
            })
        }
    }

    //DeviceListModal을 열 때 초기화 작업 수행 
    _selectDevRepoClear = (hubId, limitSize) => {
        const { authActions, deviceInfo } = this.props; 

        const list = deviceInfo.filter((dev)=>{
            return dev.get('vhubId')===null
        })

        console.log(limitSize)

        authActions.selectDevRepoClear({
            hubId: hubId,
            limitSize: limitSize,
            list: list
        })
    }

    _linkHubAndRepo = () => {
        const { authActions, tempDevRepo } = this.props; 
        const hubId = tempDevRepo.get('hubId')
        const bucket = tempDevRepo.get('bucket');
        authActions.linkHubAndRepo(hubId,bucket).then(res=>{
            bucket.map(item=>authActions.repoLink({
                devId: item.get('devId'),
                hubId: hubId
            }))
        })
        this._deviceListModalChange()
    }

    _repoDeletion = (vhubId, devId) => {
        const { authActions } = this.props; 
        authActions.repoDeletion(vhubId, devId).then(res=>{
            authActions.repoUnlink({devId: devId})
        })
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
            hubInput,
            deviceListModal,
            tempDevRepo,
            location } = this.props;


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
                        deviceAddBox={deviceAddBox}
                        deviceWorkBox={deviceWorkBox}
                        hubList={userState.get('hubInfo')}
                        location={location}>
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
                                    redirectDevicePage={this._linkDevicePage}
                                    deviceListModalChange={this._deviceListModalChange}
                                    repoDeletion={this._repoDeletion}
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
                <DeviceListModal
                    deviceModal={deviceListModal}
                    deviceAddModalChange={this._deviceListModalChange}
                    deviceInfo={tempDevRepo.get('list')}
                    selectDevRepo={this._selectDevRepo}
                    linkHubAndRepo={this._linkHubAndRepo}
                    limitSize={tempDevRepo.get('limitSize')}
                    listSize={tempDevRepo.get('list').size}
                >
                </DeviceListModal>
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
            deviceListModal: state.basic.getIn(['frameState', 'deviceListModal']),
            hubModal: state.basic.getIn(['frameState', 'hubModal']),
            deviceInfo: state.auth.getIn(['userState', 'deviceInfo']),
            tempDevRepo: state.auth.get('tempDevRepo'),
            selectedDevice: state.device.get('selectedDevice'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch),
            hubActions: bindActionCreators(hubActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(Main)
)