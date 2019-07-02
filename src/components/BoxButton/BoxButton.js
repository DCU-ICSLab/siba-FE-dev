import React, { Fragment } from 'react';
import './BoxButton.css';

const BoxButton = ({ children, enabled, left, width, onClick }) => {
    return (
        <Fragment>
            <div id="BoxButtonShadow" style={{
                left: `${left-1}px`,
                width: `${width+2}px`
            }}>
            </div>
            <div
            id="BoxButton" 
            // disabled={!enabled}
            style={{
                width: `${width}px`,
                left: `${left}px`,
                borderBottom: enabled ? '18px solid #fff' : '18px solid #EFEFEF',
                zIndex: enabled ? 2 : 1,
                cursor: enabled ? 'default' : 'pointer',
                color: enabled ? '#000' : '#444'
            }}
            onClick={onClick}>
                {children}
            </div>
        </Fragment>
    )
}

export default BoxButton;