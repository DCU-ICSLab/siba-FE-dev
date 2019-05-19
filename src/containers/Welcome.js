import React, { Component, Fragment } from 'react';
import {
    SibaFrame,
} from 'components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';

class Welcome extends Component {

    _deviceAdd = () => {

    }

    _sibaTalk = (e) => {
        const { basicActions, sbTalk, sbCall } = this.props;
        if(!sbCall){
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

    componentDidMount() {
    }

    render() {
        const { sb, sbTalk, sbCall, phoneAddOn, phoneAddOnTab } = this.props;

        return (
            <Fragment>
                <SibaFrame
                    sbToggle={this._sbToggle}
                    sbState={sb}
                    sbTalk={sbTalk}
                    sbCall={sbCall}
                    sibaTalkFunc={this._sibaTalk}
                    sibaCallFunc={this._sibaCall}
                    phoneAddOn={phoneAddOn}
                    phoneAddOnFunc={this._phoneAddOnToggle}
                    phoneAddOnTab={phoneAddOnTab}
                    phoneAddOnTabFunc={this._phoneAddOnTabToggle}>
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
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Welcome)
)