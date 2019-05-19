import React, { Fragment } from 'react';
import { MdNavigateBefore } from 'react-icons/md'
import './SibaFrame.css';
import { SibaSideBar, SibaContent, Siba, SibaShadow } from 'components';
import SibaPhone from '../SibaPhone/SibaPhone';

const Header = () => {
    return (
        <div id="header">
            <h1>SIBA for Developers</h1>
        </div>
    )
}

const SibaFrame = ({ 
    children, 
    sbToggle, 
    sbState, 
    sbCall, 
    sibaTalkFunc, 
    sbTalk, 
    sibaCallFunc, 
    phoneAddOn, 
    phoneAddOnFunc,
    phoneAddOnTab, 
    phoneAddOnTabFunc,
}) => {
    console.log(sbCall);
    return (
        <div id="SibaFrame">
            <Header></Header>
            <SibaSideBar sbToggle={sbToggle} sbState={sbState}></SibaSideBar>
            <SibaContent 
            style={{
                marginLeft: sbState ? '250px': '40px'
                // left: sbState ? '240px' : '30px'
            }}
            >
                {children}
            </SibaContent>
            <Siba sibaTalkFunc={sibaTalkFunc} sbTalk={sbTalk} sibaCallFunc={sibaCallFunc}/>
            {sbCall && 
            <SibaPhone 
            phoneAddOn={phoneAddOn} 
            phoneAddOnFunc={phoneAddOnFunc}
            phoneAddOnTab={phoneAddOnTab}
            phoneAddOnTabFunc={phoneAddOnTabFunc}/>}
        </div>
    )
}

export default SibaFrame;