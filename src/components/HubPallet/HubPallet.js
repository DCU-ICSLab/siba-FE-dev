import React, { Fragment } from 'react';
import './HubPallet.css';

const HubPallet = ({ children, sbState }) => {

    return (
        <div id="HubPallet" style={{left: sbState ? '300px' : '50px'}}>
            <div className="wrapper">
                {children}
            </div>
        </div>
    )
}

export default HubPallet;