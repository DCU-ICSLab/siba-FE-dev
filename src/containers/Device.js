import React, { Component, Fragment } from 'react';
import { SideBar, SibaContent, Siba, DeviceAddBox, SibaFrame, SibaHeader, SibaPhone } from 'components';
import { DeviceWork } from 'containers';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';

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

    _deviceAddBoxChange = () => {
        const { basicActions, deviceAddBox } = this.props;
        basicActions.deviceAddBoxChange(!deviceAddBox);
    }

    _deviceWorkBoxChange = () => {
        const { basicActions, deviceWorkBox } = this.props;
        basicActions.deviceWorkBoxChange(!deviceWorkBox);
    }

    componentDidMount() {
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
            location } = this.props;

        const sbPos = {
            default: 283,
            change: 33
        }

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
                        deviceWorkBoxChangeFunc={this._deviceWorkBoxChange}>
                    </SideBar>
                    <SibaContent
                        style={{
                            //marginLeft: sb ? '245px' : '35px',
                            marginLeft: sb ? sbPos.default : sbPos.change,
                            marginRight: '15px'
                            // left: sbState ? '240px' : '30px'
                        }}>
                        {deviceAddBox && <DeviceAddBox deviceAddBoxChangeFunc={this._deviceAddBoxChange}></DeviceAddBox>}
                        <DeviceWork location={location} sbPos={sbPos}/>
                    </SibaContent>
                    <Siba sibaTalkFunc={this._sibaTalk} sbTalk={sbTalk} sibaCallFunc={this._sibaCall} />
                    {sbCall &&
                        <SibaPhone
                            phoneAddOn={phoneAddOn}
                            phoneAddOnFunc={this._phoneAddOnToggle}
                            phoneAddOnTab={phoneAddOnTab}
                            phoneAddOnTabFunc={this._phoneAddOnTabToggle} />}
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
            phoneAddOn: state.basic.getIn(['frameState', 'phoneAddOn']),
            phoneAddOnTab: state.basic.getIn(['frameState', 'phoneAddOnTab']),
            deviceAddBox: state.basic.getIn(['frameState', 'deviceAddBox']),
            deviceWorkBox: state.basic.getIn(['frameState', 'deviceWorkBox']),
            userState: state.auth.get('userState'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Device)
)