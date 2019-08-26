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
    MdClear,
    MdCreate
} from 'react-icons/md'
import { VisibleTargetedBox } from 'components';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import GetRuleType from '../../utils/GetRuleType';
import GetOutputType from '../../utils/GetOutputType';
import GetDataByte from '../../utils/GetDataByte';

const DataModelRecord = ({ item, index, isNull, dataTypeText }) => {
    let dataType = '';
    if (!isNull) {
        dataType = dataTypeText
    }

    return (
        <div id="record">
            <div style={{
                width: 26,
                // backgroundColor: '#CEDDED'
            }}>{isNull ? '-' : index + 1}</div>
            <div style={{
                width: 108,
            }}>{isNull ? '-' : item.get('dataKey')}</div>
            <div style={{
                width: 109,
            }}>{isNull ? '-' : dataType}</div>
            <div className="record-editable">
                {
                    !isNull && <Fragment>
                        <button className="model-edit">
                            <MdCreate />
                        </button>
                        <button className="model-del">
                            <MdClear />
                        </button>
                    </Fragment>
                }
            </div>
        </div>
    )
}

const ButtonCard = ({ item, buttonSelect, selectedBox }) => {

    if (selectedBox)
        console.log(selectedBox.toJS())
    console.log(item.toJS())

    return (
        <div className="btn-obj" style={{
            // backgroundColor: selectedButton && selectedButton.get('btnCode') === item.get('btnCode') ? '#F1DF26' : '#4994DB'
            backgroundColor: selectedBox && selectedBox.get('boxId') === item.get('boxId') ? '#F1DF26' : '#DDDDDD'
        }}>
            <span>ID: {item.get('boxId')}</span>
            <div style={{
                marginTop: 15
            }}>
                <span className="btn-obj-type">정의규칙 갯수: {item.get('rules').size}</span>
                <button
                    className="edit-btn"
                    onClick={() => buttonSelect(item)}>
                    <MdEdit style={{
                        paddingTop: 2
                    }} /> Edit</button>
            </div>
        </div>
    )
}

