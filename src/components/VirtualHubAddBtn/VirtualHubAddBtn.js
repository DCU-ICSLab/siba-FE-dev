import React, { Fragment } from 'react';
import './VirtualHubAddBtn.css';
import { MdSettings } from 'react-icons/md'

const VirtualHubAddBtn = ({ }) => {

    return (
        <div id="VirtualHubAddBtn">
            <div className="shadow">
                <div>새로운 IoT 허브 추가</div>
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