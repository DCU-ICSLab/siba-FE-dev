import React, { Component, Fragment } from 'react';
import { 
    SideBar, 
    SibaContent, 
    Siba, 
    SibaFrame, 
    SibaHeader, 
    SibaPhone,
    ModalWrapper } from 'components';
import { DeviceWork } from 'containers';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import { ToastContainer, toast } from 'react-toastify';

var copyTimeout = null;

class Device extends Component {

    _deviceAdd = () => {

    }

    _sibaTalk = (e) => {
        const { basicActions, sbTalk, sbCall } = this.props;
        if (!sbCall) {
            basicActions.sbTalk(sbTalk);
        }
    }

    _sibaCall = (e) => {
        const { basicActions, sbCall, sbTalk } = this.props;
        basicActions.sbCall(!sbCall);
        basicActions.sbTalk(sbTalk);
        // basicActions.phoneAddOnToggle(true);
    }

    _sbToggle = () => {
        const { basicActions, sb } = this.props;
        basicActions.sbToggle(sb);
    }

    _phoneAddOnToggle = () => {
        const { basicActions, phoneAddOn } = this.props;
        basicActions.phoneAddOnToggle(!phoneAddOn);
    }

    _phoneAddOnTabToggle = () => {
        const { basicActions, phoneAddOnTab } = this.props;
        basicActions.phoneAddOnTabToggle(!phoneAddOnTab);
    }

    // _deviceAddBoxChange = () => {
    //     const { basicActions, deviceAddBox } = this.props;
    //     basicActions.deviceAddBoxChange(!deviceAddBox);
    // }

    _deviceWorkBoxChange = () => {
        const { basicActions, deviceWorkBox } = this.props;
        basicActions.deviceWorkBoxChange(!deviceWorkBox);
    }

    _modalChange = () => {
        const { basicActions, codeModal } = this.props;
        basicActions.changeCodeModal(!codeModal);
    }

    _copyChange = () => {
        const { basicActions } = this.props;
        if(copyTimeout) clearInterval(copyTimeout);
        basicActions.changeCopy(true);
        copyTimeout = setTimeout(()=>{
            basicActions.changeCopy(false);
        }, 4000);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if(copyTimeout) clearInterval(copyTimeout);
    }

    render() {
        const {
            sb,
            sbTalk,
            sbCall,
            phoneAddOn,
            phoneAddOnTab,
            deviceAddBox,
            deviceWorkBox,
            userState,
            codeModal,
            selectedDevice,
            copy,
            location } = this.props;

        const sbPos = {
            default: 273,
            change: 28
        }

        return (
            <Fragment>
                <ToastContainer
                    hideProgressBar={true}
                    autoClose={8000}
                    newestOnTop={true}
                />
                <SibaFrame>
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
                    <SibaContent
                        style={{
                            //marginLeft: sb ? '245px' : '35px',
                            marginLeft: sb ? sbPos.default : sbPos.change,
                            marginRight: '8px'
                            // left: sbState ? '240px' : '30px'
                        }}>
                        <DeviceWork location={location} sbPos={sbPos}/>
                    </SibaContent>
                    {/* <Siba sibaTalkFunc={this._sibaTalk} sbTalk={sbTalk} sibaCallFunc={this._sibaCall} />
                    {sbCall &&
                        <SibaPhone
                            phoneAddOn={phoneAddOn}
                            phoneAddOnFunc={this._phoneAddOnToggle}
                            phoneAddOnTab={phoneAddOnTab}
                            phoneAddOnTabFunc={this._phoneAddOnTabToggle} />} */}

                    <ModalWrapper
                    copy={copy}
                    copyChange={this._copyChange}
                    codeModal={codeModal} 
                    closeModal={this._modalChange} 
                    selectedDevice={selectedDevice}>
                    </ModalWrapper>
                </SibaFrame>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            sb: state.basic.getIn(['frameState', 'sb']),
            sbTalk: state.basic.getIn(['frameState', 'sbTalk']),
            sbCall: state.basic.getIn(['frameState', 'sbCall']),
            codeModal: state.basic.getIn(['frameState', 'codeModal']),
            copy: state.basic.getIn(['frameState', 'copy']),
            phoneAddOn: state.basic.getIn(['frameState', 'phoneAddOn']),
            phoneAddOnTab: state.basic.getIn(['frameState', 'phoneAddOnTab']),
            deviceAddBox: state.basic.getIn(['frameState', 'deviceAddBox']),
            deviceWorkBox: state.basic.getIn(['frameState', 'deviceWorkBox']),
            selectedDevice: state.device.get('selectedDevice'),
            userState: state.auth.get('userState'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Device)
)