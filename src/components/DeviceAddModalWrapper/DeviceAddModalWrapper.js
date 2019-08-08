import React, { Component, Fragment } from 'react';
import { MdClose, MdCached } from 'react-icons/md'
import './DeviceAddModalWrapper.css';
import Modal from 'react-modal';

const CheckBox = ({ children }) => {
    return (
        <div id="checkbox">
            <input type="checkbox" id="smart-home" name="1" /><label htmlFor="smart-home">{children}</label>
        </div>
    )
}

const DeviceAddModalWrapper = ({ deviceModal, refreshAuthKey, regInput, deviceAddModalChange, valueInput, createDevice }) => {
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
                    <span className="title">신규 개발 디바이스 등록</span>
                    <button className="close-btn" onClick={deviceAddModalChange}>
                        <MdClose size={16} />
                    </button>
                </header>
                <div className="wrap">
                    <div className="category">기본 정보 (필수 입력)</div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>디바이스 명</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="devName"
                                type="text"
                                onChange={valueInput}
                                value={regInput.get('devName')}>
                            </input>
                            <div className="input-info">최대 20자까지, 한글, 영문, 숫자, 띄워쓰기 가능하며, 기호는 사용 불가.</div>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>디바이스 인증 키</span>
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
                            <div className="input-info">디바이스를 식별하는 16자리 키 값, init함수의 인자 값으로 사용.</div>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>디바이스 타입</span>
                        </div>
                        <input type="radio" name="type" value="1" /><span className="radio"> 제어 타입</span>
                        <input type="radio" name="type" value="2" /><span className="radio"> 센싱 타입</span>
                        <input type="radio" name="type" value="3" /><span className="radio"> 제어+센싱 타입</span>
                    </div>
                    <div className="category">상세 정보 (선택 입력)</div>
                    <div className="wrap-item">
                        <div className="input-title">
                            <span>사용자 정의 모델명</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                type="text"
                                name="devDefName"
                                value={regInput.get('devDefName')}
                                onChange={valueInput}>
                            </input>
                            <div className="input-info">실사용자에게 노출되는 디바이스 이름 (미적용 시 디바이스 명으로 생성)</div>
                        </div>
                    </div>
                    <div className="wrap-item" style={{
                        borderBottom: '1px solid #EEE',
                        paddingBottom: '15px',
                        marginBottom: '12px'
                    }}>
                        <div className="input-title">
                            <span>카테고리</span>
                        </div>
                        <div className="input-item">
                            <div className="checkbox-wrap">
                                <CheckBox>스마트홈</CheckBox>
                                <CheckBox>스마트시티</CheckBox>
                                <CheckBox>농업</CheckBox>
                                <CheckBox>미디어</CheckBox>
                                <CheckBox>교육</CheckBox>
                                <CheckBox>엔터테인먼트</CheckBox>
                                <CheckBox>스마트팩토리</CheckBox>
                                <CheckBox>의료</CheckBox>
                            </div>
                        </div>
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

export default DeviceAddModalWrapper;