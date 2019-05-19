import React, { Fragment } from 'react';
import { 
    MdNavigateBefore, 
    MdDeviceHub, 
    MdNavigateNext,
    MdAdd
} from 'react-icons/md'
import './SibaSideBar.css';

const Device = ({ devInfo }) => {
    let st = devInfo.state;
    return (
        <button className="device">
            <span className={`${st ? 'enable' : 'disable'}`}>
                {st ? 'ON' : 'OFF'}
            </span>
            <span className="dev-name">{devInfo.devName}</span>
        </button>
    )
}

const SideBarAddOn = ({ sbToggle, sbState }) => {
    let devList = [
        { devName: 'test', state: true }
        , { devName: 'test2', state: false }
        , { devName: 'test2', state: false }
        , { devName: 'test2', state: false }
        // , { devName: '에어컨', state: false }
        // , { devName: 'test2', state: false }
        // , { devName: 'test2', state: false }
        // , { devName: 'test2', state: false }
        // , { devName: 'test2', state: true }
        // , { devName: 'test2', state: false }
    ]
    let cnt = 0;
    return (
        <div id="SibaSideBar-addon" style={{
            left: sbState ? '10px' : '-202px'
        }}>
            <header>
                <h2>등록 디바이스 정보</h2>
            </header>
            <article>
                <h3>
                    <MdDeviceHub size={15} style={{
                        float: 'left',
                        marginTop: '3px',
                        marginRight: '3px'
                    }}/> 가상 허브</h3>
                <select name="hub">
                    <option value="1" defaultValue>virtual hub #1</option>
                    <option value="2">virtual hub #2</option>
                    <option value="3">virtual hub #3</option>
                </select>
                <section>
                    <header>
                        <span>
                            <strong>Virtual&nbsp;&nbsp;&nbsp;IoT-Hub&nbsp;&nbsp;&nbsp;#1</strong>
                        </span>
                    </header>
                    <div className="wrap">
                        <div className="info">
                            <span className="st">상태</span>
                            <span className="dev-name">디바이스명</span>
                        </div>
                        {devList.map(devInfo => { return <Device devInfo={devInfo} key={cnt++} /> })}
                        {devList.length < 10 && <button className="device-add-btn">
                            <MdAdd size={15} style={{
                                position: 'absolute',
                                top: '3px',
                                left: '29px'
                            }}/> 디바이스 추가
                        </button>}
                    </div>
                    <footer>
                        <div className="left">
                            <span>on: </span>
                            <span>{devList.length}</span>
                        </div>
                        <div className="center">
                            <span>off: </span>
                            <span>{devList.length}</span>
                        </div>
                        <div className="right">
                            <span>Total: </span>
                            <span>{devList.length}</span>
                        </div>
                    </footer>
                </section>
                {/* <ul>
                    <li><button>테스트 장비</button></li>
                    <li>테스트 장비</li>
                    <li>테스트 장비</li>
                </ul> */}
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
                <div className="btn-shadow"></div>
            </article>
        </div>
    )
}

const SibaSideBar = ({ sbToggle, sbState }) => {
    return (
        <Fragment>
            {/* <div id="SibaSideBar">
            </div> */}
            <SideBarAddOn sbToggle={sbToggle} sbState={sbState} />
        </Fragment>
    )
}

export default SibaSideBar;