import React, { Fragment } from 'react';
import './TestWindow.css';
import siba from 'resources/siba.jpg';
import { MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const TestWindow = ({
    children, 
    startTest, 
    cancelTest, 
    changeTimeSetter, 
    timeSetter,
    timeFormat,
    changeTimeValue,
    sendCommand
}) => {

    return (
        <div id="TestWindow">
            <header>
                <div className="header-wrapper">
                <img src={siba} width="53" height="50" className="siba-img"/>
                <div className="siba-title">
                    <span>SIBA 테스트봇</span>
                </div>
                <div></div>
                </div>
            </header>
            <article>
                {children}
            </article>
            { timeSetter && 
            <Fragment>
            <div className="time-setter-shadow"></div>
            <div className="time-setter">
                <header>
                    <span>날짜/시간 선택</span>
                    <button 
                    className="close-time-setter"
                    onClick={changeTimeSetter}>
                        <MdClose/>
                    </button>
                </header>
                <div className="time-setter-body">
                    <span style={{width: '105px'}}>{timeFormat.get('md')}</span>
                    <div className="ch-btn">
                        <button onClick={(e)=>changeTimeValue('md', true)}>
                            <MdKeyboardArrowUp/>
                        </button>
                        <button onClick={(e)=>changeTimeValue('md', false)}>
                            <MdKeyboardArrowDown/>
                        </button>
                    </div>
                    <span>{timeFormat.get('h')}</span>
                    <div className="ch-btn">
                        <button onClick={(e)=>changeTimeValue('h', true)} disabled={timeFormat.get('h')==='23'}>
                            <MdKeyboardArrowUp/>
                        </button>
                        <button onClick={(e)=>changeTimeValue('h', false)} disabled={timeFormat.get('h')==='1'}>
                            <MdKeyboardArrowDown/>
                        </button>
                    </div>
                    <span>{timeFormat.get('t')}</span>
                    <div className="ch-btn">
                        <button onClick={(e)=>changeTimeValue('t', true)} disabled={timeFormat.get('t')==='59'}>
                            <MdKeyboardArrowUp/>
                        </button>
                        <button onClick={(e)=>changeTimeValue('t', false)} disabled={timeFormat.get('t')==='0'}>
                            <MdKeyboardArrowDown/>
                        </button>
                    </div>
                </div>
                <button onClick={sendCommand}>확인</button>
            </div>
            </Fragment>
            }
            <div className="test-helper">
                {/* <button className="helper-btn">
                    <span></span>
                </button> */}
                <button className="item" onClick={startTest}>
                    <span>시바</span>
                </button>
                <button className="item" onClick={cancelTest}>
                    <span>취소</span>
                </button>
            </div>
            <div className="footer-shadow"></div>
            <footer>
                <textarea placeholder="동적 텍스트 박스인 경우 메시지를 입력해주세요.">
                </textarea>
                <button className="text-send-btn">전송</button>
            </footer>
        </div>
    )
}

export default TestWindow;