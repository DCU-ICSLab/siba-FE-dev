import React, { Fragment } from 'react';
import './VirtualHub.css';
import { MdSettings, MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LogicalDeviceAddBtn = ({}) => {

    return (
        <div id="LogicalDeviceAddBtn">
            <div className="add">
                <span><MdAdd size={36} style={{marginTop: 6}}/></span>
            </div>
        </div>
    )
}

const LogicalDevice = ({ dev }) => {

    const status = true;
    const className = 'name'+(status ? ' on' : ' off');

    return (
        <div id="LogicalDevice" style={{opacity: status ? 1 : 0.5}}>
            <div className="inner">
                <Link to="/device" style={{
                    textDecoration: 'none',
                    color: '#000',
                }}>
                    <div>
                        <span className={className}>{dev.get('devDefName')}</span>
                    </div>
                    <div className="dkey">{dev.get('authKey')}</div>
                </Link>
            </div>
        </div>
    )
}

const VirtualHub = ({ hub }) => {

    const size = hub.get('devices').size;

    return (
        <div id="VirtualHub">
            <div className="inner">
                <header>
                    <span className="title">virtual IoT hub</span>
                    <span className="vcode">{`  (key: ${hub.get('vhubId')})`}</span>
                    <MdSettings style={{ float: "right", marginTop: 2 }} color="#656565" size={16} />
                </header>
                <div className="info">
                    develop device sets
                </div>
                <div className="container">
                    {
                        hub.get('devices').map((dev, index)=>{
                            return <LogicalDevice dev={dev} key={index}/>
                        })
                    }
                    {size !== 9 && <LogicalDeviceAddBtn/>}
                </div>
                <footer>
                    <span className="total">Total <strong>{`(${size}/9)`}</strong></span>
                    <span className="on">on <strong>(9)</strong></span>
                    <span className="off">off <strong>(9)</strong></span>
                </footer>
            </div>
        </div>
    )
}

export default VirtualHub;