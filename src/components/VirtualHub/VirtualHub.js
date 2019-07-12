import React, { Fragment } from 'react';
import './VirtualHub.css';
import { MdSettings, MdAdd, MdExpandLess, MdExpandMore, MdClear } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SIBA from 'resources/siba.jpg'
// import { Progress } from 'react-sweet-progress';
// import "react-sweet-progress/lib/style.css";

const LogicalDeviceAddBtn = ({ deviceListModalChange}) => {

    return (
        <div id="LogicalDeviceAddBtn">
            <div className="add">
                <button onClick={deviceListModalChange}>
                    <MdAdd size={36} style={{ marginTop: 4 }} />
                </button>
            </div>
        </div>
    )
}

const LogicalDevice = ({ dev, repoDeletion,hubId, redirectDevicePage }) => {

    const devId = dev.get('devId')

    return (
        <div id="LogicalDevice" style={{ marginTop: 5}}>
            <div className="inner" onClick={()=>redirectDevicePage(devId, dev)}>
                <img src={SIBA} width={40}></img>
                <div className="dev-info">
                    <header>
                        <span>{dev.get('devName')}</span>
                        <button 
                        className="dev-delete-btn"
                        onClick={(e)=>{
                            e.stopPropagation();
                            repoDeletion(hubId,devId)}
                        }>
                            <MdClear size={11} style={{
                                position: 'absolute',
                                right: '2px',
                                top: '2px'
                            }}/>
                        </button>
                    </header>
                    <div className="row" style={{
                        borderTop: '1px solid #dadce0'
                    }}>
                        <div className="key">디바이스 타입</div>
                        <div className="value">복합 디바이스</div>
                    </div>
                    <div className="row">
                        <div className="key">디바이스 배포 상태</div>
                        <div className="value">YES</div>
                    </div>
                </div>
                {/* <Link to={{
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
                </Link> */}
            </div>
        </div>
    )
}

const VirtualHub = ({ hub, redirectDevicePage, foldChange, deviceListModalChange, repoDeletion }) => {

    const size = hub.get('devices').size;
    const fold = hub.get('fold');
    const hubId = hub.get('vhubId');
    const hubStatus = hub.get('hubStatus');
    const hubSt = hubStatus ? 'hub-on' : 'hub-off';
    const hubType = hub.get('hubType')==='1' ? '범용 서비스 허브' : '고정형 서비스 허브'

    return (
        <div id="VirtualHub" style={{
            height: !fold ? 200+size*69 : 117
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
                        <span>등록 디바이스 ({hub.get('devices').size}/9)</span>
                        {/* <Progress 
                        status="success"
                        percent={1*11}
                        style={{
                            display: 'inline',
                            width: '120px',
                            float: 'right',
                            position: 'absolute',
                            right: '20px',
                            top: '7px'
                        }} 
                        theme={{
                            success: {
                                symbol: ' '
                            }
                        }}/> */}
                        <button className="expand-btn" onClick={(e)=>{foldChange(hubId)}}>
                            {!fold ? <MdExpandLess size={20}></MdExpandLess>
                            : <MdExpandMore size={20}></MdExpandMore>}
                        </button>
                    </div>
                </div>
                {!fold && <div className="container" style={{
                    height: 77+size*69
                }}>
                    {/* <LogicalDevice/> */}
                    {
                        hub.get('devices').map((dev, index) => {
                            return(
                            <LogicalDevice 
                            dev={dev} 
                            hubId={hubId}
                            key={dev.get('devId')} 
                            repoDeletion={repoDeletion}
                            redirectDevicePage={redirectDevicePage}/>)
                        })
                    }
                    {size !== 9 && 
                    <LogicalDeviceAddBtn 
                        deviceListModalChange={() => deviceListModalChange(hub.get('vhubId'), 9-size)} 
                    />}
                </div>}
                {/*<footer>
                    <span className="total">Total <strong>{`(${size}/9)`}</strong></span>
                </footer> */}
            </div>
        </div>
    )
}

export default VirtualHub;