import React from 'react';
import { MdNavigateBefore } from 'react-icons/md'
import './SibaFrame.css';

const SibaFrame = ({ children }) => {
    return (
        <div id="SibaFrame" className="noselect">
            {children}
        </div>
    )
}

export default SibaFrame;