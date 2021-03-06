import React, { Fragment } from 'react';
import './HubPallet.css';
import moment from 'moment';
import Moment from 'react-moment';

const HubPallet = ({
    children,
    sbState,
    size,
    deviceAddModalChange,
    deviceInfo,
    linkDevicePage,
    logList,
    onClick
}) => {

    return (
        <div id="HubPallet" style={{ left: sbState ? '273px' : '28px' }}>
            <div className="hub-list">
                <header style={{
                    borderBottom: '1px solid #dadce0',
                    marginLeft: '3px',
                    marginRight: '3px',
                    paddingLeft: '2px'
                }}>
                    <span className="title">개발용 허브 집합</span>
                </header>
                <div className="wrapper">
                    <div className="hub-list-info">
                        <div>
                            <span>Total: {size}</span>
                        </div>
                        <button onClick={onClick}>
                        허브 생성
                        </button>
                    </div>
                    <div className="hub-pallet">
                        {children}
                    </div>
                </div>
                <div className="wrapper-side">
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
                                    }}>허브</th>
                                <th style={{
                                    width: '81px',
                                }}>메시지</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logList.map((log, index) => {

                                let msg = 'disconnect'
                                switch(log.get('messageType')){
                                    case '1':
                                        msg = 'connect'
                                        break;
                                    default:
                                        break;
                                }

                                return (
                                    <tr key={index}>
                                        <td style={{
                                            width: '23px',
                                            borderRight: '1px solid #dadce0',
                                            // backgroundColor: '#CEDDED',
                                            fontSize: '10px',
                                            color: '#777'
                                        }}>{index+1}</td>
                                        <td style={{
                                            width: '101px',
                                            // borderRight: '1px solid #dadce0'
                                        }}>{moment(log.get('actTime')).format('YYYY-MM-DD HH:mm')}</td>
                                        {/* 2019-12-07 13:15 */}
                                        <td style={{
                                            width: '36px',
                                            // borderRight: '1px solid #dadce0'
                                        }}>{log.get('hubId')}</td>
                                        <td style={{
                                            width: '66px',
                                            textAlign: 'center',
                                            paddingLeft: '4px'
                                        }}>
                                            <span style={{
                                                backgroundColor: log.get('messageType')==='1' ? '#6B95DA' : '#444A57',
                                                color: '#fff',
                                                fontSize: 10,
                                                // border: '1px solid #aaa',
                                                padding: '1px 2px',
                                                borderRadius: '2px',
                                                fontWeight: '350',
                                                width: '58px',
                                                display: 'block'
                                            }}>{msg}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="device-repo">
                <header>
                    <span className="title">개발 디바이스 저장소</span>
                </header>
                <div className="repo-toolbar">
                    <div className="repo-toolbar-info">
                        <span>Total: {deviceInfo.size}</span>
                    </div>
                    <button onClick={deviceAddModalChange}>
                        저장소 생성
                    </button>
                </div>
                <div className="device-repo-wrapper">
                    <table className="device-repo-list" style={{
                        borderRight: 'none'
                    }}>
                        <thead>
                            <tr>
                                <th style={{
                                    width: '40px',
                                    borderLeft: 'none'
                                }}>No.</th>
                                <th>디바이스 명</th>
                                <th>디바이스 타입</th>
                                <th>디바이스 인증키</th>
                                <th>배포상태</th>
                                <th>연결상태</th>
                                <th>연결허브</th>
                                <th>최근 수정일시</th>
                                <th>최근 배포일시</th>
                                <th>분류</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                deviceInfo.map((device, index) => {
                                    let typeString = '복합'

                                    switch (device.get('devType')) {
                                        case '1':
                                            typeString = '제어'
                                            break;
                                        case '2':
                                            typeString = '센싱'
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <tr
                                        key={index} 
                                        className="dev-row" 
                                        onClick={(e) => { linkDevicePage(device.get('devId'), device) }}>
                                            <td style={{
                                                // backgroundColor: '#CEDDED',
                                                color: '#777',
                                            }}>{index + 1}</td>
                                            <td>{device.get('devName')}</td>
                                            <td>{typeString}</td>
                                            <td>
                                                {device.get('authKey')}
                                            </td>
                                            <td>
                                                <span className={'dep-state'+(device.get('depDate') ? '-on' : '-off')}>{device.get('depDate') ? 'YES' : 'NO'}</span>
                                            </td>
                                            <td>
                                                <span className={'con-state'+(device.get('vHubId') ? '-on' : '-off')}>{device.get('vHubId') ? 'YES' : 'NO'}</span>
                                            </td>
                                            <td>{device.get('vhubId') ? device.get('vhubId') : 'none'}</td>
                                            <td>{device.get('modDate') ? moment(device.get('modDate')).format('YYYY-MM-DD HH:mm') : '-'}</td>
                                            <td>{device.get('depDate') ? moment(device.get('depDate')).format('YYYY-MM-DD HH:mm') : '-'}</td>
                                            <td>-</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HubPallet;