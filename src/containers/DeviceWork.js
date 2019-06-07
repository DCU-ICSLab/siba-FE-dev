import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as deviceActions from 'store/modules/device';
import { DeviceWorkBox, DevicePallet } from 'components';
import { Map, List } from 'immutable';
import { BUTTON_TYPE } from 'constants/index';
import DraggableLinker from 'components/TextBox/DraggableLinker';
import FocusBox from 'components/TextBox/FocusBox';
import TargetBox from 'components/TextBox/TargetBox';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';

class DeviceWork extends Component {

    //텍스트 박스 타입에 따른 부가적인 정보 반환하기 위함
    _getInfoData = (type) => {

        let additionalInfo = null;
        const { deviceActions, codeIdCounter } = this.props;

        switch (type) {
            case 1: //버튼 일 때
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            linker: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
                break;
            case 3: //Entry 일 때
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            linker: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
                break;
            case 5: //Entry 일 때
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            linker: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
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
        const { deviceActions } = this.props;
        const pos = this._getPosition(e);
        if (this.props.dragType === 4) {
            this._linkerDrop(pos);
        }
        else {
            this.props.dragType === 5 && deviceActions.setEntry();
            this._boxDrop(pos);
        }
    }

    _boxDrop = (pos) => {
        const { deviceActions, blockIdCounter, dragType, pallet } = this.props;
        const info = BUTTON_TYPE.find(x => x.type === dragType)
        const id = dragType !== 5 ? blockIdCounter : 0; //Entry 블록이면 ID는 0
        //pallet 리스트에 새로 놓인 텍스트 박스 정보 푸쉬
        deviceActions.devAddTextBox({
            top: pos.translateY,
            left: pos.translateX,
            id: id, 
            type: dragType,
            preorder: info.headText,
            postorder: info.footText,
            info: this._getInfoData(dragType)
        });

        //새로 드래그한 박스를 select box로 지정
        deviceActions.devBoxFocus({
            id: id,
            create: true,
            x: pos.translateX,
            y: pos.translateY,
        })

        //블록 아이디 카운터 1값 증가
        dragType !== 5 && deviceActions.devBlockIdCnt(blockIdCounter + 1);
    }

    _linkerDrop = (pos) => {
        const { deviceActions } = this.props;
        deviceActions.devAddLinker({
            m: {
                x: pos.translateX,
                y: pos.translateY + 50
            },
            z: {
                x: pos.translateX + 50,
                y: pos.translateY
            }
        })
    }

    // _linkerDragStart = (e) => {
    //     document.addEventListener('mousemove', this._handleMouseMove);
    // }

    // _linkerDragEnd = (e) => {
    //     document.removeEventListener('mousemove', this._handleMouseMove);
    // }

    /* SVG전용 함수*/
    //drag가 종료되서 drag를 놓는 장소에 위치한 객체에서 발생(svg 전용)
    _dropSwap = (e) => {
        if (e.target.id !== 'delete-btn') {
            console.log('end')
            e.currentTarget.style.cursor = 'pointer';
            document.removeEventListener('mousemove', this._handleMouseMove);
        }
    }

    //drag 시작 시 발생, src를 새로운 위치로 이동(svg 전용)
    _dragSwap = (e, x, y) => {
        if (e.target.id !== 'delete-btn') {
            console.log('mv')
            // e.currentTarget.style.cursor = 'move'; //즉각적으로 pointer에서 move로 전환
            document.addEventListener('mousemove', this._handleMouseMove);
        }
    }

    //drag 하는 box의 shadow를 표현하기 위해서 사용
    _handleMouseMove = (e) => {
        console.log('d')
        e.stopPropagation();
        e.preventDefault();
        const { deviceActions, selectedBox } = this.props;

        if (selectedBox) {
            const pos = this._getPosition(e);

            //dragging 상태로 설정
            deviceActions.devDragStateChange({ state: true });

            //focus 박스 이동
            deviceActions.devDragStart({
                x: pos.translateX - 20,
                y: pos.translateY - 20
            })
        }
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
        const { sb, scrollPos, sbPos } = this.props;

        const scrollX = scrollPos.get('left'); //x축 스크롤
        const scrollY = scrollPos.get('top'); //y축 스크롤

        //텍스트 박스의 x,y 절반
        const itemXHalf = 60;
        const itemYHalf = 40;

        //실제 놓여야 하는 위치 계산
        const translateX = e.clientX - (sb ? sbPos.default+1 : sbPos.change+1) + scrollX - itemXHalf;
        const translateY = e.clientY - 103 + scrollY - itemYHalf;

        return {
            translateX: translateX,
            translateY: translateY
        }
    }

    //버튼 텍스트 박스에 버튼 추가
    _addBtnFunc = (e, x, y, index) => {
        e.stopPropagation();
        const { deviceActions, codeIdCounter } = this.props;
        deviceActions.devBoxFocus({
            index: index,
            x: x - 20,
            y: y - 20
        })

        deviceActions.devAddBtn({
            index: index,
            code: codeIdCounter
        })
        deviceActions.devCopyBtn({ code: codeIdCounter });
        deviceActions.devCodeIdCnt(codeIdCounter + 1);
    }

    //버튼 텍스트 박스에 버튼 추가
    _addBtnFuncSide = (e, id) => {
        e.stopPropagation();
        const { deviceActions, codeIdCounter, targetedBox, pallet } = this.props;
        deviceActions.devAddBtnSide({
            id: id,
            code: codeIdCounter
        })

        /*targetedBox &&
            deviceActions.devTargetCopyLinker({
                parentId: selectedLinker.get('parentId'),
                code: selectedLinker.get('code')
            })

        selectedBox &&
            deviceActions.devSelectCopyLinker({
                parentId: selectedLinker.get('parentId'),
                code: selectedLinker.get('code')
            })*/

        deviceActions.devCopyBtn({ code: codeIdCounter });
        deviceActions.devCodeIdCnt(codeIdCounter + 1);

        const pos = pallet.getIn([pallet.findIndex(box => box.get('id') === id), 'pos'])

        //버튼에서 연결하는 linker가 있다면
        this._changeLinkerSrc({
            x: pos.get('left') + 20,
            y: pos.get('top') + 38,
        }, targetedBox)
    }

    _select = (targetedBox) => {
        const { deviceActions } = this.props;
        deviceActions.devBoxSelect(targetedBox);
    }

    _selectLinker = (e, x, y, id, code) => {
        const { deviceActions } = this.props;
        console.log('linker select')
        deviceActions.devSelectLinkerVisible(false);
        deviceActions.devSelectLinker({
            m: { x: x, y: y },
            z: { x: x, y: y },
            parentId: id,
            code: code,
            dragging: false
        });
    }

    _selectLinkerClear = () => {
        console.log('clear')
        const { deviceActions, selectedLinker } = this.props;
        selectedLinker && !selectedLinker.get('dragging') && deviceActions.devSelectLinkerClear()
    }

    _selectLinkerTarget = (e, x, y, id) => {
        const { deviceActions, selectedLinker } = this.props;
        const pos = this._getLinkerPosition(e);
        const my = selectedLinker.getIn(['m', 'y'])

        deviceActions.devSelectLinkerTarget({
            x: x + 54,
            y: my < pos.y ? y - 4 : y,
            blockId: id
        })
    }

    _selectLinkerTargetClear = (e) => {
        const { deviceActions } = this.props;
        deviceActions.devSelectLinkerTargetClear()
    }

    _draggableLinkerStart = (e) => {
        const { deviceActions } = this.props;
        console.log('linker start')
        deviceActions.devLinkerDragStart();
        document.addEventListener('mousemove', this._draggableLinkerMove);
    }

    _draggableLinkerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('ld')
        const { deviceActions, selectedLinker } = this.props;
        const x = selectedLinker.getIn(['m', 'x'])
        const y = selectedLinker.getIn(['m', 'y'])
        const pos = this._getLinkerPosition(e);
        if (pos.x <= x + 14 && pos.x >= x - 14 && pos.y <= y + 22 && pos.y >= y - 22)
            deviceActions.devSelectLinkerVisible(false)
        else
            deviceActions.devSelectLinkerVisible(true)

        deviceActions.devSelectLinkerChange({
            x: pos.x,
            y: y < pos.y ? pos.y - 5 : pos.y + 5
        });
    }

