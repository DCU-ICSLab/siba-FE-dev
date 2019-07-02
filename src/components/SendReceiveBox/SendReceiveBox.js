import React, { Fragment } from 'react';
import './SendReceiveBox.css';
import { SendJsonGenerator } from 'utils'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark, idea } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SendReceiveBox = ({
    children
}) => {
    const codeString = SendJsonGenerator()
    return (
        <div id="SendReceiveBox">
            <div className="test-area">
                <div className="test-title">
                    <span>전송 JSON포맷 데이터</span>
                </div>
                <div className="json-text">
                    <SyntaxHighlighter
                        lineNumberStyle={{
                            color: '#888'
                        }}
                        language='json'
                        style={idea}
                        customStyle={{
                            margin: 0,
                            padding: '5px',
                            height: '100%',
                            overflow: 'auto'
                        }}
                        showLineNumbers>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
            <div className="test-area" style={{
                borderLeft: '1px solid #dadce0'
            }}>
                <div className="test-title">
                    <span>응답 데이터</span>
                </div>
                <div className="test-title">
                    <span>전송 시간</span>
                </div>
                <div className="json-text">
                    
                </div>
            </div>
        </div>
    )
}

export default SendReceiveBox;