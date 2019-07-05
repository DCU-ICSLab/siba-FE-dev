import React, { Fragment } from 'react';
import './HubPallet.css';

const HubPallet = ({
    children,
    sbState,
    size,
    deviceAddModalChange
}) => {

    return (
        <div id="HubPallet" style={{ left: sbState ? '273px' : '28px' }}>
            <div className="hub-list">
                <header>
                    <span className="title">개발용 허브 집합</span>
                </header>
                <div className="wrapper">
                    <div className="hub-list-info">등록된 개발용 허브 ({size})</div>
                    {children}
                </div>
            </div>
            <div className="device-repo">
                <header>
                    <span className="title">개발 디바이스 저장소</span>
                </header>
                <div className="repo-toolbar">
                    <div className="repo-toolbar-info">
                        <span>Total: 0</span>
                    </div>
                    <button onClick={deviceAddModalChange}>
                        디바이스 등록
                    </button>
                </div>
                <div className="device-repo-wrapper">
                    <table className="device-repo-list">
                        <thead>
                            <tr>
                                <th style={{
                                    width: '40px',
                                    borderLeft: 'none'
                                }}>No.</th>
                                <th>디바이스 명</th>
                                <th>디바이스 타입</th>
                                <th>디바이스 인증키</th>
                                <th>배포상태</th>
                                <th>연결상태</th>
                                <th>연결허브</th>
                                <th>최근 수정일시</th>
                                <th>최근 배포일시</th>
                                <th>디바이스 인증키</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{
                                    // backgroundColor: '#CEDDED'
                                }}>1</td>
                                <td>테스트</td>
                                <td>제어</td>
                                <td>aab</td>
                                <td>Y</td>
                                <td>Y</td>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HubPallet;