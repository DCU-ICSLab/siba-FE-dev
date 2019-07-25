import React, { Fragment } from 'react';
import './SendReceiveBox.css';
import { SendJsonGenerator } from 'utils'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SendReceiveBox = ({
    children,
    cmdList
}) => {
    console.log(cmdList)
    const codeString = SendJsonGenerator(cmdList)
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
                        language="json"
                        style={tomorrow}
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