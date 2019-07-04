import React, { Fragment } from 'react';
import './VirtualHubAddBtn.css';
import { MdAdd } from 'react-icons/md'

const VirtualHubAddBtn = ({ vhubCreate }) => {

    return (
        <div id="VirtualHubAddBtn" onClick={vhubCreate}>
            <div className="shadow">
                
                <div>
                    <div><MdAdd color="#fff" size={50}></MdAdd></div>
                    <span>가상 IoT 허브 추가</span>
                </div>
            </div>
            <div className="inner">
                <header>
                    <span className="title">virtual IoT-Hub</span>
                    {/* <MdSettings style={{ float: "right", marginTop: 2 }} color="#656565" size={16} /> */}
                </header>
                <div className="info">
                    develop device sets
                </div>
                <div className="container">
                </div>
                <footer>
                    <span className="total">Total <strong>(0/9)</strong></span>
                    <span className="on">on <strong>(0)</strong></span>
                    <span className="off">off <strong>(0)</strong></span>
                </footer>
            </div>
        </div>
    )
}

export default VirtualHubAddBtn;