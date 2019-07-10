import React, { Fragment } from 'react';
import './VirtualHub.css';
import { MdSettings, MdAdd, MdExpandLess, MdExpandMore } from 'react-icons/md';
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

const VirtualHub = ({ hub, deviceAddModalChange, foldChange }) => {

    const size = hub.get('devices').size;
    const fold = hub.get('fold');
    const hubId = hub.get('vhubId');
    const hubStatus = hub.get('hubStatus');
    const hubSt = hubStatus ? 'hub-on' : 'hub-off';
    const hubType = hub.get('hubType')==='1' ? '범용 서비스 허브' : '고정형 서비스 허브'

    return (
        <div id="VirtualHub" style={{
            height: !fold ? '290px' : '117px'
        }}>
            <div className="inner">
                <header className={hubSt}>
                    <span className="title">{hub.get('hubName')}</span>
                    <span className="vcode">{`  (ID: ${hubId})`}</span>
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
                        <span style={{
                            float: 'right',
                            fontSize: '11px',
                            marginRight: '2px'
                        }}>관리</span> 
                    </Link>
                </header>
                <div className="info">
                    <div className="row">
                        <div className="key">인증키</div>
                        <div className="value">{hub.get('hubKey')}</div>
                    </div>
                    {/* <div className="row">
                        <div className="key">등록 장치</div>
                        <div className="value">{hub.get('devices').size}</div>
                    </div> */}
                    <div className="row" style={{
                        borderBottom: '1px solid #dadce0'
                    }}>
                        <div className="key">허브 타입</div>
                        <div className="value">{hubType}</div>
                    </div>
                    <div className="row sub-title">
                        <span>등록 디바이스 ({hub.get('devices').size})</span>
                        <button className="expand-btn" onClick={(e)=>{foldChange(hubId)}}>
                            {!fold ? <MdExpandLess size={20}></MdExpandLess>
                            : <MdExpandMore size={20}></MdExpandMore>}
                        </button>
                    </div>
                </div>
                {!fold && <div className="container">
                    {
                        hub.get('devices').map((dev, index) => {
                            return <LogicalDevice dev={dev} key={dev.get('devId')} />
                        })
                    }
                    {size !== 9 && <LogicalDeviceAddBtn deviceAddModalChange={() => deviceAddModalChange(hub.get('vhubId'))} />}
                </div>}
                {/*<footer>
                    <span className="total">Total <strong>{`(${size}/9)`}</strong></span>
                </footer> */}
            </div>
        </div>
    )
}

export default VirtualHub;