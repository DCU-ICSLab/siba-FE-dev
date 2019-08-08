import React, { Component, Fragment } from 'react';
import { MdClose, MdCached } from 'react-icons/md'
import './HubAddModalWrapper.css';
import Modal from 'react-modal';

const CheckBox = ({ children }) => {
    return (
        <div id="checkbox">
            <input type="checkbox" id="smart-home" name="1" /><label htmlFor="smart-home">{children}</label>
        </div>
    )
}

const HubAddModalWrapper = ({ deviceModal, refreshAuthKey, regInput, deviceAddModalChange, valueInput, createDevice }) => {
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
                    height: '446px',
                    maxWidth: '800px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="DeviceAddModalWrapper">
                <header>
                    <span className="title">개발용 SIBA 허브 등록</span>
                    <button className="close-btn" onClick={deviceAddModalChange}>
                        <MdClose size={16} />
                    </button>
                </header>
                <div className="wrap">
                    <div className="category">기본 정보 (필수 입력)</div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>허브 명</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="hubName"
                                type="text"
                                onChange={valueInput}
                                value={regInput.get('hubName')}>
                            </input>
                            <div className="input-info">최대 20자까지, 한글, 영문, 숫자, 띄워쓰기 가능하며, 기호는 사용 불가.</div>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>허브 인증 키</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                type="text"
                                disabled
                                value={regInput.get('authKey')}>
                            </input>
                            <button className="refresh-btn" onClick={refreshAuthKey}>
                                <MdCached
                                    size={14}>
                                </MdCached>
                            </button>
                            <div className="input-info">허브를 식별하는 32자리 키 값, hub-config.yml에 포함해야 하는 값</div>
                        </div>
                    </div>
                    <div className="wrap-item" style={{
                        borderBottom: '1px solid #EEE',
                        paddingBottom: '15px',
                        marginBottom: '12px'
                    }}>
                        <div className="input-title must">
                            <span>허브 타입</span>
                        </div>
                        <input type="radio" name="hubType" value="1" checked={regInput.get('hubType')==='1'} onChange={valueInput}/><span className="radio"> 범용 서비스</span>
                        <input type="radio" name="hubType" value="2" checked={regInput.get('hubType')==='2'} onChange={valueInput}/><span className="radio"> 고정형 서비스</span>
                    </div>
                    <div className="center">
                        <button onClick={deviceAddModalChange}>취소</button>
                        <button style={{ marginRight: 0 }} onClick={createDevice}>등록</button>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default HubAddModalWrapper;