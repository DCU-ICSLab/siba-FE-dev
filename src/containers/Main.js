import React, { Component, Fragment } from 'react';
import {
    SibaFrame, 
    SibaHeader, 
    HubPallet, 
    HubNav, 
    VirtualHub, 
    SideBar, 
    VirtualHubAddBtn,
    DeviceAddModalWrapper
} from 'components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import * as basicActions from 'store/modules/basic';
import * as vhubActions from 'store/modules/vhub';

class Main extends Component {

    _vhubCreate = () => {
        const { vhubActions } = this.props;
        vhubActions.vhubCreate();
    }

    _sbToggle = () => {
        const { basicActions, sb } = this.props;
        basicActions.sbToggle(sb);
    }

    _refreshAuthKey = () => {
        const { basicActions } = this.props;
        basicActions.getDeviceAuthKey();
    }

    _valueInput = (event) => {
        //validation 걸어야 함
        const { basicActions, regInput } = this.props;
        basicActions.deviceRegValueChange({ 
            key: event.target.name, 
            value: event.target.value 
        });

        if(event.target.name==='devName'){
            basicActions.deviceRegValueChange({ 
                key: 'devDefName', 
                value: event.target.value 
            }); 
        }
    }

    _deviceAddModalChange = (hubId) => {
        const { basicActions, deviceModal } = this.props;
        basicActions.deviceRegInputClear();
        basicActions.getDeviceAuthKey();
        basicActions.getVirtualHub({hubId: hubId});
        basicActions.changeDeviceAddModal(!deviceModal);
    }

    _createDevice = () => {
        const { authActions, regInput } = this.props;
        //디바이스 생성 요청 전송 이전에 validation 해야
        authActions.createDevice(regInput);
    }

    componentDidMount() {
        const { authActions } = this.props;
        authActions.kakaoAuth()
    }

    render() {
        const {
            sb,
            deviceAddBox,
            deviceWorkBox,
            deviceModal,
            regInput,
            userState } = this.props;

        return (
            <Fragment>
                <SibaFrame>
                    <SibaHeader userState={userState}></SibaHeader>
                    <SideBar
                        sbToggle={this._sbToggle}
                        sbState={sb}
                        deviceAddBoxOpenFunc={this._deviceAddBoxChange}
                        deviceAddBox={deviceAddBox}
                        deviceWorkBox={deviceWorkBox}
                        deviceWorkBoxChangeFunc={this._deviceWorkBoxChange}
                        hubList={userState.get('hubInfo')}>
                    </SideBar>
                    <HubPallet sbState={sb} size={userState.get('hubInfo').size}>
                        {
                            userState.get('hubInfo').map((hub, index) => 
                                <VirtualHub 
                                hub={hub} 
                                key={index}
                                deviceAddModalChange={this._deviceAddModalChange}
                                />
                            )
                        }
                        <VirtualHubAddBtn vhubCreate={this._vhubCreate}/>
                    </HubPallet>
                    {/* <HubNav></HubNav> */}
                </SibaFrame>
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
            userState: state.auth.get('userState'),
            regInput: state.basic.get('regInput'),
            sb: state.basic.getIn(['frameState', 'sb']),
            sbTalk: state.basic.getIn(['frameState', 'sbTalk']),
            sbCall: state.basic.getIn(['frameState', 'sbCall']),
            phoneAddOn: state.basic.getIn(['frameState', 'phoneAddOn']),
            phoneAddOnTab: state.basic.getIn(['frameState', 'phoneAddOnTab']),
            deviceAddBox: state.basic.getIn(['frameState', 'deviceAddBox']),
            deviceWorkBox: state.basic.getIn(['frameState', 'deviceWorkBox']),
            deviceModal: state.basic.getIn(['frameState', 'deviceModal']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch),
            vhubActions: bindActionCreators(vhubActions, dispatch),
        })
    )(Main)
)