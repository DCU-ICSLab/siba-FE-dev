import React, { Fragment } from 'react';
import './DevicePallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd } from 'react-icons/md'
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const DevicePallet = ({
    children,
    dragStart,
    dragOver,
    drop,
    scrollFunc,
    changeTextBoxInfo,
    focusClear,
    addBtnFuncSide,
    devBtnInfoChange,
    targetedBox,
    haveEntry,
    draggableLinkerEnd }) => {

    let type = targetedBox && targetedBox.getIn(['block', 'type']);

    return (
        <div id="DevicePallet">
            {/* side bar */}
            <div className="side">
                <div className="side-title">챗봇 텍스트박스 구성</div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 도구 상자</div>
                    <div className="draggable-wrap">
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={1} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={2} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={3} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={4} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={5} option={haveEntry}/>
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={6} />
                    </div>
                </div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 속성</div>
                    <table className="pv-wrap">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Property</th>
                                <th style={{ width: '70%' }}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targetedBox &&
                                <Fragment>
                                    <tr>
                                        <td>box id</td>
                                        <td>{targetedBox.getIn(['block', 'id'])}</td>
                                    </tr>
                                    <tr>
                                        <td>type</td>
                                        <td>{BUTTON_TYPE.find(x => x.type === type).name}</td>
                                    </tr>
                                    <tr>
                                        <td>linked</td>
                                        <td>{type!==5 ? targetedBox.getIn(['block', 'linked']).toString() : 'enable'}</td>
                                    </tr>
                                    <tr>
                                        <td>linking</td>
                                        <td>{targetedBox.getIn(['block', 'linking']).toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>head text</td>
                                        <td>
                                            <textarea
                                                spellCheck="false"
                                                name="preorder"
                                                style={{ height: targetedBox.getIn(['block', 'height']) }}
                                                rows={3}
                                                // cols={20}
                                                value={targetedBox.getIn(['block', 'preorder'])}
                                                onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height') }}>
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>foot text</td>
                                        <td>
                                            <textarea
                                                spellCheck="false"
                                                name="postorder"
                                                style={{ height: 20 }}
                                                rows={3}
                                                // cols={20}
                                                value={targetedBox.getIn(['block', 'postorder'])}
                                                onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height') }}>
                                            </textarea>
                                        </td>
                                    </tr>
                                </Fragment>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="side-section" style={{ marginTop: '10px' }}>
                    <div className="side-section-title">상위박스 연결 정보</div>
                    <table className="pv-wrap">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>idx</th>
                                <th style={{ width: '40%' }}>parent id</th>
                                <th style={{ width: '40%' }}>code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targetedBox && targetedBox.getIn(['block', 'parentBox']).map((box, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{box.get('parentId')}{box.get('parentId')===0 && <span>{' (entry)'}</span>}</td>
                                        <td>{box.get('code')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {targetedBox && (type === 1 || type === 5) &&
                    <div className="side-section" style={{ marginTop: '10px' }}>
                        <div className="side-section-title">버튼 속성</div>
                        <table className="pv-wrap">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>No.</th>
                                    <th style={{ width: '20%' }}>code</th>
                                    <th style={{ width: '50%' }}>btn name</th>
                                    <th style={{ width: '20%' }}>child</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{button.get('code')}</td>
                                            <td>
                                                <input
                                                    name="name"
                                                    value={button.get('name')}
                                                    onChange={(e) => { devBtnInfoChange(e, targetedBox.getIn(['block', 'id']), index) }} />
                                            </td>
                                            <td>{button.getIn(['linker', 'childId'])}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {targetedBox.getIn(['block', 'info', 'buttons']).size !== 9 &&
                            <div style={{ width: '100%' }}>
                                <button className="btn-add" onClick={(e) => { addBtnFuncSide(e, targetedBox.getIn(['block', 'id'])) }}>
                                    <MdAdd size={16} />
                                </button>
                            </div>}
                    </div>}
            </div>

            <div className="toolbox">

            </div>

            {/* pallet */}
            <div className="overflow-trick"></div>
            <div className="pallet" onScroll={scrollFunc}>
                <div className="background">
                </div>
                <svg
                    id="draggable"
                    onClick={focusClear}
                    onDragOver={dragOver}
                    onMouseUp={(e) => draggableLinkerEnd(e)}
                    onDrop={drop}
                    style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        minWidth: '1718px',
                        minHeight: '1151px',
                        position: 'absolute',
                        backgroundImage: 'none',
                    }}>
                    {children}
                </svg>
            </div>
        </div>
    )
}

export default DevicePallet;