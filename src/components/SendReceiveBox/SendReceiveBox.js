import React, { Fragment } from 'react';
import './SendReceiveBox.css';
import { SendJsonGenerator } from 'utils'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PacmanLoader} from 'react-spinners';
import {
    MdSend
} from 'react-icons/md'

const SendReceiveBox = ({
    children,
    cmdList,
    hubResult,
    deviceResult
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
                <div className="test-title" style={{
                    borderRight: 'none'
                }}>
                    <span>응답 데이터</span>
                </div>
                <div className="latest">
                    <div className="latest-first">
                        <header>
                            <span className="step">1</span>
                            first step. (hub)
                        </header>
                        <div className="latest-inner">
                        <div className="latest-body">
                            <div className="latest-title">
                                <MdSend color={'#7C96D9'}/>
                                <span>status code</span>
                            </div>
                            <div className="latest-res-code">{hubResult.get('status')}</div>
                            <div className="latest-title">
                                <MdSend color={'#7C96D9'}/>
                                <span>message</span>
                            </div>
                            <div className="latest-res-msg">{hubResult.get('msg')}</div>
                        </div>
                        </div>
                    </div>
                    <div className="latest-second">
                        <div className="latest-inner">
                        <header>
                            <span className="step">2</span>
                            second step. (device)
                        </header>
                        <div className="latest-body">
                            <div className="latest-title">
                                <MdSend color={'#7C96D9'}/>
                                <span>status code</span>
                            </div>
                            <div className="latest-res-code">{deviceResult.get('status')}</div>
                            <div className="latest-title">
                                <MdSend color={'#7C96D9'}/>
                                <span>message</span>
                            </div>
                            <div className="latest-res-msg">{deviceResult.get('msg')}</div>
                        </div>
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