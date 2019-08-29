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
        const { boxInfo, tempBox, index, addBtnFunc, focus, isEvent, isSelect, isCheckable, controlCheck } = this.props;
        let x = !isSelect ? boxInfo.getIn(['pos', 'x']) + 20 : 10;
        let y = !isSelect ? boxInfo.getIn(['pos', 'y']) + 20 : 10;
        let id = boxInfo.get('id');
        //let dynamicHeight = boxInfo.get('height')
        let dynamicHeight = boxInfo.get('headRow')*20 + boxInfo.get('footRow')*20;
        let isDragging = boxInfo.getIn(['pos', 'isDragging']);
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let preorder = boxInfo.get('preorder');
        let postorder = boxInfo.get('postorder');
        let height = 45 + 18 * (buttonSize - 1) + dynamicHeight//base height + button counts*18

        return (
            <Fragment>
                {/* onMouseDown={(e) => dragStart(e, x, y, index)} onMouseUp={(e) => { dropSwap(e, index) }} */}
                <g onMouseEnter={isEvent ? (e) => focus(e, x, y, id) : undefined}
                    className="noselect">
                    <TextBoxHeader x={x} y={y} id={id} type={boxInfo.get('type')}/>
                    <g className="text-box">
                        <rect rx={10}  ry={10} x={x} y={y} width={175} height={height} style={{
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
                            evCode = {button.get('eventCode')}
                            type={button.get('type')}
                            isCheckable={isCheckable}
                            controlCheck={controlCheck}>
                            {index + 1}
                        </TextBoxButton>
                    })}
                    {isEvent && buttonSize !== 9 &&
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