import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { TextBoxShadow, TimeTextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class EndBox extends Component {
    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, dragStart, dropSwap, tempBox, index, focus } = this.props;
        let x = boxInfo.getIn(['pos', 'left']) + 20;
        let y = boxInfo.getIn(['pos', 'top']) + 20;
        let id = boxInfo.get('id');
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let height = 70;

        return (
            <Fragment>
                <g onMouseEnter={(e)=>focus(e, x, y, index)}
                    className="noselect">
                    <TextBoxHeader x={x} y={y} id={id} />
                    <g className="text-box">
                        <rect x={x} y={y} width={170} height={height} style={{
                            stroke: '#000',
                            strokeWidth: 0.3,
                            strokeDasharray: isDragging ? '5 5' : 'none',
                            fill: isDragging ? 'none' : '#fff',
                            pointerEvents: 'all',
                            zIndex: tempBox ? 9999 : 3
                        }}></rect>
                    </g>
                    <g className="inner">
                        <g transform={`translate(${x}, ${y})`}>
                            <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                                width={170} height={12}>
                                <div xmlns="http://www.w3.org/1999/xhtml">
                                    <div className="text-box-inner">
                                        <span>명령을 전송하시겠습니까?</span>
                                    </div>
                                </div>
                            </foreignObject>
                        </g>
                    </g>
                </g>
            </Fragment>
        )
    }
}

export default EndBox;