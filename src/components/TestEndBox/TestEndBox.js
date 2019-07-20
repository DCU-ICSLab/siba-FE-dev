import React, { Fragment } from 'react';
import '../TestTextBox/TestTextBox.css';
import Moment from 'react-moment';
import siba from 'resources/siba.jpg';

const TestEndBox = ({
    sendCommandToHub,
    text,
    isSend
}) => {

    return (
        <div id="TestTextBox">
            <header>
                <img src={siba} width="45" className="text-img" />
            </header>
            <div className="text-body">
                <span className="sender">SIBA 테스트봇</span>
                <div className="text-area">
                    <div className="pretext" style={{
                        marginBottom: 0
                    }}>{text}</div>
                    <div className="msg-time">
                        <Moment date={new Date()} format="A HH:mm"></Moment>
                    </div>
                </div>
                {!isSend && <div className="btn-list" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <button 
                            className="link-btn"
                            style={{
                                width: 'auto',
                                fontSize: 12,
                                fontFamily: 'Noto Sans KR, sans-serif',
                                borderRadius: 15,
                                fontWeight: 400

                            }}
                            onClick={(e)=>{
                                sendCommandToHub()
                                //saveTempType(btn.get('btnType'), btn.get('evCode'))
                                //sendCommand(`${index+1}번`, btn.get('cboxId'))
                            }}>
                        예
                    </button>
                    <button 
                            className="link-btn"
                            style={{
                                width: 'auto',
                                fontSize: 12,
                                fontFamily: 'Noto Sans KR, sans-serif',
                                borderRadius: 15,
                                fontWeight: 400
                            }}
                            onClick={(e)=>{
                                //saveTempType(btn.get('btnType'), btn.get('evCode'))
                                //sendCommand(`${index+1}번`, btn.get('cboxId'))
                            }}>
                        아니오
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default TestEndBox;