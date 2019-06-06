import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { TextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class ButtonTextBox extends Component {

    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, tempBox, index, addBtnFunc, focus } = this.props;
        let x = boxInfo.getIn(['pos', 'left']) + 20;
        let y = boxInfo.getIn(['pos', 'top']) + 20;
        let id = boxInfo.get('id');
        let dynamicHeight = boxInfo.get('height');
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let preorder = boxInfo.get('preorder');
        let postorder = boxInfo.get('postorder');
        let height = 65 + 18 * (buttonSize - 1) + dynamicHeight//base height + button counts*18

        console.log('fff:'+id)

        return (
            <Fragment>
                {/* onMouseDown={(e) => dragStart(e, x, y, index)} onMouseUp={(e) => { dropSwap(e, index) }} */}
                <g onMouseEnter={(e) => focus(e, x, y, id)}
                    className="noselect">
                    <TextBoxHeader x={x} y={y} id={id} />
                    <g className="text-box">
                        <rect x={x} y={y} width={170} height={height} style={{
                            stroke: '#000',
                            strokeWidth: 0.3,
                            strokeDasharray: isDragging ? '5 5' : 'none',
                            fill: isDragging ? 'none' : '#fff',
                            pointerEvents: 'all',
                            // zIndex: tempBox ? 9999 : 3
                        }}></rect>
                    </g>
                    <TextBoxInner
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
                            index={index}
                            height={height}
                            button={button}
                            type={1}>
                            {index + 1}
                        </TextBoxButton>
                    })}
                    {buttonSize !== 9 &&
                        <TextBoxButton
                            x={x}
                            y={y}
                            type={0}
                            index={buttonSize}
                            height={height}
                            func={(e) => { addBtnFunc(e, x, y, index) }}>
                            <MdAdd size={16} />
                        </TextBoxButton>}
                </g>
            </Fragment>
        )
    }
}

export default ButtonTextBox;