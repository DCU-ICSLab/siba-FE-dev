import React, { Fragment } from 'react';
import './DeviceAddBox.css';

const CheckBox = ({ children }) => {
    return (
        <div id="checkbox">
            <input type="checkbox" id="smart-home" name="1" /><label htmlFor="smart-home">{children}</label>
        </div>
    )
}

const DeviceAddBox = ({ children, deviceAddBoxChangeFunc }) => {
    return (
        <div id="DeviceAddBox">
            <div className="wrap">
                <header>신규 개발 디바이스 등록</header>
                <div className="category">기본 정보 (필수 입력)</div>
                <div className="wrap-item">
                    <div className="input-title must">
                        <span>디바이스 명</span>
                    </div>
                    <div className="input-item">
                        <input className="input" type="text"></input>
                        <div className="input-info">최대 20자까지, 한글, 영문, 숫자, 띄워쓰기 가능하며, 기호는 사용 불가.</div>
                    </div>
                </div>
                <div className="wrap-item">
                    <div className="input-title must">
                        <span>디바이스 인증 키</span>
                    </div>
                    <div className="input-item">
                        <input className="input" type="text" disabled value={'12WCAfG6TwdDf0Zx'}></input>
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
                        <input className="input" type="text"></input>
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
                    <button onClick={deviceAddBoxChangeFunc}>취소</button>
                    <button style={{marginRight: 0}}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default DeviceAddBox;