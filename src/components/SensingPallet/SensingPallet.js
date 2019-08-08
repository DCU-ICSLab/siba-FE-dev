import React, { Fragment } from 'react';
import './SensingPallet.css';
import {
    MdAdd,
    MdBuild,
    MdSave,
    MdVerticalAlignTop,
    MdGetApp,
    MdBugReport,
    MdEdit,
    MdClose,
} from 'react-icons/md'

const DataModelRecord = ({ item, index }) => {
    let dataType = '';
    switch (item.get('dataType')) {
        case '1':
            dataType = 'BYTE (1)'
            break;
        case '1':
            dataType = 'INTEGER (4)'
            break;
        case '1':
            dataType = 'LONG (8)'
            break;
        case '1':
            dataType = 'DOUBLE (8)'
            break;
        case '1':
            dataType = 'STRING (10)'
            break;
        default:
            dataType = 'CHAR (1)'
            break;
    }

    return (
        <Fragment>
            <div style={{
                width: 26,
                borderRight: '1px solid #888',
            }}>{index + 1}</div>
            <div style={{
                width: 108,
                borderRight: '1px solid #888',
            }}>{item.get('dataKey')}</div>
            <div style={{
                width: 109,
                borderRight: '1px solid #888',
            }}>{dataType}</div>
            <div style={{
                width: 60
            }}></div>
        </Fragment>
    )
}

const ButtonCard = ({ typeName }) => {
    return (
        <div className="btn-obj" style={{
            // backgroundColor: tempButton && tempButton.get('idx') === idx ? '#F1DF26' : '#4994DB'
            backgroundColor: '#4994DB'
        }}>
            <span>1번 버튼 <span> (event code: 12)</span></span>
            <button className="btn-obj-del">
                <MdClose />
            </button>
            <div style={{
                marginTop: 15
            }}>
                <span className="btn-obj-type">{typeName}</span>
                {/* <button
                    className="edit-btn"
                    onClick={(e) => {
                        findChild(button.getIn(['linker', 'childId']))
                        addonOpen(true)
                        setTempBtn({
                            childId: button.getIn(['linker', 'childId']),
                            eventCode: button.get('eventCode'),
                            name: button.get('name'),
                            type: button.get('type'),
                            idx: idx,
                        })
                    }}><MdEdit style={{
                        paddingTop: 2
                    }} /> Edit</button> */}
            </div>
        </div>
    )
}

const SensingPallet = ({
    children,
    modelerInfo,
    page,
    changeBtnCategory,
    changeDataModal
}) => {

    return (
        <div id="SensingPallet">

            <div className="toolbox">
            </div>
            <div className="pallet">
                <div className="data-modeler">
                    <div className="model-category" style={{
                        marginTop: 5
                    }}>
                        <header>
                            <span>디바이스 상태 모델 정의</span>
                        </header>
                        <div className="model-body">
                            <div>10 model dataset is define</div>
                            <div>10 model dataset is define</div>
                        </div>
                        <div className="model-table">
                            <header>
                                <div style={{
                                    borderRight: '1px solid #888',
                                    width: '8%'
                                }}>IDX</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>KEY</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>DATA TYPE</div>
                                <div style={{
                                    width: '25%'
                                }}>USE</div>
                            </header>
                            <div className="model-table-body">
                                <div className="data-model">
                                    {
                                        modelerInfo.get('devStateModel').map((item, index) => {
                                            return (<DataModelRecord item={item} key={index} index={index} />)
                                        })
                                    }
                                </div>
                                <button
                                    className="dt-adder"
                                    onClick={() => changeDataModal(true, '0')}>데이터 모델 추가</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="model-category" style={{
                        marginBottom: 5
                    }}>
                        <header>
                            <span>센싱 데이터 모델 정의</span>
                        </header>
                        <div className="model-body">
                            <div>10 model dataset is define</div>
                            <div>10 model dataset is define</div>
                        </div>
                        <div className="model-table">
                            <header>
                                <div style={{
                                    borderRight: '1px solid #888',
                                    width: '8%'
                                }}>IDX</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>KEY</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>DATA TYPE</div>
                                <div style={{
                                    width: '25%'
                                }}>USE</div>
                            </header>
                            <div className="model-table-body">
                                <div className="data-model">
                                    {
                                        modelerInfo.get('sensingDataModel').map((item, index) => {
                                            return (<DataModelRecord item={item} key={index} index={index}/>)
                                        })
                                    }
                                </div>
                                <button className="dt-adder"
                                    onClick={() => changeDataModal(true, '1')}>데이터 모델 추가</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data-editor">
                    <div className="up-editor">
                        <div className="button-set">
                            <header>
                                <span>조회 버튼 집합</span>
                            </header>
                            <div className="button-set-div">
                                <button
                                    disabled={page === '1'}
                                    onClick={() => changeBtnCategory('1')}
                                    style={{
                                        backgroundColor: page === '1' ? '#fff' : '#E4E4E4'
                                    }}>조회-디바이스</button>
                                <button
                                    disabled={page === '2'}
                                    onClick={() => changeBtnCategory('2')}
                                    style={{
                                        left: 100,
                                        backgroundColor: page === '2' ? '#fff' : '#E4E4E4'
                                    }}>조회-센싱</button>
                            </div>
                            <span>total button count: {(page === '1' && modelerInfo) && modelerInfo.get('deviceStateBtn').size}{(page === '2' && modelerInfo) && modelerInfo.get('sensingBtn').size}</span>
                            <div className="btn-area">
                                {
                                    page === '1' && modelerInfo && modelerInfo.get('deviceStateBtn').map((item, index) => {
                                        return <ButtonCard key={index} typeName={'조회-디바이스 버튼'} />
                                    })
                                }
                                {
                                    page === '2' && modelerInfo && modelerInfo.get('sensingBtn').map((item, index) => {
                                        return <ButtonCard key={index} typeName={'조회-센싱 버튼'} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="req-text">
                            <header>
                                <span>결과 텍스트박스</span>
                            </header>
                            <div className="req-body">
                                <div className="req-box-area">

                                </div>
                                <div className="req-body-title">연결된 데이터 모델</div>
                                <div className="link-model-table">
                                    {/* <header>
                                        <div style={{
                                            borderRight: '1px solid #888',
                                            width: '8%'
                                        }}>IDX</div>
                                        <div style={{
                                            borderRight: '1px solid #888'
                                        }}>KEY</div>
                                        <div style={{
                                            borderRight: '1px solid #888'
                                        }}>DATA TYPE</div>
                                        <div style={{
                                            width: '25%'
                                        }}>USE</div>
                                    </header> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className="down-editor">
                        <header>
                            <span>이벤트 정의기</span>
                        </header>
                        <div className="event-area">

                        </div>
                        <div className="event-helper">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SensingPallet;