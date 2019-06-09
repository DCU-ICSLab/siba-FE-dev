import React, { Fragment } from 'react';
import './HubPallet.css';

const HubPallet = ({ children, sbState }) => {

    return (
        <div id="HubPallet" style={{left: sbState ? '283px' : '33px'}}>
            <header>
                <span className="title">virtual hub sets</span>
            </header>
            <div className="wrapper">
                {children}
            </div>
        </div>
    )
}

export default HubPallet;