    _draggableLinkerEnd = (e) => {
        console.log('linker end')
        const { deviceActions, selectedLinker, linkerVisible, selectedLinkerTarget, targetedBox, selectedBox } = this.props;
        if (selectedLinker && linkerVisible) {
            const linker = {
                m: {
                    x: selectedLinker.getIn(['m', 'x']),
                    y: selectedLinker.getIn(['m', 'y']) + 11
                },
                z: selectedLinkerTarget ? {
                    x: selectedLinkerTarget.get('x'),
                    y: selectedLinkerTarget.get('y'),
                } : {
                        x: selectedLinker.getIn(['z', 'x']),
                        y: selectedLinker.getIn(['z', 'y'])
                    },
                parentId: selectedLinker.get('parentId'),
                code: selectedLinker.get('code'),
                childId: selectedLinkerTarget ? selectedLinkerTarget.get('blockId') : null,
            }

            deviceActions.devAddLinker(linker)

            deviceActions.devLinkerDockingSrc({
                id: selectedLinker.get('parentId'),
                code: selectedLinker.get('code'),
                childId: selectedLinkerTarget ? selectedLinkerTarget.get('blockId') : null,
            })

            if (selectedLinkerTarget) {
                console.log(selectedLinkerTarget.get('blockId'))
                console.log(selectedLinker.get('parentId'))
                deviceActions.devLinkerDockingDest({
                    id: selectedLinkerTarget.get('blockId'),
                    code: selectedLinker.get('code'),
                    parentId: selectedLinker.get('parentId'),
                })

                targetedBox &&
                    deviceActions.devTargetCopyLinker({
                        parentId: selectedLinker.get('parentId'),
                        code: selectedLinker.get('code')
                    })

                selectedBox &&
                    deviceActions.devSelectCopyLinker({
                        parentId: selectedLinker.get('parentId'),
                        code: selectedLinker.get('code')
                    })
            }

            deviceActions.devSelectLinkerClear()
            deviceActions.devSelectLinkerTargetClear()
        }
        document.removeEventListener('mousemove', this._draggableLinkerMove);
    }

