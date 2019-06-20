import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import { TextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';
import sibaIco from 'resources/siba.ico';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class EntryTextBox extends Component {

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
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let preorder = boxInfo.get('preorder');
        let postorder = boxInfo.get('postorder');
        let height = 45 + 18 * (buttonSize - 1) + dynamicHeight//base height + button counts*18

        return (
            <Fragment>
                <g onMouseEnter={(e) => focus(e, x, y, id)}
                    className="noselect">
                    <g transform={`translate(${x}, ${y-33})`}>
                        <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                            width={100} height={30}>
                            <img src={sibaIco} height={30} style={{ borderRadius: '30%' }}></img>
                            <span style={{ position: 'absolute', left: 35, top: 5 }}>
                                <strong>Entry</strong>
                            </span>
                        </foreignObject>
                    </g>

                    <g className="text-box">
                        <rect x={x} y={y} width={175} height={height} style={{
                            stroke: '#000',
                            strokeWidth: 0.3,
                            strokeDasharray: isDragging ? '5 5' : 'none',
                            fill: isDragging ? 'none' : '#fff',
                            pointerEvents: 'all'
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
            </Fragment >
        )
    }
}

export default EntryTextBox;