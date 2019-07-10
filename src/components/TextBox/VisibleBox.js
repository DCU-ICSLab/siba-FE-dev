import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
// import './TextBox.css';
import { TextBoxInner, TextBoxButton, TextBoxHeader } from './TextBoxHelper';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class VisibleBox extends Component {

    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {
        const { boxInfo, isCurrent } = this.props;
        let x = boxInfo.getIn(['pos', 'x']) + 20 -3;
        let y = boxInfo.getIn(['pos', 'y'])-3;
        let id = boxInfo.get('id');
        let type = boxInfo.get('type')
        let additionalHeight = (type===1 || type===5) ? 32 : 0
        let dynamicHeight = boxInfo.get('headRow') * 20 + boxInfo.get('footRow') * 20;
        let buttonSize = boxInfo.getIn(['info', 'buttons']).size;
        let height = 45 + 18 * (buttonSize - 1) + dynamicHeight + 20 + additionalHeight+3//base height + button counts*18

        return (
            <Fragment>
                <g className="visible-box">
                    <rect x={x} y={y} width={181} height={height} style={{
                        stroke: isCurrent ? 'red' : 'blue',
                        strokeWidth: 0.8,
                        fill: 'none'
                        // strokeDasharray: isDragging ? '5 5' : 'none',
                        // fill: isDragging ? 'none' : '#fff',
                        // pointerEvents: 'all',
                        // zIndex: tempBox ? 9999 : 3
                    }}></rect>
                </g>
            </Fragment>
        )
    }
}

export default VisibleBox;