    _getLinkerPosition = (e) => {
        const { sb, scrollPos, sbPos } = this.props;

        const scrollX = scrollPos.get('left'); //x축 스크롤
        const scrollY = scrollPos.get('top'); //y축 스크롤

        //실제 놓여야 하는 위치 계산
        return {
            x: e.clientX - (sb ? sbPos.default+1 : sbPos.change+1) + scrollX - 3,
            y: e.clientY - 123 + scrollY - 10
        }
    }

    //텍스트 박스 선택 시 해당 정보 나오게 하기 위함
    _focus = (e, x, y, id) => {
        e.stopPropagation(); // 상위 DOM에 이벤트 전파 방지
        e.preventDefault(); //기본 동작 수행 방지
        const { deviceActions } = this.props;
        console.log('focus change:'+id)
        deviceActions.devBoxFocus({
            id: id,
            x: x - 20,
            y: y - 20
        })

        e.currentTarget.style.cursor = 'move'; //즉각적으로 pointer에서 move로 전환
    }

    _focusClear = (e) => {
        console.log('focus clear')
        const { deviceActions, selectedBox, targetedBox, isDragging } = this.props;

        //이전에 dragging을 수행했다면
        if (isDragging && e.type === 'click') {
            const pos = this._getPosition(e);

            //isDragging 상태 해제
            deviceActions.devDragStateChange({ state: false });

            //원본 텍스트 박스 새로운 위치로
            deviceActions.devTextboxLocChange({
                id: selectedBox.get('id'),
                top: pos.translateY - 20,
                left: pos.translateX - 20
            })

            //사본 텍스트 박스 새로운 위치로
            deviceActions.devBoxFocus({
                id: selectedBox.get('id'),
                x: pos.translateX - 20,
                y: pos.translateY - 20,
            });

            //deviceActions.devBoxUnSelect();

            this._select(selectedBox);

            //버튼에서 연결하는 linker가 있다면
            this._changeLinkerSrc({
                x: pos.translateX,
                y: pos.translateY,
            }, selectedBox)

            //연결되어진 linker가 있다면
            this._changeLinkerDest({
                x: pos.translateX,
                y: pos.translateY,
            })
        }

        //클릭한 대상이 draggable 이라면
        else if (e.target.id === 'draggable') {
            deviceActions.devBoxUnSelect(); //selectedBox 제거
            this._select(); //targetedBox 제거
        }

        //클릭한 대상이 FocusBox라면
        else if (e.type === 'click' && e.target.id === 'focus') {
            console.log('clicking')
            this._select(selectedBox);
        }

        //클릭되어져 있지 않다면
        else if (selectedBox && !isDragging) {
            deviceActions.devBoxUnSelect(); //selectedBox 제거   
        }
    }

