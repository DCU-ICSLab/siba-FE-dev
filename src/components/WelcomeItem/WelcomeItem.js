import React, { Fragment } from 'react';
import './WelcomeItem.css';
import { 
    MdMenu, 
    MdArrowBack, 
    MdHome, 
    MdRoom, 
    MdSpeakerPhone, 
    MdWbIncandescent, 
    MdCloudQueue, 
    MdDeviceHub,
    MdMemory,
    MdSdStorage
} from 'react-icons/md';
import siba from '../../resources/siba.jpg'

const WelcomeItem = ({
    children,
}) => {

    return (
        <div id="WelcomeItem">
            <div className="WelcomeBoard">
                <header>
                    <div className="title">내 손안에 작은 SIBA</div>
                    <div className="sub-title">
                        <span>S</span>{'NS & '}<span>I</span>oT <span>B</span>ased on <span>A</span>I Chatbot
                    </div>
                </header>
                <div className="main-content">
                    <div className="screen-monitors">
                        <div className="smartphone">
                            <div className="smartphone-head" />
                            <div className="phone-inner">
                                <div className="phone-inner-nav">
                                    <MdArrowBack size={10} style={{
                                        float: 'left'
                                    }} />
                                    <span className="kakao-friend">SIBA</span>
                                    <MdMenu size={10} style={{
                                        marginLeft: 'auto'
                                    }} />
                                </div>
                                <img src={siba} width={50} id="siba"></img>
                            </div>
                            <div className="smartphone-btn" />
                        </div>
                        <div className="desktop">
                            <div className="desktop-inner">
                                <div className="desktop-screen">
                                    <div className="phone-inner-nav"
                                        style={{
                                            display: 'flex', flexDirection: 'row'
                                            , borderBottom: '1px solid #8E9FAE', height: '8px'
                                        }}>
                                        <MdArrowBack size={10} style={{
                                            float: 'left'
                                        }} />
                                        <span className="kakao-friend">SIBA</span>
                                        <MdMenu size={10} style={{
                                            marginLeft: 'auto'
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                        <div className="you" />
                                    </div>
                                    <div className="me" />
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                        <div className="you" style={{ width: '17px' }} />
                                    </div>
                                    <div className="me" style={{ width: '22px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                        <div className="you" style={{ width: '28px' }} />
                                    </div>
                                    <div className="me" />
                                </div>
                            </div>
                            <div className="desktop-bottom">
                                <div className="desktop-square" />
                                <div className="desktop-triangle" />
                            </div>
                        </div>
                        <div className="tablet">
                            <div className="tablet-inner">
                                <div className="phone-inner-nav"
                                    style={{
                                        display: 'flex', flexDirection: 'row'
                                        , borderBottom: '1px solid #8E9FAE', height: '10px'
                                    }}>
                                    <MdArrowBack size={10} style={{
                                        float: 'left'
                                    }} />
                                    <div className="kakao-friend">SIBA</div>
                                    <MdMenu size={10} style={{
                                        marginLeft: 'auto'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                    <div className="you" style={{ width: '18px' }} />
                                </div>
                                <div className="me" style={{ width: '12px' }} />
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                    <div className="you" />
                                </div>
                                <div className="me" style={{ width: '37px' }} />
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                    <div className="you" style={{ width: '22px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={siba} width={8} height={8} id="siba" style={{ marginTop: '3px' }}></img>
                                    <div className="you" style={{ width: '40px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="iot">
                        <div className="mac">
                            <div className="mac-line"></div>
                            <MdSdStorage size={65} id="mac" />
                        </div>
                        <div className="home">
                            <div className="home-m1"></div>
                            <div className="home-m2"></div>
                            <MdHome size={65} id="home" />
                        </div>
                        <div className="room">
                            <div className="room-m1"></div>
                            <div className="room-m2"></div>
                            <div className="room-m3"></div>
                            <MdRoom size={65} id="room" />
                        </div>
                        <div className="speakerphone">
                            <div className="speak-m1"/>
                            <div className="speak-m2"/>
                            <div className="speak-m3"/>
                            <MdSpeakerPhone size={65} id="speakerphone" />
                        </div>
                        <div className="hub">
                            <div className="hub-m1"></div>
                            <div className="hub-m2"></div>
                            <div className="hub-m3"></div>
                            <div className="hub-m4"></div>
                            <MdDeviceHub size={65} id="hub" />
                        </div>
                        <div className="wjsrn">
                            <div 
                            // style={{
                            //     borderTop: '4px solid ', width: '130px',
                            //     color: '#6FC9CE', marginLeft: '-162px', marginTop: '100px', position: 'absolute'
                            // }} 
                            />
                            <MdWbIncandescent size={65} id="wjsrn" />
                        </div>
                    </div>
                </div>
                <div className="welcome-text">"당신의 아이디어를 쉽고 빠르게 실현해보세요."</div>
                {children}
            </div>
        </div>
    )
}

export default WelcomeItem;