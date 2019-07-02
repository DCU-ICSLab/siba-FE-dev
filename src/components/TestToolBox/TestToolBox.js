import React, { Fragment } from 'react';
import './TestToolBox.css';

const TestToolBox = ({
    children,
    setRef,
    renderVisibleBox
}) => {
    return (
        <div id="TestToolBox">
            <div className="tool-main">
                <div className="tool-upper"></div>
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
            <div className="tool-side">
                <span></span>
            </div>
        </div>
    )
}

export default TestToolBox;