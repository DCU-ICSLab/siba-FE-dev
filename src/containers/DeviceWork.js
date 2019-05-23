import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as deviceActions from 'store/modules/device';
import { DeviceWorkBox, DevicePallet } from 'components';

class DeviceWork extends Component {

    _dragEnter = (e)=> {
        e.preventDefault();
    }

    _drag = (e) => {
        console.log(e);
    }

    _drop = (e) => {
        const { deviceActions } = this.props;
        e.preventDefault();
        
        const translateX = e.clientX-245;
        const translateY = e.clientY-103;

        deviceActions.devAddTextBox({
            top: translateY,
            left: translateX
        });
    }

    componentDidMount() {
    }

    render() {

        const {
            pallet } = this.props;

        return (
            <Fragment>
                <DeviceWorkBox>
                    <DevicePallet 
                    dragStart={this._drag}
                    dragOver={this._dragEnter}
                    drop={this._drop}
                    pallet={pallet}>
                    </DevicePallet>
                </DeviceWorkBox>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            pallet: state.device.get('pallet'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(DeviceWork)
)