import React, { Component, Fragment } from 'react';
import { MdClose, MdCheckCircle, MdAutorenew } from 'react-icons/md'
import './DeviceListModal.css';
import Modal from 'react-modal';
import SIBA from 'resources/siba.jpg'

const LogicalDevice = ({ idx, dev, selectDevRepo }) => {


    return (
        <div id="LogicalDevice" style={{
            marginBottom: 35,
            paddingLeft: 7
        }}>
            {dev.get('vhubId')!==null && 
            <div className="dev-repo-shadow" onClick={(e)=>{selectDevRepo(idx, dev, true)}}>
                <MdCheckCircle color="#fff" size={35} style={{
                    // position: 'absolute'
                    marginTop: 27
                }}/>
            </div>}
            <div className="inner repo-wrapper-item" style={{
                height: '93px'
            }} onClick={(e)=>{selectDevRepo(idx, dev)}}>
                <div>
                    <header style={{
                        height: '23px'
                    }}>
                        <img src={SIBA} width={25} style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            margin: 0
                        }}></img>
                        <span style={{
                            fontSize: '13px',
                            marginLeft: '33px'
                        }}>{dev.get('devName')}</span>
                    </header>
                    <div style={{
                        paddingLeft: '9px'
                    }}>
                        <div className="row">
                            <div className="key" style={{
                                width: '30%'
                            }}>디바이스 타입</div>
                            <div className="value" style={{
                                width: '70%'
                            }}>{dev.get('devType')}</div>
                        </div>
                        {/* <div className="row">
                            <div className="key" style={{
                                width: '30%'
                            }}>인증키</div>
                            <div className="value" style={{
                                width: '70%'
                            }}>{dev.get('authKey')}</div>
                        </div> */}
                        <div className="row">
                            <div className="key">생성일</div>
                            <div className="value">복합 디바이스</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DeviceListModal = ({ deviceModal, deviceInfo, deviceAddModalChange, selectDevRepo, linkHubAndRepo, limitSize, listSize}) => {
    return (
        <Modal
            isOpen={deviceModal}
            style={{
                overlay: {
                    zIndex: 9999,
                    backgroundColor: 'rgba(33,33,33,0.2)'
                },
                content: {
                    padding: 0,
                    borderRadius: '2px',
                    border: '1px solid #dadce0',
                    backgroundColor: '#fff',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    // left: '70px',
                    // right: '70px',
                    margin: 'auto',
                    height: '468px',
                    maxWidth: '813px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="DeviceAddModalWrapper">
                <header>
                    <span className="title">디바이스 저장소 선택</span>
                    <button className="close-btn" onClick={deviceAddModalChange}>
                        <MdClose size={16} />
                    </button>
                </header>
                <div className="wrap" style={{
                    padding: '5px'
                }}>
                    <div style={{
                        fontSize: '12px',
                        marginLeft: '5px'
                    }}>
                        <span>허브에 연결할 디바이스 저장소를 선택하세요. (최대 {limitSize}개 연결 가능)</span>
                        <button 
                        className="repo-selection-btn"
                        onClick={(e)=>linkHubAndRepo()}
                        disabled={deviceInfo.size===0}>허브 연결</button>
                    </div>
                    <div className="repo-wrapper">
                        {deviceInfo.size===0 && <div className="dev-list-null">연결 가능한 저장소가 없습니다.</div>}
                        {deviceInfo.map((dev,index)=>{
                                return <LogicalDevice 
                                idx={index} 
                                key={index} 
                                dev={dev} 
                                selectDevRepo={selectDevRepo}/>
                        })}
                        {/* <LogicalDevice />
                        <LogicalDevice />
                        <LogicalDevice /> */}
                    </div>
                    {/* <div className="center">
                        <button onClick={deviceAddModalChange}>취소</button>
                        <button style={{ marginRight: 0 }} onClick={createDevice}>등록</button>
                    </div> */}
                </div>
            </div>
        </Modal >
    )
}

export default DeviceListModal;