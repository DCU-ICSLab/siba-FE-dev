import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { JudgeBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class JudgeBox extends Component {

    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, tempBox, index, addBtnFunc, focus, isEvent, isSelect, isCheckable, controlCheck, isDrag} = this.props;
        let x = !isSelect ? boxInfo.getIn(['pos', 'x']) + 20 : 10;
        let y = !isSelect ? boxInfo.getIn(['pos', 'y']) + 20 : 10;
        let id = boxInfo.get('id');
        //let dynamicHeight = boxInfo.get('height')
        let dynamicHeight = boxInfo.get('headRow')*20 + boxInfo.get('footRow')*20;
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let preorder = boxInfo.get('preorder');
        let postorder = boxInfo.get('postorder');
        let height = 54

        return (
            <Fragment>
                {/* onMouseDown={(e) => dragStart(e, x, y, index)} onMouseUp={(e) => { dropSwap(e, index) }} */}
                <g onMouseEnter={isEvent ? (isDrag ? undefined: (e) => focus(e, x, y, id)) : undefined}
                    className="noselect">
                    <TextBoxHeader x={x} y={y} id={id} type={boxInfo.get('type')}/>
                    <g className="text-box">
                        <rect rx={10}  ry={10} x={x} y={y} width={193} height={height} style={{
                            stroke: '#000',
                            strokeWidth: 0.3,
                            strokeDasharray: isDragging ? '5 5' : 'none',
                            fill: isDragging ? 'none' : '#fff',
                            pointerEvents: 'all',
                            // zIndex: tempBox ? 9999 : 3
                        }}></rect>
                    </g>
                    <JudgeBoxInner
                        x={x}
                        y={y}
                        buttons={boxInfo.getIn(['info', 'buttons'])}
                        preorder={preorder}
                        postorder={postorder} />
                    {boxInfo.getIn(['info', 'buttons']).map((button, index) => {
                        return <TextBoxButton
                            x={x}
                            y={y}
                            key={`${id}${index}`}
                            index={index===0 ? 0 : 5}
                            height={height}
                            button={button}
                            evCode = {button.get('eventCode')}
                            type={button.get('type')}
                            isCheckable={isCheckable}
                            controlCheck={controlCheck}>
                            {index===0 ? 'T' : 'F'}
                        </TextBoxButton>
                    })}
                </g>
            </Fragment>
        )
    }
}

export default JudgeBox;