import React, { Fragment } from 'react';
import './DevicePallet.css';

const DevicePallet = ({ children }) => {
    return (
        <div id="DevicePallet">
            <div className="side">
            </div>
            <div className="pallet">
                {children}
            </div>
        </div>
    )
}

export default DevicePallet;