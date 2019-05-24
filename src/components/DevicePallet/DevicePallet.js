import React, { Fragment } from 'react';
import './DevicePallet.css';
import TextBox, {DraggableTextBox, TextBoxShadow} from 'components/TextBox/TextBox';

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
    selectedBox }) => {
    return (
        <div id="DevicePallet">
            {/* side bar */}
            <div className="side">
                <div className="side-title">챗봇 텍스트박스 구성</div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 타입</div>
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
                                <th style={{ width: '40%' }}>Property</th>
                                <th style={{ width: '60%' }}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>box id</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'id'])}</td>
                            </tr>
                            <tr>
                                <td>type</td>
                                <td>button</td>
                            </tr>
                            <tr>
                                <td>is Linked</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linked'])}</td>
                            </tr>
                            <tr>
                                <td>is Linking</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linking'])}</td>
                            </tr>
                            <tr>
                                <td>parent box id</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linkedId'])}</td>
                            </tr>
                            <tr>
                                <td>child box id</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'linkingId'])}</td>
                            </tr>
                            <tr>
                                <td>preorder</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'preorder'])}</td>
                            </tr>
                            <tr>
                                <td>postorder</td>
                                <td>{selectedBox && selectedBox.getIn(['block', 'postorder'])}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* pallet */}
            <div className="overflow-trick"></div>
            <div className="pallet" onScroll={scrollFunc}>
                <div className="background">
                </div>
                <svg
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
                        {tempBox && <TextBoxShadow tempBox={tempBox} selectedBox={selectedBox} />}
                    </g>
                    <g>
                        {pallet.map((boxInfo, index) => {
                            return (
                                <TextBox
                                    boxInfo={boxInfo}
                                    dragStart={dragStartSwap}
                                    dropSwap={dropSwap}
                                    tempBox={tempBox}
                                    key={boxInfo.get('id')}
                                    index={index} />)
                        })}
                    </g>
                </svg>
                {children}
            </div>
        </div>
    )
}

export default DevicePallet;