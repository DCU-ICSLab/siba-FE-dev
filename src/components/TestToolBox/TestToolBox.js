import React, { Fragment } from 'react';
import './TestToolBox.css';
import { MdAccessTime, MdCheckCircle } from 'react-icons/md'

const TestInfoCard = ({})=>{
    return(
        <div id="TestInfoCard">
            <header>
                <span className="test-name">test/AA:BB:CC:DD:EE:FF</span>
                <span className="test-code"># 1</span>
            </header>
            <div className="test-card-body">
                <div className="duration">
                    <MdAccessTime/> Duration:
                </div>
                <div className="finished">
                    <MdCheckCircle/> Finished:
                </div>
            </div>
            <div className="additional">

            </div>
        </div>
    )
}

const TestToolBox = ({
    children,
    setRef,
    renderVisibleBox
}) => {
    return (
        <div id="TestToolBox">
            <div className="tool-main">
                <div className="tool-upper"></div>
                <div className="tool-side">
                    <header>
                        <span>수행 테스트 목록</span>
                    </header>
                    <div className="test-list">
                        <TestInfoCard/>
                        <TestInfoCard/>
                    </div>
                </div>
                <div className="graph-area">
                    <svg className="graph" ref={setRef}>
                        <g className="graph-inner">
                            {children}
                            <g>
                                {/* <rect fill="#555" width={200} height={200}></rect>
                                <rect fill="none" width={100} height={100}></rect> */}
                                {/* <rect fill="transparent" width={100} height={100}></rect> */}
                                {renderVisibleBox()}
                            </g>
                        </g>
                    </svg>
                    <svg className="shadow">
                    </svg>
                    <svg className="focus-area"></svg>
                </div>
            </div>
        </div>
    )
}

export default TestToolBox;