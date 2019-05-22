import React, { Fragment } from 'react';
import { MdNavigateBefore, MdRemoveCircle } from 'react-icons/md'
import './SibaContent.css';

const SibaContent = ({children, style}) => {
    return (
        <div id="SibaContent" style={style}>
            {children}
        </div>
    )
}

export default SibaContent;