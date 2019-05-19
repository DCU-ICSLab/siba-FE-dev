import React, { Fragment } from 'react';
import { MdNavigateBefore, MdRemoveCircle } from 'react-icons/md'
import './SibaContent.css';

const SibaContent = ({children, style}) => {
    return (
        <div id="SibaContent" style={style}>
            {/* <div className="btn">
                <span>장비 추가 <MdRemoveCircle color='#FE6057' style={{
                    float: 'right',
                    marginTop: '3px',
                }}/></span>
            </div>
            <div className="btn-shadow"></div> */}
        </div>
    )
}

export default SibaContent;