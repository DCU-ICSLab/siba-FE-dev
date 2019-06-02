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
                    {type !== 4 ? <rect
                        x="2"
                        y="5"
                        width="37"
                        height="19"
                        fill={type === 5 || type === 6 ? '#FFEB33' : '#fff'}
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
            {type === 6 && <span><strong>End</strong></span>}
        </a>
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
                    style={{ fill: '#FFEB33', stroke: '#000', strokeWidth: 0}}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.fill = '#fff'
                    }}
                    // onMouseLeave={(e) => {
                    //     e.currentTarget.style.fill = '#FFEB33'
                    // }}
                    // onClick={(e) => {
                    //     type === 0 && func(e)
                    // }} 
                    />
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

export const FocusBox = ({ 
    selectedBox, 
    dragStart, 
    dropSwap, 
    isDragging, 
    focusClear, 
    selectLinker, 
    selectedLinker,
    selectLinkerTarget,
    selectLinkerTargetClear }) => {
    const x = selectedBox.get('x');
    const y = selectedBox.get('y');
    const type = selectedBox.getIn(['block', 'type'])
    const id = selectedBox.getIn(['block', 'id'])
    const size = type === 1 || type === 5 ? selectedBox.getIn(['block', 'info', 'buttons']).size : 1;
    const height = 136 + 18 * (size - 1) //base height + button counts*18
    const dynamicWidth = (size >= 5 ? (size - 5) * 32 + 22 - (size == 9 ? 32 : 0) : 0);
    const width = 176 + dynamicWidth;
    return (
        <g onMouseDown={(e) => dragStart(e, x, y)} onMouseUp={dropSwap} onMouseLeave={focusClear}>
            <rect x={x + 17} y={y - 2} width={width} height={height} id="focus" style={{
                // stroke: '#00a8ff',
                stroke: '#000',
                strokeWidth: 0.4,
                strokeDasharray: '3 3',
                pointerEvents: 'all',
                fill: 'none',
                cursor: 'move'
            }} />
            {isDragging &&
                <Fragment>
                    <g>
                        <rect x={x + width / 2 - 22.5} y={y + height + 5} width={80} height="20" rx="3" ry="3" style={{
                            stroke: '#000',
                            strokeWidth: 0.1,
                            fill: 'none',
                            pointerEvents: 'none',
                            // zIndex: tempBox ? 9999 : 3
                        }} />
                    </g>
                    <g transform={`translate(${x + width / 2 - 22.5}, ${y + height + 5})`}>
                        <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                            width={80} height={15}>
                            <div className="text-box-mover"><span>{x}, {y}</span></div>
                        </foreignObject>
                    </g>
                </Fragment>}
            {/* link button */}
            {selectedBox.getIn(['block', 'type']) === 1 && selectedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                return (
                    <g key={index}>
                        <ellipse cx={x + 38 + index * 32} cy={y + height - 16} rx="14" ry="11"
                            style={{
                                // fill: 'transparent',
                                fill: 'transparent',
                                stroke: '#000',
                                strokeWidth: 0,
                                cursor: 'pointer'
                            }}
                            //onClick={(e) => console.log('wow')}

                            onMouseEnter={(e) => {
                                selectLinker(e, x + 37.5 + index * 32, y + height - 16.5, id, button.get('code'))
                            }}
                            >
                        </ellipse>
                    </g>
                )
            })}
            <g>
                <rect x={x + 19} y={y} rx="10" ry="10" width={70} height={16}
                    style={{
                        fill: 'transparent',
                        stroke: '#000',
                        strokeWidth: 0,
                    }} 
                    onMouseEnter={(e)=>{
                        console.log('link enter')
                        if(selectedLinker){
                            selectLinkerTarget(e, x, y, id)
                            e.currentTarget.style.fill = '#000'
                            e.currentTarget.style.opacity = 0.5
                        }
                    }}
                    onMouseLeave={(e)=>{
                        if(selectedLinker){
                            selectLinkerTargetClear()
                            e.currentTarget.style.fill = 'transparent'
                        }
                    }}/>
            </g>
        </g>
    )
}

export const TargetBox = ({dragStart, dropSwap, deleteTextBox, focusClear, targetedBox, focus }) => {
    const x = targetedBox.get('x');
    const y = targetedBox.get('y');
    const index = targetedBox.get('index');
    const type = targetedBox.getIn(['block', 'type'])
    const id = targetedBox.getIn(['block', 'id'])
    const size = type === 1 || type === 5 ? targetedBox.getIn(['block', 'info', 'buttons']).size : 1;
    const height = 136 + 18 * (size - 1) //base height + button counts*18
    const dynamicWidth = (size >= 5 ? (size - 5) * 32 + 22 - (size == 9 ? 32 : 0) : 0);
    const width = 176 + dynamicWidth;
    return (
        <g onMouseDown={(e) => dragStart(e, x, y)} onMouseUp={dropSwap} onMouseEnter={(e) => focus(e, x + 20, y + 20, index)}>
            <rect x={x + 17} y={y - 2} width={width} height={height} id="focus" style={{
                // stroke: '#00a8ff',
                stroke: '#000',
                strokeWidth: 0.4,
                strokeDasharray: '3 3',
                pointerEvents: 'all',
                fill: 'none',
                cursor: 'move'
            }} />
            {
                <Fragment>
                    <g>
                        <circle id="delete-btn" cx={x + 193 + dynamicWidth} cy={y} r={8}
                            style={{ fill: '#97A9B8', stroke: '#000', strokeWidth: 0, cursor: 'pointer' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.fill = '#000'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.fill = '#97A9B8'
                            }}
                            onClick={(e) => { deleteTextBox(e, id) }}>
                        </circle>
                    </g>
                    <g transform={`translate(${x + 187 + dynamicWidth}, ${y - 8})`}>
                        <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                            width={15} height={15}>
                            <div><MdClear style={{ color: '#fff' }} /></div>
                        </foreignObject>
                    </g>
                </Fragment>}
        </g>)
}