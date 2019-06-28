import React, { Fragment } from 'react';
import './DeviceWorkBox.css';
import { BoxButton } from 'components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const DeviceWorkBox = ({ children, vHubId, devName, pageSwitching, page }) => {
    return (
        <div id="DeviceWorkBox">
            <header>
                <span className="title">virtual hub #{vHubId}  >  {devName}</span>
                <span className={'state'}> (deploy)</span>
                <MdKeyboardArrowUp style={{
                    float: 'right'
                }} size={20}/>
            </header>
            <BoxButton enabled={page===1} left={5} width={80} onClick={(e)=>pageSwitching(1)}>
                텍스트 박스 정의
            </BoxButton>
            <BoxButton enabled={page===2} left={97} width={80} onClick={(e)=>pageSwitching(2)}>
                센싱 페이지 정의
            </BoxButton>
            <BoxButton enabled={page===3} left={189} width={80} onClick={(e)=>pageSwitching(3)}>
                디바이스 테스트
            </BoxButton>
           {children}
        </div>
    )
}

export default DeviceWorkBox;