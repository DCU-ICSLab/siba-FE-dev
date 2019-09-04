import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as deviceActions from 'store/modules/device';
import { DeviceWorkBox, DevicePallet, SensingPallet } from 'components';
import { TestWork } from 'containers';
import { Map, List } from 'immutable';
import { BUTTON_TYPE } from 'constants/index';
import DraggableLinker from 'components/TextBox/DraggableLinker';
import FocusBox from 'components/TextBox/FocusBox';
import TargetBox from 'components/TextBox/TargetBox';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';
import DataModelerWork from './DataModelerWork';

const saveResTimer = null;

class DeviceWork extends Component {

    //텍스트 박스 타입에 따른 부가적인 정보 반환하기 위함
    _getInfoData = (type) => {

        let additionalInfo = null;
        const { deviceActions, codeIdCounter, eventCodeIdCounter } = this.props;

        switch (type) {
            case 1: //버튼 일 때
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            linker: null,
                            isSpread: false,
                            idx: 0,
                            type: '1',
                            eventCode: eventCodeIdCounter
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
                deviceActions.devEventCodeIdCnt(eventCodeIdCounter + 1);
                break;
            case 2: //dynamic
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            idx: 0,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
                break;
            case 3: //time
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            idx: 0,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
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
                            idx: 0,
                            type: 1,
                            linker: null,
                            type: '1',
                            isSpread: false,
                            eventCode: eventCodeIdCounter
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 1);
                deviceActions.devEventCodeIdCnt(eventCodeIdCounter + 1);
                break;
            case 6: //select
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            idx: 0,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                        Map({
                            code: codeIdCounter + 1,
                            name: '',
                            idx: 1,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 2);
                break;
            case 7: //judge
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            idx: 0,
                            type: '7',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                        Map({
                            code: codeIdCounter + 1,
                            name: '',
                            idx: 1,
                            type: '7',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 2);
                break;
            case 8: //select
                additionalInfo = {
                    buttons: List([
                        Map({
                            code: codeIdCounter,
                            name: '',
                            idx: 0,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                        Map({
                            code: codeIdCounter + 1,
                            name: '',
                            idx: 1,
                            type: '0',
                            linker: null,
                            isSpread: true,
                            eventCode: null
                        }),
                    ])
                }
                deviceActions.devCodeIdCnt(codeIdCounter + 2);
                break;
            default:
                break;
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
            y: pos.translateY,
            x: pos.translateX,
            id: id,
            type: dragType,
            preorder: info.headText,
            postorder: info.footText,
            info: this._getInfoData(dragType),
            rules: List([])
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
        const translateX = e.clientX - (sb ? sbPos.default + 1 + sbPos.left : sbPos.change + 1 + sbPos.left) + scrollX - itemXHalf;
        const translateY = e.clientY - 103 + scrollY - itemYHalf;

        return {
            translateX: translateX,
            translateY: translateY
        }
    }

    //버튼 텍스트 박스에 버튼 추가
    _addBtnFunc = (e, x, y, index) => {
        e.stopPropagation();
        const { deviceActions, codeIdCounter, eventCodeIdCounter } = this.props;
        deviceActions.devBoxFocus({
            index: index,
            x: x - 20,
            y: y - 20
        })

        deviceActions.devAddBtn({
            index: index,
            code: codeIdCounter,
            eventCode: eventCodeIdCounter
        })

        deviceActions.devEventCodeIdCnt(eventCodeIdCounter + 1);

        deviceActions.devCopyBtn({ code: codeIdCounter });
        deviceActions.devCodeIdCnt(codeIdCounter + 1);
    }

    //버튼 텍스트 박스에 버튼 추가
    _addBtnFuncSide = (e, id) => {
        e.stopPropagation();
        const { deviceActions, codeIdCounter, targetedBox, pallet, eventCodeIdCounter } = this.props;
        console.log('eventcode:', eventCodeIdCounter)
        deviceActions.devAddBtnSide({
            id: id,
            code: codeIdCounter,
            eventCode: eventCodeIdCounter
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

        deviceActions.devCopyBtn({ code: codeIdCounter, eventCode: eventCodeIdCounter });
        deviceActions.devCodeIdCnt(codeIdCounter + 1);
        deviceActions.devEventCodeIdCnt(eventCodeIdCounter + 1);

        const pos = pallet.getIn([pallet.findIndex(box => box.get('id') === id), 'pos'])

        //버튼에서 연결하는 linker가 있다면
        this._changeLinkerSrc({
            x: pos.get('x') + 20,
            y: pos.get('y') + 38,
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
        deviceActions.devLinkerDragStart();
        document.addEventListener('mousemove', this._draggableLinkerMove);
    }

    _draggableLinkerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { deviceActions, selectedLinker } = this.props;
        const x = selectedLinker.getIn(['m', 'x'])
        const y = selectedLinker.getIn(['m', 'y'])
        const pos = this._getLinkerPosition(e);
        if (pos.x <= x + 14 && pos.x >= x - 14 && pos.y <= y + 22 && pos.y >= y - 22)
            deviceActions.devSelectLinkerVisible(false)
        else
            deviceActions.devSelectLinkerVisible(true)

        //링크의 좌우 대각선이 길어지면 놓여지는 지점에 path랑 마우스가 오버랩됨
        //이를 방지하기 위해 가감하여 계산
        deviceActions.devSelectLinkerChange({
            x: x < pos.x ? pos.x - 5 : pos.x + 5,
            y: y < pos.y ? pos.y - 5 : pos.y + 5
        });
    }

    //링킹 종료 시 호출
    _draggableLinkerEnd = (e) => {
        console.log('linker end')
        const { deviceActions, selectedLinker, linkerVisible, selectedLinkerTarget, targetedBox, selectedBox } = this.props;
        if (selectedLinker && linkerVisible) {

            //링커 추가 작업은 하위 박스가 선택되어졌을 때만 가능하다.
            if (selectedLinkerTarget) {
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
            x: e.clientX - (sb ? sbPos.default + 1 + sbPos.left : sbPos.change + 1 + sbPos.left) + scrollX - 3,
            y: e.clientY - 123 + scrollY - 10
        }
    }

    //텍스트 박스 선택 시 해당 정보 나오게 하기 위함
    _focus = (e, x, y, id) => {
        e.stopPropagation(); // 상위 DOM에 이벤트 전파 방지
        e.preventDefault(); //기본 동작 수행 방지
        const { deviceActions } = this.props;
        console.log('focus change:' + id)
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
                y: pos.translateY - 20,
                x: pos.translateX - 20
            })

            //사본 텍스트 박스 새로운 위치로
            deviceActions.devBoxFocus({
                id: selectedBox.get('id'),
                x: pos.translateX - 20,
                y: pos.translateY - 20,
            });

            //deviceActions.devBoxUnSelect();

            this._select(selectedBox);

            //버튼에서 연결하는 linker가 있다면(select가 아닌 경우)
            //if(selectedBox.get('type')!==6){
            this._changeLinkerSrc({
                x: pos.translateX,
                y: pos.translateY,
            }, selectedBox)
            //}

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
        //console.log('change src')
        const buttons = box.getIn(['block', 'info', 'buttons'])
        const type = box.getIn(['block', 'type']);
        const sz = buttons.size
        const dynamicHeight = box.getIn(['block', 'footRow']) * 20 + box.getIn(['block', 'headRow']) * 20
        //버튼 박스, 엔트리 박스인 경우
        if (type == 1 || type == 5) {
            buttons.map((button, index) => {
                button.get('linker') && deviceActions.devLinkerSrcChange({
                    code: button.get('code'),
                    m: {
                        x: pos.x + 18 + index * 32,
                        y: pos.y + dynamicHeight + 70 + 18 * (sz - 1),
                    }
                })
            })
        }
        else if(type==7){
            buttons.map((button, index) => {
                if(index==1)
                    index=5
                button.get('linker') && deviceActions.devLinkerSrcChange({
                    code: button.get('code'),
                    m: {
                        x: pos.x + 18 + index * 32,
                        y: pos.y + 54 + 26
                    }
                })
            })
        }
        else {
            const button = box.getIn(['block', 'info', 'buttons', 0])
            button.get('linker') && deviceActions.devLinkerSrcChange({
                code: button.get('code'),
                m: {
                    x: pos.x + 18 + 2 * 32,
                    y: pos.y + dynamicHeight + 55,
                }
            })
        }
    }

    _changeLinkerDest = (pos) => {
        const { deviceActions, selectedBox } = this.props;
        //console.log('change dest')
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

    _changeJudgeInfo = (item, id) => {
        const { deviceActions } = this.props;
        //사본 변경
        deviceActions.devInputChange({ key: 'preorder', text: item });

        //원본 변경
        deviceActions.devInputJudgeChange({
            key: 'preorder',
            text: item,
            id: id,
        });
    }

    //텍스트 박스 내부 정보를 변경할 때 사용하기 위함
    _changeTextBoxInfo = (e, id, name, location, row) => {
        //if (this._validationTextBox(e.target.value)) {
        this._resize_height(e, id, name, location, row);
        //}
    }

    _resize_height = (event, id, key, location, row) => {
        const { deviceActions, targetedBox, selectedBox } = this.props;
        const textareaLineHeight = 20;
        const minRows = 1
        const maxRows = 4

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows > maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
            return;
        }

        const changeRow = currentRows < maxRows ? currentRows : maxRows

        //deviceActions.devTargetTextboxHeightChange({ key: key, height: height })

        //사본 변경
        deviceActions.devInputChange({ key: event.target.name, text: event.target.value });
        deviceActions.devInputRowChange({ key: location, row: changeRow });

        //원본 변경
        deviceActions.devInputTargetChange({
            key: event.target.name,
            text: event.target.value,
            id: id,
            rowName: location,
            row: changeRow
        });

        //row값이 변경되었다면 linker m position 변경
        if (row != currentRows) {

            //focus 박스가 존재한다면
            if (selectedBox) {
                deviceActions.devInputSelectedRowChange({
                    key: location,
                    row: changeRow
                })
            }
            //버튼에서 연결하는 linker가 있다면
            this._changeLinkerSrc({
                x: targetedBox.get('x') + 20,
                y: targetedBox.get('y') + (row < currentRows ? 40 : 0)
            }, targetedBox)
        }
    }

    //버튼 텍스트 박스의 버튼 정보들을 변경하기 위해 사용
    _devBtnInfoChange = (e, id, index) => {
        //13자 까지만 허용
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

    _deleteButton= (e, index) => {
        e.stopPropagation();
        /*const { deviceActions } = this.props;
        //연결되는 linker가 존재 한다면
        this._deleteLinkerDest()

        deviceActions.deleteButtonTargeted()
        deviceActions.deleteButtonSrc()

        //연결하는 linker가 존재 한다면
        this._deleteLinkerSrc()*/
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

    _saveDeviceTextBoxGraph = () => {
        const { deviceActions, selectedDevice, devId } = this.props;
        deviceActions.saveDeviceTextBoxGraph(devId, selectedDevice)
        this._saveResChange(true)
    }

    _deployDeviceTextBoxGraph = () => {
        //저장이 안됬으면 수행불가능하게 만들어야
        const { deviceActions, devId } = this.props;
        deviceActions.deployDeviceTextBoxGraph(devId);
        this._deployResChange(true)
    }

    _modalChange = () => {
        const { basicActions, codeModal } = this.props;
        basicActions.changeCodeModal(!codeModal);
    }

    _pageSwitching = (page) => {
        const { deviceActions } = this.props;
        deviceActions.pageSwitching({ page: page })
        if (page === 1)
            deviceActions.clearSelectAndTaget();
    }

    _buttonTypeChange = (e, idx) => {
        const { deviceActions, targetedBox, tempButton } = this.props;

        //기존 버튼이 조회-디바이스 또는 조회-센싱이였다면
        if (tempButton.get('type') === '3' || tempButton.get('type') === '4') {
            //조회-디바이스 또는 조회-센싱으로 변경한다면
            if (!(e.target.value === '3' || e.target.value === '4')) {

                //childBox가 있는지 검사

            }
        }

        deviceActions.devBtnSideTypeChange({
            idx: idx,
            id: targetedBox.getIn(['block', 'id']),
            type: e.target.value
        });
        deviceActions.devCopyBtnType({
            idx: idx,
            type: e.target.value
        })
        this._typeChange(false)
        deviceActions.setTempBtn(
            {
                childId: tempButton.get('childId'),
                eventCode: tempButton.get('eventCode'),
                name: tempButton.get('name'),
                type: e.target.value,
                idx: tempButton.get('idx'),
            }
        )
    }

    _addonOpen = (arg) => {
        const { deviceActions } = this.props;
        if (arg) deviceActions.tpChange(false)
        deviceActions.addonOpen(arg)
    }

    _setTempBtn = (btn) => {
        const { deviceActions } = this.props;
        deviceActions.setTempBtn(btn)
    }

    _tempBtnClear = () => {
        const { deviceActions } = this.props;
        deviceActions.tempBtnClear();
    }

    _typeChange = (arg) => {
        const { deviceActions } = this.props;
        deviceActions.tpChange(arg)
    }

    _findChild = (arg) => {
        const { deviceActions } = this.props;
        deviceActions.findChild(arg)
    }

    _saveResChange = (arg) => {
        const { deviceActions } = this.props;
        deviceActions.saveResChange(arg)
        if (arg) {
            setTimeout(() => deviceActions.saveResChange(false), 4000)
        }
    }

    _deployResChange = (arg) => {
        const { deviceActions } = this.props;
        deviceActions.deployResChange(arg)
        if (arg) {
            setTimeout(() => deviceActions.deployResChange(false), 4000)
        }
    }

    componentDidMount() {
        const { deviceActions, location } = this.props;
        deviceActions.pageSwitching({ page: 1 })
        if (location.state.dev) {
            deviceActions.getDeviceInfo(location.state.dev.get('devId'));
        }
        //deviceActions.setSaveGraph({graph: this.props.selectedDevice})
    }

    componentWillUnmount() {
        if (saveResTimer) clearTimeout(saveResTimer);
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        const pallet = nextProps.pallet !== this.props.pallet;
        const linkers = nextProps.linkers !== this.props.linkers;
        const selectedBox = nextProps.selectedBox !== this.props.selectedBox;
        const targetedBox = nextProps.targetedBox !== this.props.targetedBox;
        const linkerVisible = nextProps.linkerVisible !== this.props.linkerVisible;
        const selectedLinker = nextProps.selectedLinker !== this.props.selectedLinker;
        return pallet || selectedBox || targetedBox || linkers || selectedLinker || linkerVisible;
    }*/

    render() {

        const {
            pallet,
            selectedBox,
            targetedBox,
            isDragging,
            linkers,
            selectedLinker,
            linkerVisible,
            haveEntry,
            vHubId,
            devName,
            page,
            isAddOn,
            tempButton,
            isTypeChange,
            childBox,
            isSaveRes,
            isDeployRes
        } = this.props;

        return (
            <Fragment>
                <DeviceWorkBox vHubId={vHubId} devName={devName} pageSwitching={this._pageSwitching} page={page}>
                    {page === 1 && <DevicePallet
                        findChild={this._findChild}
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
                        haveEntry={haveEntry}
                        saveDeviceTextBoxGraph={this._saveDeviceTextBoxGraph}
                        deployDeviceTextBoxGraph={this._deployDeviceTextBoxGraph}
                        modalChange={this._modalChange}
                        buttonTypeChange={this._buttonTypeChange}
                        addonOpen={this._addonOpen}
                        isAddOn={isAddOn}
                        setTempBtn={this._setTempBtn}
                        tempButton={tempButton}
                        tempBtnClear={this._tempBtnClear}
                        isTypeChange={isTypeChange}
                        typeChange={this._typeChange}
                        childBox={childBox}
                        isSaveRes={isSaveRes}
                        isDeployRes={isDeployRes}
                        changeJudgeInfo={this._changeJudgeInfo}
                        deleteButton={this._deleteButton}
                    >

                        <g>
                            {pallet.map((boxInfo, index) => {
                                return (
                                    <TextBox
                                        isSelect={false}
                                        boxInfo={boxInfo}
                                        key={boxInfo.get('id')}
                                        index={index}
                                        addBtnFunc={this._addBtnFunc}
                                        focus={this._focus}
                                        isEvent={true} 
                                        isDragging={isDragging}/>)
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
                    </DevicePallet>}

                    {page === 2 && <DataModelerWork></DataModelerWork>}

                    {page === 3 && <TestWork></TestWork>}
                </DeviceWorkBox>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            page: state.device.get('page'),
            isAddOn: state.device.get('isAddOn'),
            selectedDevice: state.device.get('selectedDevice'),
            devAuthKey: state.device.getIn(['selectedDevice', 'devAuthKey']),
            devId: state.device.getIn(['selectedDevice', 'devId']),
            vHubId: state.device.getIn(['selectedDevice', 'vHubId']),
            devName: state.device.getIn(['selectedDevice', 'devName']),
            pallet: state.device.getIn(['selectedDevice', 'pallet']),
            linkers: state.device.getIn(['selectedDevice', 'linkers']),
            blockIdCounter: state.device.getIn(['selectedDevice', 'blockIdCounter']),
            codeIdCounter: state.device.getIn(['selectedDevice', 'codeIdCounter']),
            eventCodeIdCounter: state.device.getIn(['selectedDevice', 'eventCodeIdCounter']),
            scrollPos: state.device.get('scrollPos'),
            selectedBox: state.device.get('selectedBox'),
            selectedLinker: state.device.get('selectedLinker'),
            targetedBox: state.device.get('targetedBox'),
            sb: state.basic.getIn(['frameState', 'sb']),
            codeModal: state.basic.getIn(['frameState', 'codeModal']),
            dragType: state.device.get('dragType'),
            isDragging: state.device.get('isDragging'),
            linkerVisible: state.device.get('linkerVisible'),
            selectedLinkerTarget: state.device.get('selectedLinkerTarget'),
            haveEntry: state.device.getIn(['selectedDevice', 'haveEntry']),
            tempButton: state.device.get('tempButton'),
            isTypeChange: state.device.get('isTypeChange'),
            childBox: state.device.get('childBox'),
            isSaveRes: state.device.get('isSaveRes'),
            isDeployRes: state.device.get('isDeployRes'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            deviceActions: bindActionCreators(deviceActions, dispatch),
        })
    )(DeviceWork)
)