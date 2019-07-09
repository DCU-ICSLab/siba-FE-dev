import React, { Fragment } from 'react';
import './VirtualHub.css';
import { MdSettings, MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LogicalDeviceAddBtn = ({ deviceAddModalChange }) => {

    return (
        <div id="LogicalDeviceAddBtn">
            <div className="add">
                <button onClick={deviceAddModalChange}>
                    <MdAdd size={36} style={{ marginTop: 4 }} />
                </button>
            </div>
        </div>
    )
}

const LogicalDevice = ({ dev }) => {

    const status = true;
    const className = 'name' + (status ? ' on' : ' off');

    return (
        <div id="LogicalDevice" style={{ opacity: status ? 1 : 0.5 }}>
            <div className="inner">
                <Link to={{
                    pathname: `/device/${dev.get('devId')}`,
                    state: {
                        dev: dev
                    }
                }} style={{
                    textDecoration: 'none',
                    color: '#000',
                }}>
                    <div>
                        <span className={className}>{dev.get('devDefName')}</span>
                    </div>
                    <div className="dkey">디바이스 ID: {dev.get('devId')}</div>
                </Link>
            </div>
        </div>
    )
}

const VirtualHub = ({ hub, deviceAddModalChange }) => {

    const size = hub.get('devices').size;
    const hubId = hub.get('vhubId');
    const hubStatus = hub.get('hubStatus');
    const hubSt = hubStatus ? 'hub-on' : 'hub-off';

    return (
        <div id="VirtualHub">
            <div className="inner">
                <header className={hubSt}>
                    <span className="title">virtual IoT hub</span>
                    <span className="vcode">{`  (key: ${hubId})`}</span>
                    <Link 
                    to={{
                        pathname: `/hub/${hubId}`,
                        state: {
                            hub: hub
                        }
                    }}
                    className="hub-set-btn"
                    >
                        <MdSettings style={{ float: "right", marginTop: 2 }} size={16} />
                    </Link>
                </header>
                <div className="info">
                    {hub.get('hubKey')}
                </div>
                <div className="container">
                    {
                        hub.get('devices').map((dev, index) => {
                            return <LogicalDevice dev={dev} key={dev.get('devId')} />
                        })
                    }
                    {size !== 9 && <LogicalDeviceAddBtn deviceAddModalChange={() => deviceAddModalChange(hub.get('vhubId'))} />}
                </div>
                <footer>
                    <span className="total">Total <strong>{`(${size}/9)`}</strong></span>
                    <span className="on">on <strong>(9)</strong></span>
                    <span className="off">off <strong>(9)</strong></span>
                </footer>
            </div>
        </div>
    )
}

export default VirtualHub;