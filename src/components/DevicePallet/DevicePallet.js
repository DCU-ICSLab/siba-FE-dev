import React, { Fragment } from 'react';
import './DevicePallet.css';

const DraggableTextBox = ({dragStart, dragOver}) => {
    return(
        <a className="item" style={{
            overflow: 'hidden',
            width: '46px',
            height: '46px',
            padding: '3px',
            opacity: 1
        }} onDragStart={dragStart} onDragOver={dragOver} draggable>
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

const TextBox = ({boxInfo, dragStart, dragOver}) => {
    return(
        <g className="text-box" onDragStart={dragStart} onDragOver={dragOver} draggable>
            <rect x={boxInfo.get('left')} y={boxInfo.get('top')} width="120" height="80" fill="#ffffff" stroke="#000000" pointerEvents="all">
                <foreignObject>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        test
                    </div>
                </foreignObject>
            </rect>
        </g>
    )
}

const DevicePallet = ({ children, dragStart, dragOver, drop, pallet }) => {
    return (
        <div id="DevicePallet">

            {/* side bar */}
            <div className="side">
                <div className="side-title">챗봇 텍스트박스 구성</div>
                <div className="side-section">
                    <div>텍스트박스 타입</div>
                    <DraggableTextBox dragStart={dragStart} dragOver={dragOver}/>
                </div>
                <div className="side-section">
                    <div>텍스트박스 속성</div>
                    
                </div>
            </div>

            {/* pallet */}
            <div className="pallet">
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
                    minWidth: '1719px',
                    minHeight: '2501px',
                    position: 'absolute',
                    backgroundImage: 'none',
                }}>
                    {pallet.map((boxInfo)=>{
                        return <TextBox boxInfo={boxInfo}></TextBox>
                    })}
                </svg>
                {children}
            </div>
        </div>
    )
}

export default DevicePallet;