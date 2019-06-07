import React, { Fragment } from 'react';
import './VirtualHub.css';
import { MdSettings } from 'react-icons/md'

const LogicalDevice = ({ stauts }) => {

    const className = 'name'+(stauts ? ' on' : ' off');

    return (
        <div id="LogicalDevice" style={{opacity: stauts ? 1 : 0.5}}>
            <div className="inner">
                <div>
                    <span className={className}>에어컨</span>
                </div>
                <div className="dkey">12AVVDSFS2EEEABVS</div>
            </div>
        </div>
    )
}

const VirtualHub = ({ }) => {

    return (
        <div id="VirtualHub">
            <div className="inner">
                <header>
                    <span className="title">virtual IoT hub</span>
                    <span className="vcode">{`  (key: 1)`}</span>
                    <MdSettings style={{ float: "right", marginTop: 2 }} color="#656565" size={16} />
                </header>
                <div className="info">
                    develop device sets
                </div>
                <div className="container">
                    <LogicalDevice stauts={true}></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                    <LogicalDevice></LogicalDevice>
                </div>
                <footer>
                    <span className="total">Total <strong>(4/9)</strong></span>
                    <span className="on">on <strong>(9)</strong></span>
                    <span className="off">off <strong>(9)</strong></span>
                </footer>
            </div>
        </div>
    )
}

export default VirtualHub;