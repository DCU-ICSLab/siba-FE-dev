import React, { Fragment } from 'react';
import {
    MdNavigateBefore,
    MdNavigateNext,
} from 'react-icons/md'
import './SibaPhone.css';

const MenuBtn = ({ left, children, enabled, phoneAddOnTabFunc }) => {
    return (
        <Fragment>
            <div
                className="menu-btn"
                onClick={!enabled ? phoneAddOnTabFunc : null}
                style={{
                    left: `${left}px`,
                    borderBottom: enabled ? '18px solid #fff' : '18px solid #7697B2',
                    zIndex: enabled ? 2 : 1,
                    cursor: enabled ? 'default' : 'pointer',
                    color: enabled ? '#000' : '#444'
                }}>{children}</div>
            <div className="menu-btn-shadow" style={{
                left: `${left - 1}px`,
                zIndex: enabled ? 1 : 0,
            }}></div>
        </Fragment>
    )
}

const DataAnalysis = () => {
    return (
        <div className="add-on-wrap">
            <header>Request 데이터셋</header>
        </div>
    )
}

const Dataset = ({dataset}) => {
    return (
        <tr>
            <td style={{
                width: '30px'
            }}>{dataset.step}</td>
            <td style={{
                width: '100px'
            }}><span>{dataset.blockId}</span></td>
            <td style={{
                width: '68px'
            }}>{dataset.blockType}</td>
            <td style={{
                width: '40px'
            }}>{dataset.value}</td>
        </tr>
    )
}

const Trace = () => {
    let cnt = 0;
    // let datasetList = [{
    //     step: 1,
    //     blockId: '0x00000000',
    //     blockType: 'button',
    //     value: 1
    // }]
    let datasetList = []
    return (
        <div className="add-on-wrap">
            <header>블록 트레이스 테이블</header>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th style={{
                                width: '30px'
                            }}>step</th>
                            <th style={{
                                width: '100px'
                            }}>블록id</th>
                            <th style={{
                                width: '65px'
                            }}>블록 타입</th>
                            <th>호출 값</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasetList.length ? datasetList.map(dataset => { return <Dataset dataset={dataset} key={cnt++} /> })
                        : <Dataset dataset={{
                            step: '-',
                            blockId: '-',
                            blockType: '-',
                            value: '-'
                        }}/>}
                    </tbody>
                </table>
            </div>
            <footer>
                <span>depth: {datasetList.length}</span>
            </footer>
        </div>
    )
}

const SibaPhone = ({ children, phoneAddOn, phoneAddOnFunc, phoneAddOnTab, phoneAddOnTabFunc }) => {
    return (
        <div id="SibaPhone">
            <div className="phone">
                <div className="PhoneContent">

                </div>
            </div>
            <div className="add-on" style={{
                right: phoneAddOn ? '415px' : '108px'
            }}>

                <MenuBtn
                    left={5}
                    enabled={phoneAddOnTab}
                    phoneAddOnTabFunc={phoneAddOnTabFunc}>
                    트레이스
                </MenuBtn>
                <MenuBtn
                    left={98}
                    enabled={!phoneAddOnTab}
                    phoneAddOnTabFunc={phoneAddOnTabFunc}>
                    데이터 분석
                </MenuBtn>
                <div className="btn" onClick={phoneAddOnFunc}>
                    {!phoneAddOn ?
                        <MdNavigateBefore size={22} style={{
                            zIndex: 9998,
                            position: "absolute",
                            left: '-1px',
                        }} />
                        : <MdNavigateNext size={22} style={{
                            zIndex: 9998,
                            position: "absolute",
                            left: '-1px',
                        }} />}
                </div>
                {phoneAddOnTab ?
                    <Trace></Trace>
                    : <DataAnalysis></DataAnalysis>}
            </div>
        </div>
    )
}

export default SibaPhone;