import React, { Component, Fragment } from 'react';
import './TextBox.css';
import { MdAdd, MdClear } from 'react-icons/md'

class TargetBox extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.targetedBox !== this.props.targetedBox;
    }

    render(){
        const {dragStart, dropSwap, targetedBox, focus } = this.props;

        const x = targetedBox.get('x');
        const y = targetedBox.get('y');
        const type = targetedBox.getIn(['block', 'type'])
        const additional = type===7 ? 18 : 0
        const baseHeight = (type===1 || type ===5) ? 96 : 83;
        const id = targetedBox.getIn(['block', 'id'])
        const size = type === 1 || type === 5 ? targetedBox.getIn(['block', 'info', 'buttons']).size : 1;
        const dynamicHeight=targetedBox.getIn(['block', 'headRow'])*20 + targetedBox.getIn(['block', 'footRow'])*20 - additional;
        const height = baseHeight + 18 * (size - 1) + dynamicHeight //base height + button counts*18
        const dynamicWidth = (size >= 5 ? (size - 5) * 32 + 17 - (size == 9 ? 32 : 0) : 0);
        const width = 181 + dynamicWidth+additional;

        return (
            <g 
            onMouseDown={(e) => dragStart(e, x, y)} 
            onMouseUp={dropSwap} 
            onMouseEnter={(e) => focus(e, x + 20, y + 20, id)}>
                <rect x={x + 17} y={y - 2} width={width} height={height} id="focus" style={{
                    // stroke: '#00a8ff',
                    stroke: '#000',
                    strokeWidth: 0.4,
                    strokeDasharray: '3 3',
                    pointerEvents: 'all',
                    fill: 'none',
                    cursor: 'move'
                }} />
                { type !==5 &&
                    <Fragment>
                        <g>
                            <circle id="delete-btn" cx={x + 198 + dynamicWidth+additional} cy={y} r={8}
                                style={{ fill: '#97A9B8', stroke: '#000', strokeWidth: 0, cursor: 'pointer' }}>
                            </circle>
                        </g>
                        <g transform={`translate(${x + 192 + dynamicWidth+additional}, ${y - 8})`}>
                            <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                                width={15} height={15}>
                                <div><MdClear style={{ color: '#fff' }} /></div>
                            </foreignObject>
                        </g>
                    </Fragment>
                }
            </g>
        )
    }
}

export default TargetBox;