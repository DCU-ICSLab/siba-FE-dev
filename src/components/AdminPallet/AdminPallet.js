import React, { Fragment } from 'react';
import './AdminPallet.css';
import moment from 'moment';
import { Line, HorizontalBar } from 'react-chartjs-2';
import { BoxButton } from 'components';
import {
    MdRemove,
    MdDeviceHub,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdTimeline,
    MdClear
} from 'react-icons/md'
import { Graph } from 'react-d3-graph';
import SIBA from 'resources/siba.jpg'

const data = {
    nodes: [{ id: 'SIBA platform' }, { id: 'test-hub' }, { id: 'dev' }, { id: 'dev2' }],
    links: [{ source: 'SIBA platform', target: 'test-hub' }, { source: 'test-hub', target: 'dev' }, { source: 'test-hub', target: 'dev2' }]
};

const ConnectedDevice = ({ }) => {
    return (
        <div id="ConnectedDevice">
            <img src={SIBA} width={40}></img>
            <div className="dev-info">
                <header>
                    <span>test</span>
                    <button
                        className="dev-delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            // repoDeletion(hubId, devId)
                        }
                        }>
                        <MdClear size={11} style={{
                            position: 'absolute',
                            right: '2px',
                            top: '2px'
                        }} />
                    </button>
                </header>
                <div className="drow" style={{
                    borderTop: '1px solid #dadce0'
                }}>
                    <div className="dkey">디바이스 타입</div>
                    <div className="dvalue">복합 디바이스</div>
                </div>
                <div className="drow">
                    <div className="dkey">디바이스 배포 상태</div>
                    <div className="dvalue">YES</div>
                </div>
            </div>
        </div>
    )
}

const AdminPallet = ({
    children,
    sbState,
    setRef,
    hub,
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
                <BoxButton enabled={true} left={5} width={80}>
                    허브 정보 조회
                </BoxButton>
                <BoxButton enabled={true} left={97} width={80}>
                    허브 모니터링
                </BoxButton>
                <BoxButton enabled={true} left={189} width={80}>
                    데이터베이스
                </BoxButton>
                <div className="wrapper">
                    {/* <div className="graph-area">
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
                                            xAxes: [{
                                                display: true,
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    display: true,
                                                    beginAtZero: true,
                                                    max: 100,
                                                    steps: 10,
                                                    stepValue: 10,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'percentage (%)'
                                                }
                                            }]
                                        },
                                        // title: {
                                        //     display: true,
                                        //     text: 'IoT Hub CPU Load'
                                        // }
                                    }}
                                    height={200}
                                    data={{
                                        backgroundColor: '#fff',
                                        labels: ['', '', '', '', '', ''],
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
                    </div> */}
                    <div className="admin-pallet">
                        <div className="side-bar">
                            <table className="hub-log-list">
                                <thead>
                                    <tr>
                                        <th style={{
                                            width: '22px',
                                            borderLeft: 'none'
                                        }}>No.</th>
                                        <th
                                            style={{
                                                width: '99px',
                                            }}>수행시간</th>
                                        <th
                                            style={{
                                                width: '35px',
                                            }}>장치</th>
                                        <th style={{
                                            width: '81px',
                                        }}>메시지</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div className="network-graph">
                            <div className="graph-upper">
                                <header>
                                    {/* 인증키: <span>{hub.get('hubKey')}</span> */}
                                    인증키: <span style={{
                                        borderLeft: '5px solid #6E93CD',
                                        marginLeft: 2,
                                        paddingLeft: 3
                                    }}>4b3b5e1275604f1cb70704f8236c7242</span>
                                </header>
                                <div className="graph-upper-detail">
                                    <div>
                                        <div className="row">
                                            <div className="key">
                                                <span>허브 운영체제</span>
                                            </div>
                                            <div className="value">raspbian</div>
                                        </div>
                                        <div className="row">
                                            <div className="key">
                                                <span>허브 IPv4</span>
                                            </div>
                                            <div className="value">192.168.0.7</div>
                                        </div>
                                        <div className="row">
                                            <div className="key">
                                                <span>허브 CPU</span>
                                            </div>
                                            <div className="value">armv71l</div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="graph-title">
                                    <span>SIBA 허브 네트워크 구성정보</span>
                                </div>
                            </div>
                            <div className="graph-pallet">
                                <Graph
                                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                    data={data}
                                    config={{
                                        nodeHighlightBehavior: true,
                                        height: 500,
                                        node: {
                                            color: '#6E93CD',
                                            size: 120,
                                            highlightStrokeColor: 'blue'
                                        },
                                        link: {
                                            highlightColor: 'lightblue',
                                            color: '#4A4D57'
                                        }
                                    }}
                                />
                                <div className="graph-info">
                                    <span>Nodes: 4 | Links: 3</span>
                                </div>
                            </div>
                            <div className="graph-dev-side">
                                <ConnectedDevice />
                                <ConnectedDevice />
                                <ConnectedDevice />
                            </div>
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