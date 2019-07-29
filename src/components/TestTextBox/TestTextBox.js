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
    getReservationInfo,
    cancelReservation,
    saveTempType,
    sendCommandWithTimeWithInterval
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
                        return(
                            <button 
                            key={index} 
                            className="link-btn"
                            onClick={(e)=>{
                                if(btn.get('btnType')!=='7')
                                    saveTempType(btn.get('btnType'), btn.get('evCode'))

                                //예약 조회라면
                                if(btn.get('btnType')==='2'){
                                    getReservationInfo(`${index+1}번`)
                                }

                                //예약 취소라면
                                else if(btn.get('btnType')==='6'){
                                    cancelReservation(`${index+1}번`, btn.get('evCode'))
                                }

                                //주기 설정 이라면
                                else if(btn.get('btnType')==='7'){
                                    sendCommandWithTimeWithInterval(`${index+1}`)
                                }

                                else{
                                    sendCommand(`${index+1}번`, btn.get('cboxId'))
                                }
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