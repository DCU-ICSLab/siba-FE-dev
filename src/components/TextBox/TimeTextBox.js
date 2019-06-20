import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { TimeTextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class TimeTextBox extends Component{
    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, index, addBtnFunc, focus } = this.props;
        let x = boxInfo.getIn(['pos', 'x']) + 20;
        let y = boxInfo.getIn(['pos', 'y']) + 20;
        let id = boxInfo.get('id');
        let dynamicHeight = boxInfo.get('headRow')*20 + boxInfo.get('footRow')*20;
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let height = 30 + dynamicHeight;
        let preorder = boxInfo.get('preorder');
        let postorder = boxInfo.get('postorder');

        return (
            <Fragment>
                <g onMouseEnter={(e)=>focus(e, x,y, id)}
                className="noselect">
                    <TextBoxHeader x={x} y={y} id={id} />
                    <g className="text-box">
                        <rect x={x} y={y} width={175} height={height} style={{
                            stroke: '#000',
                            strokeWidth: 0.3,
                            strokeDasharray: isDragging ? '5 5' : 'none',
                            fill: isDragging ? 'none' : '#fff',
                            pointerEvents: 'all',
                        }}></rect>
                    </g>
                    <TimeTextBoxInner x={x} y={y} preorder={preorder} postorder={postorder}/>}
                </g>
                <TextBoxButton
                    x={x}
                    y={y}
                    type={0}
                    index={2}
                    height={height}>
                    <span style={{
                        fontSize: 10,
                        position: 'absolute',
                        top:3.5,
                        left: 4.5
                    }}>링크</span>
                </TextBoxButton>
            </Fragment>
        )
    }
}

export default TimeTextBox;