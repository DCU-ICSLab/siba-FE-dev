import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { TextBoxShadow, TimeTextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class TimeTextBox extends Component{
    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, dragStart, dropSwap, tempBox, index, addBtnFunc, focus } = this.props;
        let x = boxInfo.getIn(['pos', 'left']) + 20;
        let y = boxInfo.getIn(['pos', 'top']) + 20;
        let id = boxInfo.get('id');
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let height = 70;

        return (
            <Fragment>
                <g onClick={(e)=>focus(e, x,y, index)}
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
                    <TimeTextBoxInner x={x} y={y}/>}
                </g>
                <TextBoxButton
                    x={x}
                    y={y}
                    type={0}
                    index={2}
                    height={height}
                    func={()=>{addBtnFunc(index)}}>
                    <span style={{fontSize: 10}}>link</span>
                </TextBoxButton>
            </Fragment>
        )
    }
}

export default TimeTextBox;