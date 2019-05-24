import React, { Component, Fragment } from 'react';
import './TextBox.css';

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
    let x = tempBox.get('left');
    let y = tempBox.get('top');
    let id = selectedBox.getIn(['block', 'id'])
    return (
        <Fragment>
            {selectedBox && <TextBoxHeader x={x} y={y} id={id} />}
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
                    {selectedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                        return <TextBoxButton x={x} y={y} key={`${id}${index}`} index={index}>{index + 1}</TextBoxButton>
                    })}
                </Fragment>}
        </Fragment>
    )
}

export const TextBoxInner = ({ x, y }) => {
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
                            <span>버튼을 클릭해주세요.</span>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}

export const TextBoxButton = ({ x, y, children, index }) => {
    let translateX = x + 18 + index * 32;
    let translateY = y + 95;
    return (
        <Fragment>
            <g>
                <ellipse cx={translateX} cy={translateY} rx="14" ry="11"
                    style={{ fill: '#FFEB33', stroke: '#000', strokeWidth: 0 }} />
            </g>
            <g transform={`translate(${translateX - 4}, ${translateY - 9})`}>
                <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                    width={10} height={10}>
                    <span><strong>{children}</strong></span>
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

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class TextBox extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {

        const { boxInfo, dragStart, dropSwap, tempBox, index } = this.props;
        let x = boxInfo.getIn(['pos', 'left']) + 20;
        let y = boxInfo.getIn(['pos', 'top']) + 20;
        let id = boxInfo.get('id');
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);

        return (
            <Fragment>
                <g onMouseDown={(e) => dragStart(e, x, y, index)} onMouseUp={(e) => { dropSwap(e, index) }}>
                    {!isDragging && <TextBoxHeader x={x} y={y} id={id} />}
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
                {!isDragging && boxInfo.getIn(['info', 'buttons']).map((button, index) => {
                    return <TextBoxButton x={x} y={y} key={`${id}${index}`} index={index}>{index + 1}</TextBoxButton>
                })}
                {isDragging &&
                    <Fragment>
                        <g>
                            <rect x={x+45} y={y+85} width={80} height="20" rx="3" ry="3" style={{
                                stroke: '#000',
                                strokeWidth: 0.1,
                                fill: 'none',
                                pointerEvents: 'none',
                                zIndex: tempBox ? 9999 : 3
                            }} />
                        </g>
                        <g transform={`translate(${x+45}, ${y+85})`}>
                            <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                                width={80} height={15}>
                                <div className="text-box-mover"><span>{x}, {y}</span></div>
                            </foreignObject>
                        </g>
                    </Fragment>}
            </Fragment>
        )
    }
}

export default TextBox;