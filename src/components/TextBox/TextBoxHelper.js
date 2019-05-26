import React, { Fragment } from 'react';
import { MdAdd, MdClear } from 'react-icons/md'

export const DraggableTextBox = ({ dragStart, dragOver, type }) => {
    return (
        <a className="item" onDragStart={(e) => dragStart(e, type)} onDragOver={dragOver} draggable>
            <svg style={{
                left: '2px',
                top: '0px',
                width: '42px',
                height: '27px',
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'move'
            }}>
                <g transform="translate(0.5,0.5)" style={{
                    visibility: 'visible'
                }}>
                    <rect
                        x="2"
                        y="5"
                        width="37"
                        height="19"
                        fill={type === 5 || type === 6 ? '#FFEB33' : '#fff'}
                        stroke="#000"
                        pointerEvents="all"></rect>
                </g>
            </svg>
            {type === 1 && <span>button</span>}
            {type === 2 && <span>dynamic</span>}
            {type === 3 && <span>time</span>}
            {type === 4 && <span>button</span>}
            {type === 5 && <span><strong>Entry</strong></span>}
            {type === 6 && <span><strong>End</strong></span>}
        </a>
    )
}

export const TextBoxShadow = ({ tempBox, selectedBox }) => {
    const x = tempBox.get('left');
    const y = tempBox.get('top');
    const id = selectedBox.getIn(['block', 'id'])
    const buttons = selectedBox.getIn(['block', 'info', 'buttons']);
    //selected Box 존재하지 않는 오류 예측
    let height = 85 + 18 * (buttons.size - 1) //base height + button counts*18
    return (
        <Fragment>
            {selectedBox && <TextBoxHeader x={x} y={y} id={id} />}
            <rect x={x} y={y} width={170} height={height} style={{
                stroke: '#000',
                strokeWidth: 0.3,
                strokeDasharray: '5 5',
                pointerEvents: 'none',
                fill: '#fff',
            }} />
            {selectedBox &&
                <Fragment>
                    <TextBoxInner x={x} y={y} buttons={buttons} />
                    {selectedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                        return <TextBoxButton x={x} y={y} key={`${id}${index}`} index={index} height={height}>{index + 1}</TextBoxButton>
                    })}
                </Fragment>}
            {buttons.size !== 9 && <TextBoxButton
                x={x}
                y={y}
                type={0}
                index={buttons.size}
                height={height}>
                <MdAdd size={16} />
            </TextBoxButton>}
        </Fragment>
    )
}

export const TimeTextBoxInner = ({ x, y, buttons }) => {
    return (
        <g className="inner">
            <g transform={`translate(${x}, ${y})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={170} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <span>시간을 설정해주세요.</span>
                            <div className="time-box">시간 설정</div>
                            <span></span>
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
                    width={170} height={12}>
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div className="text-box-inner">
                            <span>{preorder}</span>
                            <ol>
                                {buttons.map((button, index) => {
                                    return <li key={index}>{button.get('name')}</li>
                                })}
                            </ol>
                            <span>{postorder}</span>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const TextBoxButton = ({ x, y, children, index, height, button, type, func }) => {
    let translateX = x + 18 + index * 32;
    let translateY = y + 15 + height;
    return (
        <Fragment>
            <g>
                <ellipse cx={translateX} cy={translateY} rx="14" ry="11"
                    style={{ fill: '#FFEB33', stroke: '#000', strokeWidth: 0, cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.fill = '#fff'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.fill = '#FFEB33'
                    }}
                    onClick={(e) => {
                        type === 0 && func(e)
                    }} />
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
                    }} className="noselect">
                        <strong>{children}</strong>
                    </div>
                </foreignObject>
            </g>
        </Fragment>
    )
}

export const TextBoxHeader = ({ x, y, id }) => {
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
                        <div className="text-box-header"><span>ID: {id}</span></div>
                    </foreignObject>
                </g>
            </g>
        </Fragment>
    )
}

export const FocusBox = ({ tempBox, selectedBox, dragStart, dropSwap, isDragging }) => {
    const x = tempBox.get('left');
    const y = tempBox.get('top');
    const type = selectedBox.getIn(['block', 'type'])
    const size = type === 1 || type === 5 ? selectedBox.getIn(['block', 'info', 'buttons']).size : 1;
    const height = 136 + 18 * (size - 1) //base height + button counts*18
    const width = 176 + (size >= 5 ? (size - 5) * 32 + 22 - (size == 9 ? 32 : 0) : 0);
    return (
        <g onMouseDown={(e) => dragStart(e,x,y)} onMouseUp={dropSwap}>
            <rect x={x + 17} y={y - 2} width={width} height={height} style={{
                stroke: '#000',
                strokeWidth: 0.3,
                strokeDasharray: '5 5',
                pointerEvents: 'all',
                fill: 'none',
                cursor: 'move'
            }} />
            {isDragging && <Fragment>
            <g>
                <rect x={x + width/2 -22.5} y={y + height + 5} width={80} height="20" rx="3" ry="3" style={{
                    stroke: '#000',
                    strokeWidth: 0.1,
                    fill: 'none',
                    pointerEvents: 'none',
                    // zIndex: tempBox ? 9999 : 3
                }} />
            </g>
            <g transform={`translate(${x + width/2 -22.5}, ${y + height + 5})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={80} height={15}>
                    <div className="text-box-mover"><span>{x}, {y}</span></div>
                </foreignObject>
            </g></Fragment>}
            <g>
                <circle cx={x+193} cy={y} r={8}
                    style={{ fill: '#97A9B8', stroke: '#000', strokeWidth: 0, cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.fill = '#000'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.fill = '#97A9B8'
                    }}
                    onClick={(e)=>{e.stopPropagation()}}>
                </circle>
            </g>
            <g transform={`translate(${x + 187}, ${y-8})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={15} height={15}>
                    <div><MdClear style={{color: '#fff'}}/></div>
                </foreignObject>
            </g>
        </g>
    )
}