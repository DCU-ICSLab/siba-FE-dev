import React, { Fragment } from 'react';
import './TextBox.css';
import { MdAdd, MdClear } from 'react-icons/md'

const FocusBox = ({
    selectedBox,
    dragStart,
    dropSwap,
    isDragging,
    focusClear,
    deleteTextBox,
    selectLinker,
    selectedLinker,
    selectLinkerTarget,
    selectLinkerTargetClear }) => {

    const x = selectedBox.get('x');
    const y = selectedBox.get('y');
    const type = selectedBox.getIn(['block', 'type'])

    const baseHeight = (type===1 || type ===5) ? 96 : 83;
    const id = selectedBox.getIn(['block', 'id'])
    const size = type === 1 || type === 5 ? selectedBox.getIn(['block', 'info', 'buttons']).size : 1;
    const dynamicHeight=selectedBox.getIn(['block', 'headRow'])*20 + selectedBox.getIn(['block', 'footRow'])*20;
    const height = baseHeight + 18 * (size - 1) +dynamicHeight //base height + button counts*18
    const dynamicWidth = (size >= 5 ? (size - 5) * 32 + 17 - (size == 9 ? 32 : 0) : 0);
    const width = 181 + dynamicWidth;

    return (
        <g
            onMouseDown={(e) => dragStart(e, x, y)}
            onMouseUp={dropSwap}
            onMouseLeave={focusClear}>
            <rect x={x + 17} y={y - 2} width={width} height={height} id="focus" style={{
                // stroke: '#00a8ff',
                stroke: '#000',
                strokeWidth: 0.4,
                strokeDasharray: '3 3',
                pointerEvents: 'all',
                fill: 'none',
                cursor: 'move'
            }} />
            {isDragging &&
                <Fragment>
                    <g>
                        <rect x={x + width / 2 - 22.5} y={y + height + 5} width={80} height="20" rx="3" ry="3" style={{
                            stroke: '#000',
                            strokeWidth: 0.1,
                            fill: 'none',
                            pointerEvents: 'none',
                            // zIndex: tempBox ? 9999 : 3
                        }} />
                    </g>
                    <g transform={`translate(${x + width / 2 - 22.5}, ${y + height + 5})`}>
                        <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                            width={80} height={15}>
                            <div className="text-box-mover"><span>{Math.round(x)}, {Math.round(y)}</span></div>
                        </foreignObject>
                    </g>
                </Fragment>}

            {/* link button */}
            {!isDragging && (type===1 || type === 5) && selectedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                return (
                    <g key={index}>
                        <ellipse cx={x + 38 + index * 32} cy={y + height - 16.5} rx="14" ry="11"
                            style={{
                                // fill: 'transparent',
                                fill: 'transparent',
                                stroke: '#000',
                                strokeWidth: 0,
                                cursor: 'pointer'
                            }}
                            //onClick={(e) => console.log('wow')}

                            onMouseEnter={(e) => {
                                !button.get('linker') && selectLinker(e, x + 37.5 + index * 32, y + height - 16.5, id, button.get('code'))
                            }}
                        >
                        </ellipse>
                    </g>
                )
            })}

            {/* link button */}
            {!isDragging && (type===2 || type === 3) &&
                <g>
                    <ellipse cx={x + 38 + 2 * 32} cy={y + height -18.5} rx="14" ry="11"
                        style={{
                            // fill: 'transparent',
                            fill: 'transparent',
                            stroke: '#000',
                            strokeWidth: 0,
                            cursor: 'pointer'
                        }}
                        //onClick={(e) => console.log('wow')}

                        onMouseOver={(e) => {
                            const button = selectedBox.getIn(['block', 'info', 'buttons', 0]);
                            !button.get('linker') && selectLinker(e, x + 37.5 + 2 * 32, y + height - 18.5, id, button.get('code'))
                        }}
                    >
                    </ellipse>
                </g>
            })}

            {/* link head*/ }
            {type !== 5  && !(type===3 && selectedBox.getIn(['block', 'parentBox']).size === 1) && <g>
                <rect x={x + 19} y={y} rx="10" ry="10" width={70} height={16}
                    style={{
                        fill: 'transparent',
                        stroke: '#000',
                        strokeWidth: 0,
                    }}
                    onMouseEnter={(e) => {
                        console.log('link enter')
                        if (selectedLinker) {
                            console.log(id)
                            selectLinkerTarget(e, x, y, id)
                            e.currentTarget.style.fill = '#000'
                            e.currentTarget.style.opacity = 0.5
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isDragging && selectedLinker) {
                            selectLinkerTargetClear()
                            e.currentTarget.style.fill = 'transparent'
                        }
                    }} />
            </g>}

            {/* delete */}
            {!isDragging && type !== 5 && <Fragment>
                <g>
                    <circle id="delete-btn" cx={x + 198 + dynamicWidth} cy={y} r={8}
                        style={{ fill: '#97A9B8', stroke: '#000', strokeWidth: 0, cursor: 'pointer' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fill = '#000'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fill = '#97A9B8'
                        }}
                        onClick={(e) => { deleteTextBox(e, id) }}>
                    </circle>
                </g>
                <g transform={`translate(${x + 192 + dynamicWidth}, ${y - 8})`}>
                    <foreignObject pointerEvents="none" style={{ overflow: 'visible' }}
                        width={15} height={15}>
                        <div><MdClear style={{ color: '#fff' }} /></div>
                    </foreignObject>
                </g>
            </Fragment>}
        </g>
    )
}

export default FocusBox;