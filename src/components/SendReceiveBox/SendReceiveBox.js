import React, { Fragment } from 'react';
import './SendReceiveBox.css';
import { SendJsonGenerator } from 'utils'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PacmanLoader} from 'react-spinners';

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

                <div id="TestInfoCard">
                    <header>
                        <span className="test-name"><strong></strong></span>
                        <span className="test-code"># </span>
                    </header>
                    <div className="test-card-body">
                        <div className="duration">
                        </div>
                        <div className="finished">
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div style={{
                        width: '50%'
                    }}>
                        <div className="test-upper">
                            <span>SIBA IoT hub</span>
                        </div>
                        <div className="test-body">
                            <div>
                                <span>Http status</span>
                                <span>200</span>
                            </div>
                            <div>
                                <span>message</span>
                                <span>12234ff</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        width: '50%'
                    }}>
                        <div className="test-upper">
                            <span>target device</span>
                        </div>
                        <div className="test-body">
                        </div>
                    </div>
                    {/* {isPending && 
            <div className="pender">
                <PacmanLoader
                    css={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '20px'
                    }}
                    sizeUnit={"px"}
                    size={20}
                    // color={'#87D5B7'}
                    color={'#CDC53C'}
                    loading={isPending}
                />
            </div>} */}
                </div>
            </div>
        </div>
    )
}

export default SendReceiveBox;