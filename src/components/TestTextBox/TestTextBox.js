import React, { Fragment } from 'react';
import './TestTextBox.css';
import Moment from 'react-moment';
import siba from 'resources/siba.jpg';

const TestTextBox = ({
    children, 
    preText, 
    postText,
    buttons,
    time,
    enable,
    boxType,
    sendCommand,
    changeTimeSetter,
    saveTempType,
}) => {

    return (
        <div id="TestTextBox">
            <header>
                <img src={siba} width="45" className="text-img" />
            </header>
            <div className="text-body">
                <span className="sender">SIBA 테스트봇</span>
                <div className="text-area">
                    <div className="pretext">{preText}</div>
                    {(boxType===1 || boxType===5) && <div>
                    {
                        buttons.map((btn, index)=>{
                            return(
                                <div key={index}>{index+1}. {btn.get('btnName')}</div>
                            )
                        })
                    }
                    </div>}
                    {boxType===3 && 
                    <button 
                    className="time-set-btn"
                    onClick={()=>changeTimeSetter(true, buttons.getIn([0,'cboxId']))}
                    disabled={!enable}>시간 설정</button>}
                    {postText!=='' && <div className="posttext">{postText}</div>}
                    <div className="msg-time">
                        <Moment date={time} format="A HH:mm"></Moment>
                    </div>
                </div>
                {enable &&
                <div className="btn-list">
                {(boxType===1 || boxType===5) && 
                    buttons.map((btn, index)=>{
                        console.log(btn.get('cboxId'))
                        return(
                            <button 
                            key={index} 
                            className="link-btn"
                            onClick={(e)=>{
                                saveTempType(btn.get('btnType'), btn.get('evCode'))
                                sendCommand(`${index+1}번`, btn.get('cboxId'))
                            }}>
                            {index+1}
                            </button>
                        )
                    })
                }
                </div>}
            </div>
        </div>
    )
}

export default TestTextBox;