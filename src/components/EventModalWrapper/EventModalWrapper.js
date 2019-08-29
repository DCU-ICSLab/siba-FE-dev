import React, { Component, Fragment } from 'react';
import { MdClose, MdExpandLess, MdExpandMore } from 'react-icons/md'
import './EventModalWrapper.css';
import Modal from 'react-modal';
import { VisibleTargetedBox } from 'components';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import GetDataType from '../../utils/GetDataType';

const EventModalWrapper = ({
    dataModal,
    changeDataModal,
    changeModelAdd,
    eventAdd,
    addDataModel,
    modelerInfo,
    addStateRule,
    changeTextBoxInfo,
    changeEventAdditionalAdd,
    devType,
    addEvent,
    res,
    sendToThirdServer,
    upPrioriy,
    downPrioriy,
    deviceInfo,
    devName,
    changeSelectMap
}) => {

    let DynamicHeight = 145;
    let dataType = null
    let dataTypeConvert = null

    switch (eventAdd.get('outputType')) {
        case '1':
            DynamicHeight += (eventAdd.getIn(['notifyBoxDTO', 'headRow']) * 20 + eventAdd.getIn(['notifyBoxDTO', 'footRow']) * 20)
            break;
        case '2':
            DynamicHeight = 159
            break;
        case '3':
            DynamicHeight = 333
            modelerInfo.get('devStateModel').some(state => {
                if (state.get('dataKey') === eventAdd.get('dataKey')) {
                    dataType = state.get('dataType')
                    return true;
                }
                return false
            })
            if (!dataType) {
                modelerInfo.get('sensingDataModel').some(state => {
                    if (state.get('dataKey') === eventAdd.get('dataKey')) {
                        dataType = state.get('dataType')
                        return true;
                    }
                    return false
                })
            }
            dataTypeConvert = GetDataType(dataType)
            break;
        default:
            break;
    }

    return (
        <Modal
            isOpen={dataModal}
            style={{
                overlay: {
                    zIndex: 9999,
                    backgroundColor: 'rgba(33,33,33,0.2)'
                },
                content: {
                    padding: 0,
                    borderRadius: '2px',
                    border: '1px solid #555',
                    backgroundColor: '#fff',
                    top: '70px',
                    left: '0',
                    right: '0',
                    // bottom: '0',
                    // left: '70px',
                    // right: '70px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 175 + DynamicHeight,
                    maxWidth: '550px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="EventModalWrapper">
                <header>
                    <span>이벤트 발생 조건 추가</span>
                    <button onClick={() => changeDataModal(false)}>
                        <MdClose />
                    </button>
                </header>
                <div className="model-data-area">
                    <div className="modeler-upper">
                        <div className="priority">순위</div>
                        <div className="key">연결 KEY</div>
                        <div className="dt">적용조건</div>
                        <div className="event">적용 값</div>
                        <div className="converter">출력 경로</div>
                    </div>
                    <div className="modeler-editor">
                        <div className="priority">
                            <span>{eventAdd.get('priority')}</span>
                            <div className="bt-set">
                                <button
                                    disabled={eventAdd.get('priority') === 1}
                                    onClick={() => upPrioriy(eventAdd.get('priority'), 'eventAdd')}>
                                    <MdExpandLess style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: -1
                                    }} />
                                </button>
                                <button
                                    disabled={eventAdd.get('priority') === modelerInfo.get('events').size + 1}
                                    onClick={() => downPrioriy(eventAdd.get('priority'), 'eventAdd')}>
                                    <MdExpandMore style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: -2
                                    }} />
                                </button>
                            </div>
                        </div>
                        <div className="key">
                            {(modelerInfo.get('devStateModel').size !== 0 || modelerInfo.get('sensingDataModel').size !== 0) &&
                                <select name="dataKey"
                                    value={eventAdd.get('dataKey')}
                                    onChange={(e) => changeModelAdd(e.target.name, e.target.value)}>
                                    {
                                        modelerInfo.get('devStateModel').size !== 0 &&
                                        <option value={modelerInfo.getIn(['devStateModel', 0, 'dataKey'])} key={0}>
                                            {modelerInfo.getIn(['devStateModel', 0, 'dataKey'])}
                                        </option>}
                                    {
                                        modelerInfo.get('devStateModel').map((item, index) => {
                                            if (index !== 0)
                                                return <option value={item.get('dataKey')} key={index}>{item.get('dataKey')}</option>
                                        })
                                    }
                                    {
                                        modelerInfo.get('sensingDataModel').size !== 0 &&
                                        <option value={modelerInfo.getIn(['sensingDataModel', 0, 'dataKey'])} key={modelerInfo.get('devStateModel').size}>
                                            {modelerInfo.getIn(['sensingDataModel', 0, 'dataKey'])}
                                        </option>}
                                    {
                                        modelerInfo.get('sensingDataModel').map((item, index) => {
                                            if (index !== 0)
                                                return <option value={item.get('dataKey')} key={modelerInfo.get('devStateModel').size + index}>{item.get('dataKey')}</option>
                                        })
                                    }
                                </select>}
                        </div>
                        <div className="dt">
                            {/* selected={modelAdd.get('type')==='1'} */}
                            <select name="ruleType" value={eventAdd.get('ruleType')} onChange={(e) => changeModelAdd(e.target.name, e.target.value)}>
                                <option value="1">{'조건 없음'}</option>
                                <option value="2">{'== (eq)'}</option>
                                <option value="3">{'!= (ne)'}</option>
                                <option value="4">{'> (gt)'}</option>
                                <option value="5">{'< (lt)'}</option>
                            </select>
                        </div>
                        <div className="event">
                            <input
                                disabled={eventAdd.get('ruleType') === '1'}
                                name="ruleValue"
                                type="text"
                                onChange={(e) => {
                                    changeModelAdd(e.target.name, e.target.value)
                                }} value={eventAdd.get('ruleValue')}></input>
                        </div>
                        <div className="converter">
                            <select name="outputType" value={eventAdd.get('outputType')} onChange={(e) => changeModelAdd(e.target.name, e.target.value)}>
                                <option value="1">{'알림톡'}</option>
                                <option value="2">{'제어'}</option>
                                <option value="3">{'3rd Server'}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="desc">
                    이미 존재하는 이벤트와 KEY, 조건, 적용 값이 모두 동일하면 추가 불가.
                </div>
                {
                    eventAdd.get('outputType') === '1' &&
                    <Fragment>
                        <div className="notify-text">
                            <span>알림용 텍스트 박스 정의</span>
                        </div>
                        <div className="temp-textbox">
                            <div className="temp-textbox-wrapper">
                                <VisibleTargetedBox
                                    headRows={eventAdd.getIn(['notifyBoxDTO', 'headRow'])}
                                    footRows={eventAdd.getIn(['notifyBoxDTO', 'footRow'])}
                                    postText={eventAdd.getIn(['notifyBoxDTO', 'postText'])}
                                    preText={eventAdd.getIn(['notifyBoxDTO', 'footText'])}
                                    boxType={2}
                                    type={'2'}
                                    eventAdd={eventAdd}
                                    changeTextBoxInfo={changeTextBoxInfo}
                                />
                            </div>
                        </div>
                    </Fragment>
                }
                {
                    eventAdd.get('outputType') === '2' &&
                    <Fragment>
                        <div className="notify-text">
                            <span>제어 이벤트 정의</span>
                        </div>
                        <div className="input-sets">
                            <div className="input-wrap">
                                <span style={{ width: 120 }}>타겟 디바이스</span>
                                <select name="devName" value={eventAdd.getIn(['controlDTO', 'devName'])} onChange={(e) => changeEventAdditionalAdd('controlDTO', e)}>
                                    <option value={devName+'#'+devType} key={0}>
                                        {devName}
                                    </option>
                                    {
                                        deviceInfo.map((item,index)=>{
                                            console.log(item.toJS())
                                            if(devName !== item.get('devName'))
                                            return(
                                                <option value={item.get('devName')+'#'+item.get('authKey')+'#'+item.get('devId')} key={index+1}>
                                                    {item.get('devName')}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-desc" style={{
                                marginLeft: 120
                            }}>제어가 발생하는 디바이스를 선택하세요.</div>
                            <div className="input-wrap">
                                <span style={{ width: 120 }}>이벤트 코드</span>
                                <input disabled={true} value={eventAdd.getIn(['controlDTO', 'evCode'])}></input>
                                <button className="code-select" onClick={()=>changeSelectMap(true)}>선택</button>
                            </div>
                            <div className="input-desc" style={{
                                marginLeft: 120
                            }}>이벤트 발생 시 수행하고자 하는 코드를 선택하세요.</div>
                            {/* <Fragment>
                                <div className="input-wrap" style={{
                                    marginTop: 9
                                }}>
                                    <span style={{ width: 120 }}>1번 파라미터</span>
                                    <input></input>
                                </div>
                                <div className="input-wrap">
                                    <span style={{ width: 120 }}>2번 파라미터</span>
                                    <input></input>
                                </div>
                            </Fragment> */}
                        </div>
                    </Fragment>
                }
                {
                    eventAdd.get('outputType') === '3' &&
                    <Fragment>
                        <div className="notify-text">
                            <span>3rd서버 출력 경로 정의</span>
                        </div>
                        <div className="input-sets">
                            <div className="input-wrap">
                                <span>host 주소</span>
                                <input
                                    name="host"
                                    value={eventAdd.getIn(['thirdServerDTO', 'host'])}
                                    onChange={(e) => changeEventAdditionalAdd('thirdServerDTO', e)}></input>
                            </div>
                            <div className="input-desc">데이터를 수신할 호스트의 IP주소를 기입하세요.</div>
                            <div className="input-wrap">
                                <span>포트</span>
                                <input
                                    name="port"
                                    value={eventAdd.getIn(['thirdServerDTO', 'port'])}
                                    onChange={(e) => changeEventAdditionalAdd('thirdServerDTO', e)}></input>
                            </div>
                            <div className="input-desc">데이터를 수신할 호스트의 포트를 기입하세요. 미 기입시 80포트 사용</div>
                            <div className="input-wrap">
                                <span>URL</span>
                                <input
                                    name="path"
                                    value={eventAdd.getIn(['thirdServerDTO', 'path'])}
                                    onChange={(e) => changeEventAdditionalAdd('thirdServerDTO', e)}></input>
                            </div>
                            <div className="test-area">
                                <button
                                    className="test-btn"
                                    onClick={() => sendToThirdServer({
                                        devType: devType,
                                        mac: 'AA:BB:CC:DD:EE:FF',
                                        data: dataTypeConvert
                                    })}>Test Connection (POST)</button>
                                <div className="msg">
                                    {res === null && <span>{'수신할 서버와의 연결 테스트를 수행해주세요.'}</span>}
                                    {res && res.get('status') && <span className="success-msg">{res.get('msg')}</span>}
                                    {res && res.get('status') === false && <span className="fail-msg">{res.get('msg')}</span>}
                                </div>
                                <div className="json-area">
                                    <SyntaxHighlighter
                                        lineNumberStyle={{
                                            color: '#888'
                                        }}
                                        language="json"
                                        style={tomorrow}
                                        customStyle={{
                                            margin: 0,
                                            padding: '5px',
                                            height: '100%',
                                            overflow: 'auto'
                                        }}
                                        showLineNumbers>
                                        {`{
    "devType": "${devType}",
    "mac": "AA:BB:CC:DD:EE:FF",
    "data": ${dataTypeConvert}
}`}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }
                <button className="model-add" onClick={addEvent} disabled={
                    eventAdd.get('outputType') === '3' && (!res || !res.get('status'))
                }>추가</button>
            </div>
        </Modal >
    )
}

export default EventModalWrapper;