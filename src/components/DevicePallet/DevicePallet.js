import React, { Fragment } from 'react';
import './DevicePallet.css';
import { DraggableTextBox, TextBoxShadow, FocusBox } from 'components/TextBox/TextBoxHelper';
import TextBox from 'components/TextBox/TextBox';
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
    tempBox,
    selectedBox,
    focus,
    isDragging,
    changeTextBoxInfo,
    focusClear,
    addBtnFunc }) => {

    let type = selectedBox && selectedBox.getIn(['block', 'type']);

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
                            <tr>
                                <td>box id</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'id'])}</td>
                            </tr>
                            <tr>
                                <td>type</td>
                                <td>{selectedBox && BUTTON_TYPE.find(x => x.type === type).name}</td>
                            </tr>
                            <tr>
                                <td>linked</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linked']).toString()}</td>
                            </tr>
                            <tr>
                                <td>linking</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linking']).toString()}</td>
                            </tr>
                            <tr>
                                <td>parent box</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linkedId'])}</td>
                            </tr>
                            <tr>
                                <td>head text</td>
                                <td>
                                    <textarea 
                                    name="preorder" 
                                    rows={3} 
                                    cols={20}
                                    value={selectedBox ? selectedBox.getIn(['block', 'preorder']) : ''}
                                    onChange={(e)=>{changeTextBoxInfo(e, selectedBox.getIn(['block', 'id']), 'preorder')}}>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>foot text</td>
                                <td>
                                    <textarea 
                                    name="postorder" 
                                    rows={3} 
                                    cols={20}
                                    value={selectedBox ? selectedBox.getIn(['block', 'postorder']) : ''}
                                    onChange={(e)=>{changeTextBoxInfo(e, selectedBox.getIn(['block', 'id']), 'postorder')}}>
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {selectedBox && (type === 1 || type === 5) && <table className="pv-wrap">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>No.</th>
                                <th style={{ width: '20%' }}>code</th>
                                <th style={{ width: '50%' }}>btn name</th>
                                <th style={{ width: '20%' }}>child</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{button.get('code')}</td>
                                        <td>{button.get('name')}</td>
                                        <td>{button.get('blockId')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
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
                                    tempBox={tempBox}
                                    key={boxInfo.get('id')}
                                    index={index}
                                    addBtnFunc={addBtnFunc}
                                    focus={focus} />)
                        })}
                    </g>
                    
                    {/* {tempBox && <TextBoxShadow tempBox={tempBox} selectedBox={selectedBox} />} */}
                    {tempBox && 
                    <FocusBox 
                    tempBox={tempBox} 
                    selectedBox={selectedBox} 
                    dragStart={dragStartSwap}
                    dropSwap={dropSwap}
                    isDragging={isDragging}/>}
                </svg>
                {children}
            </div>
        </div>
    )
}

export default DevicePallet;