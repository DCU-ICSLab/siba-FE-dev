import React, { Fragment } from 'react';
import './VirtualHubAddBtn.css';
import { MdAdd } from 'react-icons/md'

const VirtualHubAddBtn = ({ vhubCreate, onClick }) => {

    return (
        <div id="VirtualHubAddBtn">
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
                <div className="shadow" onClick={onClick}>
                <div>
                    <div><MdAdd color="#fff" size={50}></MdAdd></div>
                    <span>SIBA IoT 허브 생성</span>
                    <div className="sub-info">SIBA플랫폼에 연결할 허브의 구성을 정의 합니다.</div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default VirtualHubAddBtn;