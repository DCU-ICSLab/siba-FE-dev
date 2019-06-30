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
    sendCommand
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
                    <div>
                    {
                        buttons.map((btn, index)=>{
                            return(
                                <div key={index}>{index+1}. {btn.get('btnName')}</div>
                            )
                        })
                    }
                    </div>
                    <div className="posttext">{postText}</div>
                    <div className="msg-time">
                        <Moment date={time} format="A HH:mm"></Moment>
                    </div>
                </div>
                {enable &&
                <div className="btn-list">
                {
                    buttons.map((btn, index)=>{
                        return(
                            <button 
                            key={index} 
                            className="link-btn"
                            onClick={(e)=>sendCommand(`${index+1}번`, btn.get('cboxId'))}>
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