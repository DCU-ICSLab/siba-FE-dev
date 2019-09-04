import React, { Component, Fragment } from 'react';
import { MdClose, MdExpandLess, MdExpandMore } from 'react-icons/md'
import './RuleModalWrapper.css';
import Modal from 'react-modal';

const RuleModalWrapper = ({
    dataModal,
    changeDataModal,
    changeModelAdd,
    ruleAdd,
    addDataModel,
    modelerInfo,
    addStateRule,
    downPrioriy,
    upPrioriy,
    selectedBox
}) => {
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
                    top: '100px',
                    left: '0',
                    right: '0',
                    // bottom: '0',
                    // left: '70px',
                    // right: '70px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '195px',
                    maxWidth: '550px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="RuleModalWrapper">
                <header>
                    <span>텍스트박스 적용 규칙 추가</span>
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
                        <div className="converter">치환 텍스트</div>
                    </div>
                    <div className="modeler-editor">
                        <div className="priority">
                            <span>{ruleAdd.get('priority')}</span>
                            <div className="bt-set">
                                <button 
                                disabled={ruleAdd.get('priority')===1}
                                onClick={()=>upPrioriy(ruleAdd.get('priority'), 'ruleAdd')}>
                                    <MdExpandLess style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: -1
                                    }}/>
                                </button>
                                <button
                                disabled={selectedBox && ruleAdd.get('priority')===selectedBox.get('rules').size+1}
                                onClick={()=>downPrioriy(ruleAdd.get('priority'), 'ruleAdd')}>
                                    <MdExpandMore style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: -2
                                    }}/>
                                </button>
                            </div>
                        </div>
                        <div className="key">
                            {(modelerInfo.get('devStateModel').size !== 0 || modelerInfo.get('sensingDataModel').size !== 0) &&
                                <select name="key"
                                    value={ruleAdd.get('dataKey')}
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
                                                return <option value={item.get('dataKey')} key={modelerInfo.get('devStateModel').size+index}>{item.get('dataKey')}</option>
                                        })
                                    }
                                </select>}
                        </div>
                        <div className="dt">
                            {/* selected={modelAdd.get('type')==='1'} */}
                            <select name="type" value={ruleAdd.get('type')} onChange={(e) => changeModelAdd(e.target.name, e.target.value)}>
                                <option value="1">{'조건 없음'}</option>
                                <option value="2">{'== (eq)'}</option>
                                <option value="3">{'!= (ne)'}</option>
                                <option value="4">{'> (gt)'}</option>
                                <option value="5">{'< (lt)'}</option>
                            </select>
                        </div>
                        <div className="event">
                            <input
                                disabled={ruleAdd.get('type') === '1'}
                                name="fixValue"
                                type="text"
                                onChange={(e) => {
                                    changeModelAdd(e.target.name, e.target.value)
                                }} value={ruleAdd.get('fixValue')}></input>
                        </div>
                        <div className="converter">
                            <input
                                disabled={ruleAdd.get('type') === '1'}
                                name="convert"
                                type="text" onChange={(e) => {
                                    changeModelAdd(e.target.name, e.target.value)
                                }} value={ruleAdd.get('convert')}></input>
                        </div>
                    </div>
                </div>
                <div className="desc">
                    조건 없음으로 설정 시, KEY값에 대응되는 데이터가 그대로 표출.
                </div>
                <div className="desc">
                    이미 존재하는 RULE과 KEY, 조건, 적용 값이 모두 동일하면 추가 불가.
                </div>
                <button className="model-add" onClick={addStateRule}>추가</button>
            </div>
        </Modal >
    )
}

export default RuleModalWrapper;