import React, { Fragment } from 'react';
import {
    MdNavigateBefore,
    MdDeviceHub,
    MdNavigateNext,
    MdAdd
} from 'react-icons/md'
import './SideBar.css';

const SideBar = ({ sbToggle, sbState, deviceAddBoxOpenFunc, deviceAddBox, deviceWorkBoxChangeFunc }) => {
    return (
        <div id="SideBar" style={{left: sbState ? '0' : '-250px'}}>
            <header>
                <span>Device Explorer</span>
            </header>
            <div className="container">

            </div>
            <div className="btn" onClick={sbToggle}>
                {sbState ?
                    <MdNavigateBefore size={22} style={{
                        zIndex: 9999,
                        position: "absolute",
                        left: '-22px'
                    }} />
                    : <MdNavigateNext size={22} style={{
                        zIndex: 9999,
                        position: "absolute",
                        left: '-22px'
                    }} />}
            </div>
        </div>
    )
}

export default SideBar;