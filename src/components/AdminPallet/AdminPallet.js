import React, { Fragment } from 'react';
import './AdminPallet.css';
import moment from 'moment';
import { Line, HorizontalBar } from 'react-chartjs-2';
import {
    MdRemove,
    MdDeviceHub,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdTimeline
} from 'react-icons/md'
import { Graph } from 'react-d3-graph';

const data = {
    nodes: [{ id: 'SIBA platform' }, { id: 'test-hub' }, { id: 'dev' },  { id: 'dev2' }],
    links: [{ source: 'SIBA platform', target: 'test-hub' }, { source: 'test-hub', target: 'dev' },  { source: 'test-hub', target: 'dev2' }]
};
 
// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

const AdminPallet = ({
    children,
    sbState,
    setRef
}) => {

    return (
        <div id="AdminPallet" style={{ left: sbState ? '273px' : '28px' }}>
            <div className="hub-list">
                <header style={{
                    borderBottom: '1px solid #dadce0',
                    marginLeft: '3px',
                    marginRight: '3px',
                    paddingLeft: '2px'
                }}>
                    <span className="title">테스트 허브</span>
                </header>
                <div className="wrapper">
                    <div className="graph-area">
                        <header>
                            <MdTimeline style={{
                                float: 'left'
                            }} size={20} color="#333"/>
                            <span style={{
                                marginLeft: 5
                            }}>SIBA hub Monitor</span>
                            <button className="monitor-fold">
                                <MdKeyboardArrowUp size={16}/>
                            </button>
                        </header>
                        <div className="graph-area-wrapper">
                            <div className="chart-item">
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    display: true,
                                                    beginAtZero: true,
                                                    max: 100,
                                                    steps: 10,
                                                    stepValue: 10,
                                                }
                                            }]
                                        }
                                    }}
                                    height={200}
                                    data={{
                                        backgroundColor: '#fff',
                                        labels: [1, 2, 3, 4, 5, 6],
                                        datasets: [{
                                            label: 'IoT Hub CPU Load',
                                            // backgroundColor: 'rgb(255, 99, 132)',
                                            //borderColor: '#4A4D57',
                                            data: [
                                                {x: 10, y:0},
                                                {x: 20, y:1},
                                                {x: 30, y:1},
                                                {x: 30, y:4},
                                                {x: 40, y:0},
                                                {x: 40, y:10},
                                            ]
                                        }]
                                    }} />
                            </div>
                            <div className="chart-item">
                                <Line
                                    // width="100%"
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    display: true,
                                                    beginAtZero: true,
                                                    max: 100,
                                                    steps: 10,
                                                    stepValue: 10,
                                                }
                                            }]
                                        }
                                    }}
                                    height={200}
                                    data={{
                                        backgroundColor: '#fff',
                                        labels: [1, 2, 3, 4, 5, 6],
                                        datasets: [{
                                            label: 'IoT Hub CPU Temperature',
                                            // backgroundColor: 'rgb(255, 99, 132)',
                                            //borderColor: '#4A4D57',
                                            data: [0, 10, 5, 2, 20, 30, 45]
                                        }]
                                    }} />
                            </div>
                            <div className="chart-item">
                                <HorizontalBar
                                    height={190}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                    data={{
                                        backgroundColor: '#fff',
                                        labels: ['used', 'free', 'buffered', 'cached'],
                                        datasets: [{
                                            label: 'IoT Hub Memory Usage',
                                            //borderColor: '#4A4D57',
                                            data: [
                                                { x: 20, y: '1' },
                                                { x: 10, y: '1' },
                                                { x: 200, y: '1' },
                                                { x: 20, y: '1' }
                                            ]
                                        }]
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="admin-pallet">
                        <div className="side-bar">

                        </div>
                        <div className="network-graph">
                            {children}
                            {/* <Graph
                                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                data={data}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="admin-console" >
                    <header>
                        <span>Run :</span>
                        <span className="console-hub-info">
                            <MdDeviceHub color="#03E103" style={{
                                position: 'absolute',
                                left: 4,
                                top: 4
                            }} />
                            SIBA hub [ 192.168.0.21 ]
                        </span>
                        <button className="console-fold-btn">
                            <MdRemove size={20} />
                        </button>
                    </header>
                    <div ref={ref => setRef(ref)} className="console-body">

                    </div>
                    <div className="admin-console-helper">
                        <button className="selected">
                            <span>terminal</span>
                        </button>
                        <button className="unselected">
                            <span>logs</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPallet;