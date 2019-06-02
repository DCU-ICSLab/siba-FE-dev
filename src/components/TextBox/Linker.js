import React, { Component, Fragment } from 'react';
import './TextBox.css';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class Linker extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.linkerInfo !== this.props.linkerInfo;
    }

    render() {
        const { linkerDragStart } = this.props;
        const linkerInfo = this.props.linkerInfo.toJS();
        console.log('render general linker')

        return (
            <Fragment>
                <g transform="translate(0.5,0.5)" style={{ visibility: 'visible', cursor: 'move' }}>
                    <path
                        d={`M ${linkerInfo.m.x} ${linkerInfo.m.y} L ${linkerInfo.z.x} ${linkerInfo.z.y}`}
                        onMouseDown={linkerDragStart}
                        style={{
                            fill: 'none',
                            stroke: '#fff',
                            strokeWidth: 9,
                            strokeMiterlimit: 10,
                            pointerEvents: 'stroke',
                            visibility: 'hidden'
                    }} />
                    <defs>
                        <marker id='head' orient='auto' markerWidth='10' markerHeight='12'
                            refX='0.1' refY='6'>
                            <path d='M0,0 V12 L6,6 Z' fill='#000' />
                        </marker>
                    </defs>
                    <path
                        markerEnd='url(#head)'
                        d={`M ${linkerInfo.m.x} ${linkerInfo.m.y} L ${linkerInfo.z.x} ${linkerInfo.z.y}`}
                        style={{
                            fill: 'none',
                            stroke: '#000',
                            strokeMiterlimit: 10,
                            pointerEvents: 'stroke'
                        }} />
                </g>
            </Fragment>
        )
    }
}

export default Linker;