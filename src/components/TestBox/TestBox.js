import React, { Fragment } from 'react';
import './TestBox.css';
import { SendJsonGenerator } from 'utils'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const TestBox = ({
    children
}) => {
    const codeString = SendJsonGenerator()
    return (
        <div id="TestBox">
            <div className="test-area">
                <div className="test-title">테스트 디바이스 정보</div>
                <div className="test-area-body">
                    <div className="set">
                        <span className="key">모델명</span>
                        <span className="value">ㅌㅌ</span>
                    </div>
                    <div className="set">
                        <span className="key">인증키</span>
                        <span className="value">b5727add99fa41018d2e832af935d0de</span>
                    </div>
                    <div className="set">
                        <span className="key">연결 허브</span>
                        <span className="value">virtual hub #1</span>
                    </div>
                    <div className="set">
                        <span className="key">연결 상태</span>
                        <span className="value">connected</span>
                    </div>
                    <div className="set">
                        <span className="key">IP주소</span>
                        <span className="value">172.0.0.13</span>
                    </div>
                </div>
            </div>
            <div className="test-area">
                <div className="test-title">전송 JSON포맷 데이터</div>
                <div className="json-text">
                    <SyntaxHighlighter
                        lineNumberStyle={{
                            color: '#888'
                        }}
                        language='json'
                        style={dark}
                        customStyle={{
                            margin: 0
                        }}
                        showLineNumbers>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
            <div className="test-area">
                <div className="test-title">디바이스/허브 응답 데이터</div>
                <div className="json-text">
                    <SyntaxHighlighter
                        lineNumberStyle={{
                            color: '#888'
                        }}
                        language='json'
                        style={dark}
                        customStyle={{
                            margin: 0
                        }}
                        showLineNumbers>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    )
}

export default TestBox;