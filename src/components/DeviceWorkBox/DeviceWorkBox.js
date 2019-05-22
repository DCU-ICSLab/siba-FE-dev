import React, { Fragment } from 'react';
import './DeviceWorkBox.css';
import { BoxButton } from 'components';

const DeviceWorkBox = ({ children }) => {
    return (
        <div id="DeviceWorkBox">
            <header>
                <span className="title">virtual hub #1 > test2</span>
            </header>
            <BoxButton enabled={true} left={5} width={80}>
                text박스 정의
            </BoxButton>
            <BoxButton enabled={false} left={97} width={80}>
                센싱페이지 정의
            </BoxButton>
           {children}
        </div>
    )
}

export default DeviceWorkBox;