import React, { Fragment } from 'react';
import './DeviceWorkBox.css';
import { BoxButton } from 'components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const DeviceWorkBox = ({ children, vHubId, devName }) => {
    return (
        <div id="DeviceWorkBox">
            <header>
                <span className="title">virtual hub #{vHubId}  >  {devName}</span>
                <span className={'state'}> (deploy)</span>
                <MdKeyboardArrowUp style={{
                    float: 'right'
                }} size={20}/>
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