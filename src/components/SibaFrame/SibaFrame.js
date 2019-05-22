import React, { Fragment } from 'react';
import { MdNavigateBefore } from 'react-icons/md'
import './SibaFrame.css';
import { SibaSideBar, SibaContent, Siba, DeviceAddBox } from 'components';
import { DeviceWork } from 'containers';
import SibaPhone from '../SibaPhone/SibaPhone';

const Header = () => {
    return (
        <div id="header">
            <h1>SIBA for Developers</h1>
        </div>
    )
}

const SibaFrame = ({ 
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
    deviceAddBoxChangeFunc,
    deviceAddBox,
    deviceWorkBox,
    deviceWorkBoxChangeFunc
}) => {
    console.log(sbCall);
    return (
        <div id="SibaFrame">
            <Header></Header>
            <SibaSideBar 
            sbToggle={sbToggle} 
            sbState={sbState} 
            deviceAddBoxOpenFunc={deviceAddBoxChangeFunc}
            deviceAddBox={deviceAddBox}
            deviceWorkBox={deviceWorkBox}
            deviceWorkBoxChangeFunc={deviceWorkBoxChangeFunc}>
            </SibaSideBar>
            <SibaContent 
            style={{
                marginLeft: sbState ? '245px': '35px',
                marginRight: '15px'
                // left: sbState ? '240px' : '30px'
            }}
            >
                {deviceAddBox && <DeviceAddBox deviceAddBoxChangeFunc={deviceAddBoxChangeFunc}></DeviceAddBox>}
                {deviceWorkBox && <DeviceWork/>}
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