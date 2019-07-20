import React, { Fragment } from 'react';
import {
    MdNavigateBefore,
    MdDeviceHub,
    MdNavigateNext,
    MdAdd,
    MdHome
} from 'react-icons/md'
import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = ({ sbToggle, sbState, hubList, deviceList, location }) => {
    console.log('ddddddddddddd')
    console.log(location)
    return (
        <div id="SideBar" style={{ left: sbState ? '5px' : '-240px' }}>
            <header>
                <span>EXPLORER</span>
            </header>
            <div className="container">
                <div className="inner">
                    <div className="list-group">
                        {/* <div className="link-item"><Link to={{
                                pathname: '/main'
                            }}
                            style={{
                                textDecoration: 'none',
                                color: '#000',
                            }}>
                                <span>메인 관리자 콘솔</span>
                            </Link>
                        </div> */}
                        <div className="link-item" 
                        style={{
                            backgroundColor: location.pathname==='/main' ? '#DEDFE0' : 'transparent',
                            color: location.pathname==='/main' ? '#000' : '#333'
                        }}>메인 관리자 콘솔
                        <div className="link-item">SIBA 허브 집합 ({hubList.size})</div>
                        {
                            hubList.map((hub, index) => {
                                return (
                                    <div className="element" key={index}>
                                        <Link to={{
                                            pathname: `/hub/${hub.get('vhubId')}`,
                                            state: {
                                                hub: hub
                                            }
                                        }}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#000',
                                            }}>
                                            {hub.get('hubName')} ({hub.get('devices').size}/9)
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        <div className="link-item">개발 디바이스 저장소 ({deviceList.size})</div>
                        {
                            deviceList.map((dev, index) => {
                                return (
                                    <div className="element" key={index}>
                                        <Link to={{
                                            pathname: `/hub/${dev.get('devId')}`,
                                            state: {
                                                dev: dev
                                            }
                                        }}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#000',
                                            }}>
                                            {dev.get('devName')}
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        </div>
                        
                        {/* <div className="link-item">SIBA Hub</div> */}
                    </div>
                </div>
            </div>
            <div className="btn-shadow">
            </div>
            <div className="btn" onClick={sbToggle}>
                {sbState ?
                    <MdNavigateBefore size={22} style={{
                        zIndex: 9999,
                        position: "absolute",
                        left: '-22px'
                    }} />
                    : <MdNavigateNext size={22} style={{
                        zIndex: 9999,
                        position: "absolute",
                        left: '-22px'
                    }} />}
            </div>
        </div>
    )
}

export default SideBar;