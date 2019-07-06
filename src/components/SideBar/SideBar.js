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

const SideBar = ({ sbToggle, sbState, hubList }) => {
    return (
        <div id="SideBar" style={{ left: sbState ? '5px' : '-240px' }}>
            <header>
                <span>device explorer</span>
            </header>
            <div className="container">
                <div className="inner">
                    <div className="list-group">
                        <div className="link-item">
                            <Link pathname="/main">
                                <MdHome size={20} color="#6397FD" style={{
                                    display: 'inline-block',
                                    margin: '1px'
                                }}/>
                                <span>메인 페이지</span>
                            </Link>
                        </div>
                        <div className="link-item">virtual hub group ({hubList.size})</div>
                        {
                            hubList.map(hub=>{
                                return (
                                <div>
                                <Link to={{
                                    pathname: `/hub/${hub.get('vhubId')}`,
                                    state: {
                                        hub: hub
                                    }
                                }} style={{
                                    textDecoration: 'none',
                                    color: '#000',
                                }}>
                                    virtual IoT Hub #{hub.get('vhubId')} ({hub.get('devices').size})
                                </Link>
                                </div>
                                )
                            })
                        }
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