const SensingPallet = ({
    children,
    modelerInfo,
    page,
    changeBtnCategory,
    changeDataModal,
    buttonSelect,
    selectedBox,
    changeRuleModal,
    deleteRule,
    changeEventModal,
    selectEvent,
    selectEventObj,
    deleteEvent
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
                            <div className="model-info-up">
                                <strong style={{color: '#7C95D8'}}>[{modelerInfo.get('devStateModel').size}]</strong> dataset is define <span>({modelerInfo.get('devStateModel').size}sets/30sets)</span></div>
                            <div className="model-info-down">
                                <Progress
                                    status="success"
                                    percent={Math.round(modelerInfo.get('devStateModel').size/30*100)}
                                    theme={{
                                        success: {
                                            color: '#aaa',
                                            symbol: Math.round(modelerInfo.get('devStateModel').size/30*100) + '%',
                                        }
                                    }} />
                            </div>
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
                                }}></div>
                            </header>
                            <div className="model-table-body">
                                <div className="data-model">
                                    {
                                        modelerInfo.get('devStateModel').map((item, index) => {
                                            const dataSet = GetDataByte(item.get('dataType'))
                                            return (
                                            <DataModelRecord 
                                            item={item} 
                                            key={index} 
                                            index={index} 
                                            isNull={false} 
                                            dataTypeText={dataSet.text}/>)
                                        })
                                    }
                                    {
                                        modelerInfo.get('devStateModel').size === 0 && <DataModelRecord isNull={true} />
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
                            <div className="model-info-up">
                                <strong style={{color: '#7C95D8'}}>[{modelerInfo.get('sensingDataModel').size}]</strong> dataset is define <span>({modelerInfo.get('sensingDataModel').size}sets/10sets)</span></div>
                            <div className="model-info-down">
                                <Progress
                                    status="success"
                                    percent={Math.round(modelerInfo.get('sensingDataModel').size/10*100)}
                                    theme={{
                                        success: {
                                            color: '#aaa',
                                            symbol: Math.round(modelerInfo.get('sensingDataModel').size/10*100) + '%',
                                        }
                                    }} />
                            </div>
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
                                }}></div>
                            </header>
                            <div className="model-table-body">
                                <div className="data-model">
                                    {
                                        modelerInfo.get('sensingDataModel').map((item, index) => {
                                            const dataSet = GetDataByte(item.get('dataType'))
                                            return (
                                            <DataModelRecord 
                                            item={item} 
                                            key={index} 
                                            index={index} 
                                            isNull={false}
                                            dataTypeText={dataSet.text}/>)
                                        })
                                    }
                                    {
                                        modelerInfo.get('sensingDataModel').size === 0 && <DataModelRecord isNull={true} />
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
                                <span>조회 박스 집합</span>
                            </header>
                            {/* <div className="button-set-div">
                                <button
                                    disabled={page === '1'}
                                    onClick={() => {
                                        changeBtnCategory('1')
                                        buttonSelect(null)
                                    }}
                                    style={{
                                        backgroundColor: page === '1' ? '#fff' : '#E4E4E4'
                                    }}>조회-디바이스</button>
                                <button
                                    disabled={page === '2'}
                                    onClick={() => {
                                        changeBtnCategory('2')
                                        buttonSelect(null)
                                    }}
                                    style={{
                                        left: 100,
                                        backgroundColor: page === '2' ? '#fff' : '#E4E4E4'
                                    }}>조회-센싱</button>
                            </div> */}
                            <span>select box count: {modelerInfo && modelerInfo.get('boxRules').size}</span>
                            <div className="btn-area">
                                {
                                    modelerInfo && modelerInfo.get('boxRules').map((item, index) => {
                                        return (
                                            <ButtonCard
                                                key={index}
                                                buttonSelect={buttonSelect}
                                                item={item}
                                                selectedBox={selectedBox} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="req-text">
                            {/* {!selectedBox && <div className="req-text-shadow"></div>} */}
                            <header>
                                <span>조회 박스 세부정보</span>
                            </header>
                            <div className="req-body">
                                <div className="temp-textbox">
                                    <div className="temp-textbox-wrapper">
                                        {selectedBox &&
                                            <VisibleTargetedBox
                                                headRows={selectedBox.get('headRow')}
                                                footRows={selectedBox.get('footRow')}
                                                postText={selectedBox.get('postText')}
                                                preText={selectedBox.get('preText')}
                                                //buttons={selectedBox.getIn(['block', 'info', 'buttons'])}
                                                boxType={selectedBox.get('type')}
                                                type={'1'}
                                            />}
                                    </div>
                                </div>
                                <div className="req-body-title">텍스트박스 적용 규칙</div>
                                <div className="link-model-table">
                                    <header>
                                        <div className="m-order" style={{
                                            backgroundColor: '#DBDCE0',
                                            borderRight: '1px solid #DBDCE0'
                                        }}>순위</div>
                                        <div className="m-key">KEY</div>
                                        <div className="m-op">OP</div>
                                        <div className="m-value">VALUE</div>
                                        <div className="m-edit"></div>
                                    </header>
                                    <Fragment>
                                        {
                                            selectedBox && selectedBox.get('rules').map((item, index) => {
                                                let rule = ''
                                                switch (item.get('ruleType')) {
                                                    case '1':
                                                        rule = '-'
                                                        break;
                                                    case '2':
                                                        rule = '=='
                                                        break;
                                                    case '3':
                                                        rule = '!='
                                                        break;
                                                    case '4':
                                                        rule = '>'
                                                        break;
                                                    case '5':
                                                        rule = '<'
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                return (
                                                    <div className="rule" key={index}>
                                                        <div className="m-order">{index + 1}</div>
                                                        <div className="m-key">{item.get('dataKey')}</div>
                                                        <div className="m-op">{rule}</div>
                                                        <div className="m-value">{rule === '-' ? '-' : item.get('ruleValue')}</div>
                                                        <div className="m-edit">
                                                            <button className="model-edit">
                                                                <MdCreate />
                                                            </button>
                                                            <button
                                                                className="model-del"
                                                                onClick={() => deleteRule(item.get('modId'), item.get('boxId'), index)}>
                                                                <MdClear />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            selectedBox && selectedBox.get('rules').size === 0 &&
                                            <div className="rule">
                                                <div className="m-order">-</div>
                                                <div className="m-key">-</div>
                                                <div className="m-op">-</div>
                                                <div className="m-value">-</div>
                                                <div className="m-edit">-</div>
                                            </div>
                                        }
                                        {
                                            !selectedBox &&
                                            <div className="rule">
                                                <div className="m-order">-</div>
                                                <div className="m-key">-</div>
                                                <div className="m-op">-</div>
                                                <div className="m-value">-</div>
                                                <div className="m-edit">-</div>
                                            </div>
                                        }
                                    </Fragment>
                                </div>
                                {selectedBox &&
                                    <button
                                        className="add-rule"
                                        onClick={() => changeRuleModal(true)}
                                        disabled={modelerInfo.get('devStateModel').size === 0 && modelerInfo.get('sensingDataModel').size === 0}>규칙 추가</button>
                                }
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className="down-editor">
                        <header>
                            <span>이벤트 정의기</span>
                            <button
                                className="event-adder"
                                onClick={() => { changeEventModal(true) }}
                                disabled={modelerInfo.get('devStateModel').size === 0 && modelerInfo.get('sensingDataModel').size === 0}>이벤트 추가</button>
                        </header>
                        <div className="event-area">
                            <div className="event-list">
                                {
                                    modelerInfo.get('events').map((event, index) => {
                                        return (
                                            <div className="event-define" key={index}>
                                                <div className="event-idx">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="sensing-type">
                                                    <div className="e-title">KEY</div>
                                                    <div className="event-line-right"></div>
                                                    <div className="event-elem">{event.get('dataKey')}</div>
                                                </div>
                                                <div className="sensing-rule">
                                                    <div className="e-title">적용 규칙</div>
                                                    <div className="event-line-left"></div>
                                                    <div className="event-line-right"></div>
                                                    {event.get('outputType') !== '0' && <div className="event-elem">{GetRuleType(event.get('ruleType'))}</div>}
                                                    {event.get('outputType') !== '0' && <div className="event-elem">{event.get('ruleValue')}</div>}
                                                </div>
                                                <div className="event-output">
                                                    <div className="e-title">OUTPUT</div>
                                                    <div className="event-line-left"></div>
                                                    <div className="event-elem">{GetOutputType(event.get('outputType'))}</div>
                                                </div>
                                                <button className="define-selector" onClick={e => selectEvent(event)}></button>
                                                {selectEventObj && selectEventObj.get('eventId') === event.get('eventId') && <div className="define-shadow"></div>}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="event-helper">
                            <header>
                                <span>이벤트 정보</span>
                            </header>
                            <div className="event-helper-body">
                                <div className="row">
                                    <div className="key">KEY</div>
                                    <div className="value">
                                        {selectEventObj && <span>{selectEventObj.get('dataKey')}</span>}
                                        {!selectEventObj && <span>-</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="key">적용 규칙</div>
                                    <div className="value">
                                        {selectEventObj && <span>
                                            <span className="fix-op">{GetRuleType(selectEventObj.get('ruleType'))}</span>
                                            <span className="fix-val">{selectEventObj.get('ruleValue')}</span>
                                        </span>}
                                        {!selectEventObj && <span>-</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="key">OUTPUT</div>
                                    <div className="value">
                                        {selectEventObj && <span>{GetOutputType(selectEventObj.get('outputType'))}</span>}
                                        {!selectEventObj && <span>-</span>}
                                    </div>
                                </div>
                                <div className="output-area">
                                    {
                                        selectEventObj && selectEventObj.get('outputType') === '1' &&
                                        <div className="temp-textbox">
                                            <div className="temp-textbox-wrapper" style={{
                                                margin: '0 20px'
                                            }}>
                                                <VisibleTargetedBox
                                                    headRows={selectEventObj.getIn(['notifyBoxDTO', 'headRow'])}
                                                    footRows={selectEventObj.getIn(['notifyBoxDTO', 'footRow'])}
                                                    postText={selectEventObj.getIn(['notifyBoxDTO', 'postText'])}
                                                    preText={selectEventObj.getIn(['notifyBoxDTO', 'preText'])}
                                                    //buttons={selectedBox.getIn(['block', 'info', 'buttons'])}
                                                    boxType={'2'}
                                                    type={'1'}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {
                                        selectEventObj && selectEventObj.get('outputType') === '3' &&
                                        <Fragment>
                                            <div className="row">
                                                <div className="key">host</div>
                                                <div className="value">
                                                    <span>{GetOutputType(selectEventObj.get('host'))}</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="key">port</div>
                                                <div className="value">
                                                    <span>{GetOutputType(selectEventObj.get('port'))}</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="key">path</div>
                                                <div className="value">
                                                    <span>{GetOutputType(selectEventObj.get('path'))}</span>
                                                </div>
                                            </div>
                                        </Fragment>
                                    }
                                    {selectEventObj && <div className="output-btn-set">
                                        <button className="event-edit">편집</button>
                                        <button className="event-del" onClick={() => deleteEvent(selectEventObj.get('eventId'), selectEventObj.get('outputType'))}>삭제</button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SensingPallet;