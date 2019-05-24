import React, { Fragment } from 'react';
import './DevicePallet.css';

const DraggableTextBox = ({ dragStart, dragOver, type }) => {
    console.log(type)
    return (
        <a className="item" style={{
            overflow: 'hidden',
            width: '46px',
            height: '46px',
            padding: '3px',
            opacity: 1
        }} onDragStart={(e)=>dragStart(e,type)} onDragOver={dragOver} draggable>
            <svg style={{
                left: '2px',
                top: '2px',
                width: '42px',
                height: '42px',
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'move'
            }}>
                <g transform="translate(0.5,0.5)" style={{
                    visibility: 'visible'
                }}>
                    <rect x="2" y="11" width="37" height="19" fill="#fff" stroke="#000" pointerEvents="all"></rect>
                </g>
            </svg>
        </a>
    )
}

const TextBoxShadow = ({ tempBox, selectedBox }) => {
    let x = tempBox.get('left');
    let y = tempBox.get('top');
    return (
        <Fragment>
            <rect x={x} y={y} width={170} height="80" style={{
                stroke: '#000',
                strokeWidth: 0.3,
                strokeDasharray: '5 5',
                pointerEvents: 'none',
                fill: '#fff',
            }} />
            {selectedBox && 
            <Fragment>
                <TextBoxInner x={x} y={y} />
                {selectedBox.getIn(['block','info','buttons']).map((button, index)=>{
                    return <TextBoxButton x={x} y={y} key={`${button.get('id')}${index}`} index={index}>{index+1}</TextBoxButton>
                })}
            </Fragment>}
        </Fragment>
    )
}

const TextBoxInner = ({ x, y }) => {
    return (
        <g className="inner">
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={170} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <span>사용할 수 있는 명령 목록 입니다.</span>
                            <ol>
                                <li>on</li>
                            </ol>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

const TextBoxButton = ({x, y, children, index}) => {
    let translateX = x + 18 + index*32;
    let translateY = y + 95;
    return (
        <Fragment>
            <g>
                <ellipse cx={translateX} cy={translateY} rx="14" ry="11"
                    style={{ fill: '#FFEB33', stroke: '#000', strokeWidth: 0 }} />
            </g>
            <g transform={`translate(${translateX-4}, ${translateY-9})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={10} height={10}>
                    <span><strong>{children}</strong></span>
                </foreignObject>
            </g>
        </Fragment>
    )
}

const TextBox = ({ boxInfo, dragStart, dropSwap, tempBox, index }) => {
    let x = boxInfo.getIn(['pos', 'left']);
    let y = boxInfo.getIn(['pos', 'top']);
    let id = boxInfo.get('id');
    let isDragging = boxInfo.getIn(['pos', 'isDragging']);

    return (
        <Fragment>
            <g onMouseDown={(e) => dragStart(e, x, y, index)} onMouseUp={(e) => { dropSwap(e, index) }}>
                <g className="text-box">
                    <rect x={x} y={y} width={170} height="80" style={{
                        stroke: '#000',
                        strokeWidth: 0.3,
                        strokeDasharray: isDragging ? '5 5' : 'none',
                        fill: isDragging ? 'none' : '#fff',
                        pointerEvents: 'all',
                        zIndex: tempBox ? 9999 : 3
                    }}></rect>
                </g>
                {!isDragging && <TextBoxInner x={x} y={y} />}
            </g>
            {boxInfo.getIn(['info','buttons']).map((button, index)=>{
                return <TextBoxButton x={x} y={y} key={`${id}${index}`} index={index}>{index+1}</TextBoxButton>
            })}
        </Fragment>
    )
}

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

    console.log(selectedBox && selectedBox.get('id'))
    return (
        <div id="DevicePallet">
            {/* side bar */}
            <div className="side">
                <div className="side-title">챗봇 텍스트박스 구성</div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 타입</div>
                    <div className="draggable-wrap">
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={1}/>
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={2}/>
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={3}/>
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={4}/>
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