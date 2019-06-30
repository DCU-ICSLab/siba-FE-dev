import React, { Fragment } from 'react';
import './TestWindow.css';
import siba from 'resources/siba.jpg';

const TestWindow = ({
    children, startTest, cancelTest
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
            <footer>
                <textarea placeholder="동적 텍스트 박스인 경우 메시지를 입력해주세요.">

                </textarea>
            </footer>
        </div>
    )
}

export default TestWindow;