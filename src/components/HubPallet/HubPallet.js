import React, { Fragment } from 'react';
import './HubPallet.css';

const HubPallet = ({ children, sbState,size }) => {

    return (
        <div id="HubPallet" style={{left: sbState ? '283px' : '33px'}}>
            <header>
                <span className="title">virtual hub sets</span>
            </header>
            <div className="hub-list-info">등록된 개발용 허브 ({size})</div>
            <div className="wrapper">
                {children}
            </div>
        </div>
    )
}

export default HubPallet;