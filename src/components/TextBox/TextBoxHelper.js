import React, { Fragment } from 'react';
import { MdAdd, MdClear } from 'react-icons/md'

export const DraggableTextBox = ({ dragStart, dragOver, type, option }) => {
    const draggableClassName ='item' + (!option ? ' item-hover' : '')
    return (
        <a 
        className={draggableClassName}
        onDragStart={(e) => dragStart(e, type)} 
        onDragOver={dragOver} 
        draggable={!option}
        pointerEvents={(!option ? 'all' : 'none')}
        style={{
            opacity: !option ? 1 : 0.3,
            cursor: !option ? 'move' : 'default'
        }}>
            <svg style={{
                left: '2px',
                top: '0px',
                width: '42px',
                height: '27px',
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                cursor: !option ? 'move' : 'default'
            }}>
                <g transform="translate(0.5,0.5)" style={{
                    visibility: 'visible'
                }}>
                    {type !== 4 ? <rect
                        x="2"
                        y="5"
                        width="37"
                        height="19"
                        fill={type === 5 || type ===8 ? '#FFEB33' : (type === 7 ? '#6B95DA' : '#fff')}
                        stroke="#000"
                        pointerEvents="all"></rect>
                        :
                        <Fragment>
                            <path
                                d="M 1 35 L 36 9"
                                style={{
                                    fill: 'none',
                                    stroke: '#fff',
                                    strokeMiterlimit: 10,
                                    pointerEvents: 'stroke',
                                    visibility: 'hidden',
                                    strokeWidth: 9
                                }} />
                            <path
                                d="M 1 35 L 36 9"
                                fill="none"
                                style={{
                                    stroke: '#000',
                                    strokeMiterlimit: 10,
                                    pointerEvents: 'stroke'
                                }} />
                            <path d="M 38 7 L 37 11 L 36 9 L 34 8 Z"
                                style={{
                                    fill: '#000',
                                    stroke: '#000',
                                    strokeMiterlimit: 10,
                                    pointerEvents: 'all'
                                }} />
                        </Fragment>
                    }
                </g>
            </svg>
            {type === 1 && <span>button</span>}
            {type === 2 && <span>dynamic</span>}
            {type === 3 && <span>time</span>}
            {type === 4 && <span>linker</span>}
            {type === 5 && <span><strong>Entry</strong></span>}
            {type === 6 && <span>select</span>}
            {type === 7 && <span>judge</span>}
            {type === 8 && <span>End</span>}
        </a>
    )
}

export const DynamicTextBoxInner = ({ x, y, buttons, preorder, postorder }) => {
    return (
        <g className="inner">
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={175} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <div style={{
                                marginBottom: 20
                            }}>
                                <span className="textarea">{preorder}</span>
                            </div>
                            <div>
                                <span className="textarea">{postorder}</span>
                            </div>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const TimeTextBoxInner = ({ x, y, buttons, preorder, postorder }) => {
    return (
        <g className="inner">
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={175} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <span className="textarea">{preorder}</span>
                            <div className="time-box">시간 설정</div>
                            <span className="textarea">{postorder}</span>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const TextBoxInner = ({ x, y, buttons, preorder, postorder }) => {
    return (
        <g className="inner">
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={175} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <span className="textarea">{preorder}</span>
                            <ol>
                                {buttons.map((button, index) => {
                                    return <li key={index}>{button.get('name')}</li>
                                })}
                            </ol>
                            <span className="textarea">{postorder}</span>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const JudgeBoxInner = ({ x, y, buttons, preorder, postorder }) => {
    const judge = preorder.split('$')
    return (
        <g className="inner" style={{width: 192}}>
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible', width: 193 }}
                    width={175} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <div className="state-val">
                                <header>state</header>
                                <div>{judge[0]=='' ? '-': judge[0]}</div>
                            </div>
                            <div className="state-op">
                                <header>op</header>
                                <div>{judge[1]=='' ? ' ': judge[1]}</div>
                            </div>
                            <div className="fix-val">
                                <header>value</header>
                                <div>{judge[2]=='' ? '-': judge[2]}</div>
                            </div>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const TextBoxButton = ({ x, y, children, index, height, button, type, func, isCheckable, controlCheck, evCode }) => {
    let translateX = x + 18 + index * 32;
    let translateY = y + 15 + height;

    return (
        <Fragment>
            <g onClick={isCheckable && type==='1' ? ()=>controlCheck('controlDTO', {
                        target: {
                            name: 'evCode',
                            value: evCode
                        }
                    }) : undefined}>
                <ellipse cx={translateX} cy={translateY} rx="14" ry="11"
                    style={{ fill: !isCheckable ? '#FFEB33' : (type==='1' ? '#6B95DA' : '#FFEB33'), stroke: '#000', strokeWidth: 0}}/>
            </g>
            <g transform={`translate(${translateX - 4}, ${translateY - 9})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={28} height={22}>
                    <div style={{
                        width: 28,
                        height: 'auto',
                        position: 'absolute',
                        left: '-10px',
                        top: '-2px',
                        textAlign: 'center',
                        // paddingLeft: type===0 ? '10px': '0px',
                        paddingTop: type === 0 ? '3px' : '2px'
                    }} 
                    className="noselect">
                        <strong style={
                            isCheckable && type==='1' ? {
                                color: '#fff'
                            } : null
                        }>{children}</strong>
                    </div>
                </foreignObject>
            </g>
        </Fragment>
    )
}

export const TextBoxHeader = ({ x, y, id, type }) => {
    const width = 70;
    const height = 16;
    return (
        <Fragment>
            <g>
                <rect x={x} y={y - 20} rx="10" ry="10" width={width} height={height}
                    style={{
                        fill: '#9BABB8',
                        strokeWidth: 0,
                    }} />
            </g>
            <g>
                <g transform={`translate(${x}, ${y - 20})`}>
                    <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                        width={width} height={height}>
                        <div className="text-box-header">
                            {type===1 && <span>ID: {id}</span>}
                            {type===2 && <span>dynamic</span>}
                            {type===3 && <span>time</span>}
                            {type===6 && <span>select</span>}
                            {type===7 && <span>judge</span>}
                            {type===8 && <span>end</span>}
                        </div>
                    </foreignObject>
                </g>
            </g>
        </Fragment>
    )
}