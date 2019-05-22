import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import { DeviceWorkBox, DevicePallet } from 'components';

class DeviceWork extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <Fragment>
                <DeviceWorkBox>
                    <DevicePallet></DevicePallet>
                </DeviceWorkBox>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(DeviceWork)
)