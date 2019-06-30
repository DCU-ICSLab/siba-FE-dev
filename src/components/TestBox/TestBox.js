import React, { Fragment } from 'react';
import './TestBox.css';

const TestBox = ({
    children
}) => {

    return (
        <div id="TestBox">
            <div className="test-area">
                <div className="test-title">테스트 디바이스 정보</div>
            </div>
            <div className="test-area">
                <div className="test-title">전송 JSON포맷 데이터</div>
            </div>
            <div className="test-area">
                <div className="test-title">디바이스/허브 응답 데이터</div>
            </div>
        </div>
    )
}

export default TestBox;