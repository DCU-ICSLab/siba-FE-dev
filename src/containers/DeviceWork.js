import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as deviceActions from 'store/modules/device';
import { DeviceWorkBox, DevicePallet } from 'components';
import { Map, List } from 'immutable';
import { BUTTON_TYPE } from 'constants/index';

class DeviceWork extends Component {

    //텍스트 박스 타입에 따른 부가적인 정보 반환하기 위함
    _getInfoData = (type) => {

        let additionalInfo = null;

        switch (type) {
            case 1: //버튼 일 때
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: null,
                            name: null,
                            blockId: null
                        }),
                    ])
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
        deviceActions.devTypeSelect({ type: type }); //pallet에 추가하고자 하는 타입 임시 저장
    }

    //drag가 종료되서 drag를 놓는 장소에 위치한 객체에서 발생
    _drop = (e) => {
        e.preventDefault();

        const { deviceActions, blockIdCounter, dragType, pallet } = this.props;
        const pos = this._getPosition(e);

        const info = BUTTON_TYPE.find(x => x.type === dragType)

        //pallet 리스트에 새로 놓인 텍스트 박스 정보 푸쉬
        deviceActions.devAddTextBox({
            top: pos.translateY,
            left: pos.translateX,
            id: blockIdCounter,
            type: dragType,
            preorder: info.headText,
            postorder: info.footText,
            info: this._getInfoData(dragType)
        });

        //새로 드래그한 박스를 select box로 지정
        deviceActions.devBoxSelect({ index: pallet.size })

        //focus 박스 생성
        deviceActions.devDragStart({
            top: pos.translateY,
            left: pos.translateX
        })

        //블록 아이디 카운터 1값 증가
        deviceActions.devBlockIdCnt(blockIdCounter + 1);
    }

    /* SVG전용 함수*/
    //drag가 종료되서 drag를 놓는 장소에 위치한 객체에서 발생(svg 전용)
    _dropSwap = (e) => {
        //e.preventDefault(); //현재 이벤트의 기본 동작 중단
        //e.stopPropagation(); //이벤트 상위 DOM으로 전달 방지
        console.log('end')
        e.currentTarget.style.cursor = 'pointer';
        document.removeEventListener('mousemove', this._handleMouseMove);
    }

    //drag 시작 시 발생, src를 새로운 위치로 이동(svg 전용)
    _dragSwap = (e,x,y) => {
        console.log('mv')
        // deviceActions.devBoxSelect({ index: index })

        // //focus 박스 생성(tempBox 생성)
        // deviceActions.devDragStart({
        //     top: y - 20,
        //     left: x - 20
        // })

        // e.currentTarget.style.cursor = 'move'; //즉각적으로 pointer에서 move로 전환
        document.addEventListener('mousemove', this._handleMouseMove);
    }

    //drag 하는 box의 shadow를 표현하기 위해서 사용
    _handleMouseMove = (e) => {
        console.log('d')
        e.stopPropagation();
        e.preventDefault();
        const { deviceActions } = this.props;
        const pos = this._getPosition(e);

        //dragging 상태로 설정
        deviceActions.devDragStateChange({state: true});

        //focus 박스 이동(tempBox 값 변경)
        deviceActions.devDragStart({
            top: pos.translateY - 20,
            left: pos.translateX - 20
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

    //버튼 텍스트 박스에 버튼 추가
    _addBtnFunc = (e, index) => {
        e.stopPropagation();
        const { deviceActions } = this.props;
        deviceActions.devAddBtn({ index: index })
        deviceActions.devCopyBtn();
    }

    //텍스트 박스 선택 시 해당 정보 나오게 하기 위함
    _focus = (e, x, y, index) => {
        e.stopPropagation(); // 상위 DOM에 이벤트 전파 방지
        e.preventDefault(); //기본 동작 수행 방지
        const { deviceActions } = this.props;
        console.log('focus change')
        deviceActions.devBoxSelect({ index: index })

        //focus 박스 생성(tempBox 생성)
        deviceActions.devDragStart({
            top: y - 20,
            left: x - 20
        })

        e.currentTarget.style.cursor = 'move'; //즉각적으로 pointer에서 move로 전환
    }

    _focusClear = (e) => {
        console.log('focus clear')
        const { deviceActions, selectedBox, isDragging } = this.props;

        //이전에 dragging을 수행했다면
        if (isDragging) {
            const pos = this._getPosition(e);

            //isDragging 상태 해제
            deviceActions.devDragStateChange({state: false});

            //원본 텍스트 박스 새로운 위치로
            deviceActions.devTextboxLocChange({
                index: selectedBox.get('index'),
                top: pos.translateY - 20,
                left: pos.translateX - 20
            })

            //사본 텍스트 박스 새로운 위치로
            deviceActions.devBoxSelect({ index: selectedBox.get('index') });
        }

        //동일 텍스트 박스 선택 시 포커스 미해제
        //드래그 작업을 했던 것이 아니라면 포커스 해제
        else if(e.target.id === 'draggable'){
            deviceActions.devBoxUnSelect(); //selectedBox 제거
            deviceActions.devDragStart(null) //tempBox 제거
        }
    }

    //텍스트 박스 내부 정보를 변경할 때 사용하기 위함
    _changeTextBoxInfo = (e, id) => {
        if (this._validationTextBox(e.target.value)) {
            const { deviceActions } = this.props;
            this._resize_height(e);
            deviceActions.devInputChange({ key: e.target.name, text: e.target.value });
            deviceActions.devInputTargetChange({ key: e.target.name, text: e.target.value, id: id });
        }
    }

    _validationTextBox = (value) => {
        const MAX = 50;
        const MAX_ROW = 3;
        let length = value.length; //글자 수
        let rows = value.split('\n').length; //개행 갯수
        if (length > MAX) return false;
        else if (rows > MAX_ROW) return false;
        return true;
    }

    _resize_height = (e) => {
        console.log(e.currentTarget.scrollHeight);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        const pallet = nextProps.pallet !== this.props.pallet;
        const selectedBox = nextProps.selectedBox !== this.props.selectedBox;
        const tempBox = nextProps.tempBox !== this.props.tempBox;
        return pallet || selectedBox || tempBox;
    }

    render() {

        const {
            pallet,
            tempBox,
            selectedBox,
            isDragging
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
                        selectedBox={selectedBox}
                        addBtnFunc={this._addBtnFunc}
                        focus={this._focus}
                        changeTextBoxInfo={this._changeTextBoxInfo}
                        focusClear = {this._focusClear}
                        isDragging={isDragging}>
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
            pallet: state.device.getIn(['selectedDevice', 'pallet']),
            blockIdCounter: state.device.get('blockIdCounter'),
            scrollPos: state.device.get('scrollPos'),
            tempBox: state.device.get('tempBox'),
            selectedBox: state.device.get('selectedBox'),
            sb: state.basic.getIn(['frameState', 'sb']),
            dragType: state.device.get('dragType'),
            isDragging: state.device.get('isDragging'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(DeviceWork)
)