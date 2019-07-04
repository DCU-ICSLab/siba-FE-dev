import React, { Component, Fragment } from 'react';
import './TextBox.css';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class DraggableLinker extends Component {

    render() {
        const { draggableLinkerStart, linkerVisible, selectLinkerClear } = this.props;
        const selectedLinker = this.props.selectedLinker.toJS();
        return (
            <Fragment>
                <g
                    transform="translate(0.5,0.5)"
                    style={{
                        visibility: 'visible', cursor: 'move'
                    }}>
                    {
                        linkerVisible &&
                        <Fragment>
                            <path
                                d={`M ${selectedLinker.m.x} ${selectedLinker.m.y + 11} L ${selectedLinker.z.x} ${selectedLinker.z.y}`}
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
                                d={`M ${selectedLinker.m.x} ${selectedLinker.m.y + 11} L ${selectedLinker.z.x} ${selectedLinker.z.y}`}
                                style={{
                                    fill: 'none',
                                    stroke: '#000',
                                    strokeMiterlimit: 10,
                                    pointerEvents: 'stroke'
                                }} />
                        </Fragment>
                    }
                    <ellipse cx={selectedLinker.m.x} cy={selectedLinker.m.y} rx="14" ry="11"
                        style={{
                            fill: '#9BABB8',
                            stroke: '#000',
                            strokeWidth: 0,
                            opacity: 0.8,
                            cursor: 'pointer'
                        }}
                        onMouseDown={(e) => draggableLinkerStart(e)}
                        onMouseOut={(e)=>{
                            selectLinkerClear()
                            e.currentTarget.style.fill = 'transparent'
                        }}
                    />
                </g>
            </Fragment>
        )
    }
}

export default DraggableLinker;