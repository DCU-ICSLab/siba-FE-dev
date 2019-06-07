import React, { Component, Fragment } from 'react';
import {
    SibaFrame, SibaHeader, HubPallet, HubNav, VirtualHub, SideBar, VirtualHubAddBtn
} from 'components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import * as basicActions from 'store/modules/basic';

class Main extends Component {

    _sbToggle = () => {
        const { basicActions, sb } = this.props;
        basicActions.sbToggle(sb);
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
                        deviceWorkBoxChangeFunc={this._deviceWorkBoxChange}>
                    </SideBar>
                    <HubPallet sbState={sb}>
                        <VirtualHub>

                        </VirtualHub>
                        <VirtualHubAddBtn/>
                    </HubPallet>
                    {/* <HubNav></HubNav> */}
                </SibaFrame>
            </Fragment>
        )
    }
}

export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            userState: state.auth.get('userState'),
            sb: state.basic.getIn(['frameState', 'sb']),
            sbTalk: state.basic.getIn(['frameState', 'sbTalk']),
            sbCall: state.basic.getIn(['frameState', 'sbCall']),
            phoneAddOn: state.basic.getIn(['frameState', 'phoneAddOn']),
            phoneAddOnTab: state.basic.getIn(['frameState', 'phoneAddOnTab']),
            deviceAddBox: state.basic.getIn(['frameState', 'deviceAddBox']),
            deviceWorkBox: state.basic.getIn(['frameState', 'deviceWorkBox']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch),
        })
    )(Main)
)