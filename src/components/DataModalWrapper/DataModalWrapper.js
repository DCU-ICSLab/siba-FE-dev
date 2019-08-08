import React, { Component, Fragment } from 'react';
import { MdClose, MdCached } from 'react-icons/md'
import './DataModalWrapper.css';
import Modal from 'react-modal';

const DataModalWrapper = ({ dataModal, changeDataModal, changeModelAdd, modelAdd, addDataModel }) => {
    return (
        <Modal
            isOpen={dataModal.get('isOpen')}
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
                    maxWidth: '400px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="DataModalWrapper">
                <header>
                    <span>데이터 모델 추가</span>
                    <button onClick={()=>changeDataModal(false)}>
                        <MdClose/>
                    </button>
                </header>
                <div className="model-data-area">
                    <div className="modeler-upper">
                        <div className="key">KEY</div>
                        <div className="dt">DATA TYPE</div>
                        <div className="event">EVENT</div>
                    </div>
                    <div className="modeler-editor">
                        <div className="key">
                            <input name="key" type="text" onChange={(e)=>{
                                changeModelAdd(e.target.name, e.target.value)
                            }} value={modelAdd.get('key')}></input>
                        </div>
                        <div className="dt">
                        {/* selected={modelAdd.get('type')==='1'} */}
                            <select name="type" value={modelAdd.get('type')} onChange={(e)=>changeModelAdd(e.target.name, e.target.value)}>
                                <option value="1">BYTE</option>
                                <option value="2">INTEGER</option>
                                <option value="3">LONG</option>
                                <option value="4">DOUBLE</option>
                                <option value="5">STRING</option>
                                <option value="6">CHAR</option>
                            </select>
                        </div>
                        <div className="event">
                            <input 
                            id="event-en" 
                            type="radio" 
                            name="event" 
                            value="1"
                            checked={modelAdd.get('event')==='1'}
                            onChange={(e)=>{
                                changeModelAdd(e.target.name, e.target.value)
                            }}/>
                            <label htmlFor="event-en">Y</label>
                            <input 
                            id="event-dis-en" 
                            type="radio" 
                            name="event" 
                            value="0" 
                            checked={modelAdd.get('event')==='0'}
                            onChange={(e)=>{
                                changeModelAdd(e.target.name, e.target.value)
                            }}/>
                            <label htmlFor="event-dis-en">N</label>
                        </div>
                    </div>
                </div>
                <div className="desc">
                    KEY 값은 10자 이내, 영어 대소문자만 가능.
                </div>
                <div className="desc">
                    이미 존재하는 KEY 값은 사용불가.
                </div>
                <button className="model-add" onClick={()=>addDataModel(dataModal.get('modType'))}>추가</button>
            </div>
        </Modal >
    )
}

export default DataModalWrapper;