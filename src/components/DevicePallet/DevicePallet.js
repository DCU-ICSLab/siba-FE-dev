import React, { Fragment } from 'react';
import './DevicePallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd } from 'react-icons/md'
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const DevicePallet = ({
    children,
    dragStart,
    dragOver,
    drop,
    pallet,
    scrollFunc,
    dragStartSwap,
    dropSwap,
    selectedBox,
    focus,
    isDragging,
    changeTextBoxInfo,
    focusClear,
    deleteTextBox,
    addBtnFuncSide,
    devBtnInfoChange,
    targetedBox,
    linkers,
    selectedLinker,
    selectLinker,
    draggableLinkerStart,
    draggableLinkerEnd,
    addBtnFunc }) => {

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
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={5} />
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
                            { targetedBox && 
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
                                <td>{targetedBox.getIn(['block', 'linked']).toString()}</td>
                            </tr>
                            <tr>
                                <td>linking</td>
                                <td>{targetedBox.getIn(['block', 'linking']).toString()}</td>
                            </tr>
                            <tr>
                                <td>parent box</td>
                                <td>{targetedBox.getIn(['block', 'linkedId'])}</td>
                            </tr>
                            <tr>
                                <td>head text</td>
                                <td>
                                    <textarea 
                                    spellCheck="false"
                                    name="preorder" 
                                    style={{height: targetedBox.getIn(['block', 'height'])}}
                                    rows={3} 
                                    // cols={20}
                                    value={targetedBox.getIn(['block', 'preorder'])}
                                    onChange={(e)=>{changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height')}}>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>foot text</td>
                                <td>
                                    <textarea 
                                    spellCheck="false"
                                    name="postorder" 
                                    style={{height: 20}}
                                    rows={3} 
                                    // cols={20}
                                    value={targetedBox.getIn(['block', 'postorder'])}
                                    onChange={(e)=>{changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height')}}>
                                    </textarea>
                                </td>
                            </tr>
                            </Fragment>
                            }
                        </tbody>
                    </table>
                    {targetedBox && (type === 1 || type === 5) && 
                    <Fragment>
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
                                        <td>{index+1}</td>
                                        <td>{button.get('code')}</td>
                                        <td>
                                            <input 
                                            name="name"
                                            value={button.get('name')}
                                            onChange={(e)=>{devBtnInfoChange(e, targetedBox.getIn(['block', 'id']), index)}}/>
                                        </td>
                                        <td>{button.get('blockId')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {targetedBox.getIn(['block', 'info', 'buttons']).size !==9 &&
                    <div style={{width: '100%'}}>
                        <button className="btn-add" onClick={(e)=>{addBtnFuncSide(e,targetedBox.getIn(['block','id']))}}>
                            <MdAdd size={16}/>
                        </button>
                    </div>}
                    </Fragment>}
                </div>
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

                    <g>
                        {pallet.map((boxInfo, index) => {
                            return (
                                <TextBox
                                    boxInfo={boxInfo}
                                    key={boxInfo.get('id')}
                                    index={index}
                                    addBtnFunc={addBtnFunc}
                                    focus={focus} />)
                        })}
                    </g>

                    {
                        linkers.map((linkerInfo, index) => {
                            return(
                                <Linker
                                linkerInfo={linkerInfo}
                                key={index}
                                />
                            )
                        })
                    }
                    
                    {targetedBox && 
                    <TargetBox  
                    dragStart={dragStartSwap}
                    dropSwap={dropSwap}
                    deleteTextBox={deleteTextBox}
                    focusClear={focusClear}
                    targetedBox={targetedBox}
                    focus={focus}/>}
                    
                    {selectedBox && 
                    <FocusBox 
                    selectedBox={selectedBox} 
                    dragStart={dragStartSwap}
                    dropSwap={dropSwap}
                    isDragging={isDragging}
                    focusClear={focusClear}
                    selectLinker={selectLinker}/>}

                    {selectedLinker && 
                    <DraggableLinker 
                    selectedLinker={selectedLinker}
                    draggableLinkerStart={draggableLinkerStart}
                    draggableLinkerEnd={draggableLinkerEnd}/>}
                </svg>
                {children}
            </div>
        </div>
    )
}

export default DevicePallet;