    _changeLinkerSrc = (pos, box) => {
        const { deviceActions } = this.props;
        console.log('change src')
        const buttons = box.getIn(['block', 'info', 'buttons'])
        const sz = buttons.size
        buttons.map((button, index) => {
            button.get('linker') && deviceActions.devLinkerSrcChange({
                code: button.get('code'),
                m: {
                    x: pos.x + 18 + index * 32,
                    y: pos.y + box.getIn(['block', 'height']) + 90 + 18 * (sz - 1),
                }
            })
        })
    }

    _changeLinkerDest = (pos) => {
        const { deviceActions, selectedBox } = this.props;
        console.log('change dest')
        selectedBox.getIn(['block', 'parentBox']).map(box => {
            deviceActions.devLinkerDestChange({
                code: box.get('code'),
                z: {
                    x: pos.x + 35,
                    y: pos.y - 25,
                }
            })
        })
    }

    //텍스트 박스 내부 정보를 변경할 때 사용하기 위함
    _changeTextBoxInfo = (e, id, name) => {
        if (this._validationTextBox(e.target.value)) {
            const { deviceActions } = this.props;
            this._resize_height(e, id, name);
            deviceActions.devInputChange({ key: e.target.name, text: e.target.value });
            deviceActions.devInputTargetChange({ key: e.target.name, text: e.target.value, id: id });
        }
    }

