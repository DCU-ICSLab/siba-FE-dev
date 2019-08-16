import React, { Component, Fragment } from 'react';
import { MdClose, MdCached } from 'react-icons/md'
import './EventModalWrapper.css';
import Modal from 'react-modal';

const EventModalWrapper = ({ 
    dataModal, 
    changeDataModal, 
    changeModelAdd, 
    ruleAdd, 
    addDataModel, 
    modelerInfo,
    addStateRule
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
                    height: '175px',
                    maxWidth: '520px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="EventModalWrapper">
                <header>
                    <span>이벤트 발생 조건 추가</span>
                    <button onClick={()=>changeDataModal(false)}>
                        <MdClose/>
                    </button>
                </header>
                <div className="model-data-area">
                    <div className="modeler-upper">
                        <div className="key">연결 KEY</div>
                        <div className="dt">적용조건</div>
                        <div className="event">적용 값</div>
                        <div className="converter">출력 경로</div>
                    </div>
                    <div className="modeler-editor">
                        <div className="key">
                           {modelerInfo.get('devStateModel').size!==0 && 
                           <select name="key" 
                           value={modelerInfo.getIn(['devStateModel', 0 , 'dataKey'])}
                           onChange={(e)=>changeModelAdd(e.target.name, e.target.value)}>
                                <option value={modelerInfo.getIn(['devStateModel', 0 , 'dataKey'])} key={0}>
                                {modelerInfo.getIn(['devStateModel', 0 , 'dataKey'])}
                                </option>
                                {
                                    modelerInfo.get('devStateModel').map((item, index)=>{
                                        if(index!==0)
                                        return <option value={item.get('dataKey')} key={index}>{item.get('dataKey')}</option>
                                    })
                                }
                            </select>}
                        </div>
                        <div className="dt">
                        {/* selected={modelAdd.get('type')==='1'} */}
                            <select name="type" value={ruleAdd.get('type')} onChange={(e)=>changeModelAdd(e.target.name, e.target.value)}>
                                <option value="1">{'조건 없음'}</option>
                                <option value="2">{'== (eq)'}</option>
                                <option value="3">{'!= (ne)'}</option>
                                <option value="4">{'> (gt)'}</option>
                                <option value="5">{'< (lt)'}</option>
                            </select>
                        </div>
                        <div className="event">
                            <input 
                            disabled={ruleAdd.get('type')==='1'}
                            name="fixValue" 
                            type="text" 
                            onChange={(e)=>{
                                changeModelAdd(e.target.name, e.target.value)
                            }} value={ruleAdd.get('fixValue')}></input>
                        </div>
                        <div className="converter">
                            <select name="output" value={ruleAdd.get('output')} onChange={(e)=>changeModelAdd(e.target.name, e.target.value)}>
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
                <button className="model-add" onClick={addStateRule}>추가</button>
            </div>
        </Modal >
    )
}

export default EventModalWrapper;