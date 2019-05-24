import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as deviceActions from 'store/modules/device';
import { DeviceWorkBox, DevicePallet } from 'components';
import { switchCase } from '@babel/types';

class DeviceWork extends Component {

    //텍스트 박스 타입에 따른 부가적인 정보 반환하기 위함
    _getInfoData = (type) => {

        let additionalInfo = null;

        switch(type){
            case 1: //버튼 일 때
                additionalInfo = {
                    buttons: [{
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    },
                    {
                        code: null,
                        name: null,
                        blockId: null
                    }]
                }
                break;
            default:
        }

        return additionalInfo;
    }

    //drag 하는 중에 수행
    _dragEnter = (e) => {
        e.preventDefault();
    }

    //drag 시작 시 발생, src는 이동되지 않음
    _drag = (e, type) => {
        const { deviceActions } = this.props;
        deviceActions.devTypeSelect({type: type}); //pallet에 추가하고자 하는 타입 임시 저장
        // var img = new Image();
        // img.src = siba
        // e.dataTransfer.setDragImage(img, 100, 100)
    }

    //drag가 종료되서 drag를 놓는 장소에 위치한 객체에서 발생
    _drop = (e) => {
        e.preventDefault();

        const { deviceActions, blockIdCounter, dragType } = this.props;
        const pos = this._getPosition(e);

        

        //pallet 리스트에 새로 놓인 텍스트 박스 정보 푸쉬
        deviceActions.devAddTextBox({
            top: pos.translateY,
            left: pos.translateX,
            id: blockIdCounter,
            type: dragType,
            info: this._getInfoData(dragType)
        });

        //블록 아이디 카운터 1값 증가
        deviceActions.devBlockIdCnt(blockIdCounter+1);
    }

    /* SVG전용 함수*/
    //drag가 종료되서 drag를 놓는 장소에 위치한 객체에서 발생(svg 전용)
    _dropSwap = (e, index) => {

        console.log('end')
        const { deviceActions } = this.props;

        //텍스트박스 Shadow를 사라지게
        deviceActions.devDragStart(null)
        deviceActions.devDragOver({index: index})

        document.removeEventListener('mousemove', this._handleMouseMove);
    }

    //drag 시작 시 발생, src를 새로운 위치로 이동(svg 전용)
    _dragSwap = (e, x, y, index) => {
        console.log('swap')

        const { deviceActions } = this.props;

        //텍스트박스 Shadow 나타나게
        deviceActions.devDragStart({
            top: y,
            left: x,
        })

        //박스 선택
        deviceActions.devBoxSelect({index: index});
        /* selectBox 예외가 종종 발생함 수정해야 */
        document.addEventListener('mousemove', this._handleMouseMove);
    }

    //drag 하는 box의 shadow를 표현하기 위해서 사용
    _handleMouseMove = (e) => {

        const { deviceActions, selectedBox } = this.props;
        const pos = this._getPosition(e);

        //선택한 텍스트 박스 새로운 위치로
        deviceActions.devTextboxLocChange({
            index: selectedBox.get('index'),
            top: pos.translateY,
            left: pos.translateX
        })

    };

    /* svg나 일반 DOM 공통 함수 */
    //스크롤한 x,y 상대값 알아내기 위해 사용
    _listenToScroll = (e) => {
        const palletContainer = e.currentTarget;
        const { deviceActions } = this.props;

        deviceActions.devPositionChange({
            top: palletContainer.scrollTop,
            left: palletContainer.scrollLeft
        })
    }

    _getPosition = (e) => {
        const { sb, scrollPos } = this.props;

        const scrollX = scrollPos.get('left'); //x축 스크롤
        const scrollY = scrollPos.get('top'); //y축 스크롤

        //텍스트 박스의 x,y 절반
        const itemXHalf = 60;
        const itemYHalf = 40;

        //실제 놓여야 하는 위치 계산
        const translateX = e.clientX - (sb ? 246 : 36) + scrollX - itemXHalf;
        const translateY = e.clientY - 103 + scrollY - itemYHalf;

        return {
            translateX: translateX,
            translateY: translateY
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        const {
            pallet,
            tempBox,
            selectedBox
        } = this.props;

        return (
            <Fragment>
                <DeviceWorkBox>
                    <DevicePallet
                        dragStart={this._drag}
                        dragOver={this._dragEnter}
                        drop={this._drop}
                        dragStartSwap={this._dragSwap}
                        dropSwap={this._dropSwap}
                        pallet={pallet}
                        scrollFunc={this._listenToScroll}
                        tempBox={tempBox}
                        selectedBox={selectedBox}>
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
            pallet: state.device.getIn(['selectedDevice','pallet']),
            blockIdCounter: state.device.get('blockIdCounter'),
            scrollPos: state.device.get('scrollPos'),
            tempBox: state.device.get('tempBox'),
            selectedBox: state.device.get('selectedBox'),
            sb: state.basic.getIn(['frameState', 'sb']),
            dragType: state.device.get('dragType'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(DeviceWork)
)