    //버튼 텍스트 박스의 버튼 정보들을 변경하기 위해 사용
    _devBtnInfoChange = (e, id, index) => {
        //14자 까지만 허용
        if (e.target.value.length <= 13) {
            const { deviceActions } = this.props;
            deviceActions.devBtnInfoChange({ key: e.target.name, index: index, text: e.target.value });
            deviceActions.devBtnInfoTargetChange({ key: e.target.name, text: e.target.value, id: id, index: index });
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

    _resize_height = (e, id, key) => {
        const { deviceActions } = this.props;
        const height = e.currentTarget.scrollHeight;
        //deviceActions.devTextBoxHeightChange({id: id, height: height, key: key})
        deviceActions.devTargetTextboxHeightChange({ key: key, height: height })
        console.log(height);
    }

    //텍스트 박스 삭제
    _deleteTextBox = (e, id) => {
        e.stopPropagation();

        const { deviceActions } = this.props;

        //연결되는 linker가 존재 한다면
        this._deleteLinkerDest()

        //연결하는 linker가 존재 한다면
        this._deleteLinkerSrc()

        deviceActions.devBoxUnSelect(); //사본 박스 제거(selectedBox 제거)
        deviceActions.devDeleteTextBox({ id: id }); //원본 박스 제거
        this._select();
    }

    _deleteLinkerSrc = () => {
        const { deviceActions, selectedBox } = this.props;
        const buttons = selectedBox.getIn(['block', 'info', 'buttons'])
        buttons.map((button, index) => {
            if (button.get('linker')) {
                deviceActions.devLinkerSrcDelete({
                    code: button.get('code'),
                    id: button.getIn(['linker', 'childId'])
                })

                deviceActions.devLinkerDelete({ code: button.get('code') })
            }
        })
    }

    _deleteLinkerDest = () => {
        const { deviceActions, selectedBox } = this.props;

        selectedBox.getIn(['block', 'parentBox']).map(box => {
            deviceActions.devLinkerDestDelete({
                code: box.get('code'),
                id: box.get('parentId')
            })

            deviceActions.devLinkerDelete({ code: box.get('code') })
        })
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        const pallet = nextProps.pallet !== this.props.pallet;
        const linkers = nextProps.linkers !== this.props.linkers;
        const selectedBox = nextProps.selectedBox !== this.props.selectedBox;
        const targetedBox = nextProps.targetedBox !== this.props.targetedBox;
        const linkerVisible = nextProps.linkerVisible !== this.props.linkerVisible;
        const selectedLinker = nextProps.selectedLinker !== this.props.selectedLinker;
        return pallet || selectedBox || targetedBox || linkers || selectedLinker || linkerVisible;
    }

    render() {

        const {
            pallet,
            selectedBox,
            targetedBox,
            isDragging,
            linkers,
            selectedLinker,
            linkerVisible,
            haveEntry
        } = this.props;

        return (
            <Fragment>
                <DeviceWorkBox>
                    <DevicePallet
                        dragStart={this._drag}
                        dragOver={this._dragEnter}
                        drop={this._drop}
                        scrollFunc={this._listenToScroll}
                        addBtnFuncSide={this._addBtnFuncSide}
                        changeTextBoxInfo={this._changeTextBoxInfo}
                        focusClear={this._focusClear}
                        devBtnInfoChange={this._devBtnInfoChange}
                        targetedBox={targetedBox}
                        draggableLinkerEnd={this._draggableLinkerEnd}
                        haveEntry={haveEntry}>

                        <g>
                            {pallet.map((boxInfo, index) => {
                                return (
                                    <TextBox
                                        boxInfo={boxInfo}
                                        key={boxInfo.get('id')}
                                        index={index}
                                        addBtnFunc={this._addBtnFunc}
                                        focus={this._focus} />)
                            })}
                        </g>

                        {
                            linkers.map((linkerInfo, index) => {
                                return (
                                    <Linker
                                        linkerInfo={linkerInfo}
                                        key={index}
                                    />
                                )
                            })}

                        {targetedBox &&
                            <TargetBox
                                dragStart={this._dragSwap}
                                dropSwap={this._dropSwap}
                                focusClear={this._focusClear}
                                targetedBox={targetedBox}
                                focus={this._focus}>
                            </TargetBox>}

                        {selectedBox &&
                            <FocusBox
                                selectedBox={selectedBox}
                                dragStart={this._dragSwap}
                                dropSwap={this._dropSwap}
                                isDragging={isDragging}
                                focusClear={this._focusClear}
                                selectLinker={this._selectLinker}
                                selectedLinker={selectedLinker}
                                selectLinkerTarget={this._selectLinkerTarget}
                                selectLinkerTargetClear={this._selectLinkerTargetClear}
                                deleteTextBox={this._deleteTextBox} />}

                        {selectedLinker &&
                            <DraggableLinker
                                linkerVisible={linkerVisible}
                                selectedLinker={selectedLinker}
                                selectLinkerClear={this._selectLinkerClear}
                                draggableLinkerStart={this._draggableLinkerStart} />}
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
            linkers: state.device.getIn(['selectedDevice', 'linkers']),
            blockIdCounter: state.device.getIn(['selectedDevice', 'blockIdCounter']),
            codeIdCounter: state.device.getIn(['selectedDevice', 'codeIdCounter']),
            scrollPos: state.device.get('scrollPos'),
            selectedBox: state.device.get('selectedBox'),
            selectedLinker: state.device.get('selectedLinker'),
            targetedBox: state.device.get('targetedBox'),
            sb: state.basic.getIn(['frameState', 'sb']),
            dragType: state.device.get('dragType'),
            isDragging: state.device.get('isDragging'),
            linkerVisible: state.device.get('linkerVisible'),
            selectedLinkerTarget: state.device.get('selectedLinkerTarget'),
            haveEntry: state.device.getIn(['selectedDevice', 'haveEntry']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(DeviceWork)
)