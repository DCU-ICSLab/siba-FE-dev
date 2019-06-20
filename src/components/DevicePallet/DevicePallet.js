import React, { Fragment } from 'react';
import './DevicePallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd, MdBuild, MdSave, MdVerticalAlignTop, MdGetApp, MdBugReport } from 'react-icons/md'
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const DevicePallet = ({
    children,
    dragStart,
    dragOver,
    drop,
    scrollFunc,
    changeTextBoxInfo,
    focusClear,
    addBtnFuncSide,
    devBtnInfoChange,
    targetedBox,
    haveEntry,
    saveDeviceTextBoxGraph,
    draggableLinkerEnd }) => {

    let type = targetedBox && targetedBox.getIn(['block', 'type']);
    targetedBox &&console.log(targetedBox.getIn(['block', 'headRow']))

    return (
        <div id="DevicePallet">
            {/* side bar */}
            <div className="side">
                <div className="side-title">챗봇 텍스트박스 구성</div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 도구 상자</div>
                    <div className="draggable-wrap">
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={1} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={2} />
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={3} />
                        {/* <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={4} /> */}
                        <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={5} option={haveEntry}/>
                        {/* <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={6} /> */}
                    </div>
                </div>
                <div className="side-section">
                    <div className="side-section-title">텍스트박스 속성</div>
                    <table className="pv-wrap">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Property</th>
                                <th style={{ width: '70%' }}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!targetedBox &&
                            <tr>
                                <td style={{textAlign: 'center'}}>-</td>
                                <td style={{textAlign: 'center'}}>-</td>
                            </tr>}
                            {targetedBox &&
                                <Fragment>
                                    <tr>
                                        <td style={{
                                            color: '#005CC5'
                                        }}>box id</td>
                                        <td style={{
                                            color: '#005CC5'
                                        }}>{targetedBox.getIn(['block', 'id'])}</td>
                                    </tr>
                                    <tr>
                                        <td>type</td>
                                        <td>{BUTTON_TYPE.find(x => x.type === type).name}</td>
                                    </tr>
                                    <tr>
                                        <td>isLinked</td>
                                        <td>{(targetedBox.getIn(['block', 'parentBox']).size!==0).toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>isSpread</td>
                                        <td>{(type===3 || type===2).toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>head text</td>
                                        <td>
                                            <textarea
                                                spellCheck="false"
                                                name="preorder"
                                                style={{
                                                    imeMode: 'active' //default는 한글
                                                }}
                                                rows={targetedBox.getIn(['block', 'headRow'])}
                                                value={targetedBox.getIn(['block', 'preorder'])}
                                                onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height','headRow', targetedBox.getIn(['block', 'headRow'])) }}>
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>foot text</td>
                                        <td>
                                            <textarea
                                                spellCheck="false"
                                                name="postorder"
                                                style={{
                                                    imeMode: 'active' //default는 한글
                                                }}
                                                rows={targetedBox.getIn(['block','footRow'])}
                                                value={targetedBox.getIn(['block', 'postorder'])}
                                                onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height', 'footRow', targetedBox.getIn(['block', 'footRow'])) }}>
                                            </textarea>
                                        </td>
                                    </tr>
                                    {(type===2 || type ===3)  &&
                                    <Fragment>
                                        <tr>
                                            <td>parent id</td>
                                            <td>{targetedBox.getIn(['block', 'parentBox',0, 'parentId'])}</td>
                                        </tr>
                                        <tr>
                                            <td>child id</td>
                                            <td>{targetedBox.getIn(['block', 'info', 'buttons', 0, 'linker', 'childId'])}</td>
                                        </tr>
                                    </Fragment>}
                                </Fragment>
                            }
                        </tbody>
                    </table>
                </div>

                {targetedBox && (type === 1 ) && 
                <div className="side-section" style={{ marginTop: '10px' }}>
                    <div className="side-section-title">
                        <div>상위박스 연결 정보</div>
                        <span style={{
                            fontStyle: 'italic',
                            fontSize: 11
                        }}>
                            ( total linked count: <span style={{
                                fontWeight: 'bold',
                                color: '#005CC5'
                            }}>{targetedBox.getIn(['block', 'parentBox']).size}</span> )
                        </span>
                    </div>
                    <table className="pv-wrap">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>No.</th>
                                <th style={{ width: '90%' }}>detail information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targetedBox.getIn(['block', 'parentBox']).size === 0 &&
                            <tr>
                                <td style={{textAlign: 'center'}}>-</td>
                                <td style={{textAlign: 'center'}}>-</td>
                            </tr>}

                            {targetedBox.getIn(['block', 'parentBox']).map((box, index)=>{
                                console.log(targetedBox.getIn(['block','id']))
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td style={{
                                            // borderTop: index!==0 ? '1px solid #dadce0' : 'none',
                                            padding: 0
                                        }}>
                                            <table style={{ width: '100%' }}>
                                                {/* <thead>
                                                    <tr>
                                                        <th style={{ width: '50%' }}>property</th>
                                                        <th style={{ width: '50%' }}>value</th>
                                                    </tr>
                                                </thead> */}
                                                <tbody>
                                                    <tr>
                                                        <td>parent id</td>
                                                        <td>{box.get('parentId')}{box.get('parentId')===0 && <span>{' (entry)'}</span>}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>button idx</td>
                                                        <td>{box.get('parentId')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>button event code</td>
                                                        <td>{box.get('parentId')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        {/* <td>{box.get('parentId')}</span>}</td>
                                        <td>{box.get('code')}</td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}

                {targetedBox && (type === 1 || type === 5) &&
                    <div className="side-section" style={{ marginTop: '10px' }}>
                        <div className="side-section-title">
                            <div>버튼 속성</div>
                            <span style={{
                                fontStyle: 'italic',
                                fontSize: 11
                            }}>
                                ( total button count: <span style={{
                                    fontWeight: 'bold',
                                    color: '#005CC5'
                                }}>{targetedBox.getIn(['block', 'info', 'buttons']).size}</span> )
                            </span>
                        </div>
                        <table className="pv-wrap">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>No.</th>
                                    <th style={{ width: '90%' }}>detail information</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                                    return (
                                        <tr key={button.get('code')}>
                                            <td>{index+1}</td>
                                            <td style={{
                                                padding: 0
                                            }}>
                                                <table style={{ width: '100%' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{
                                                                color: '#005CC5'
                                                            }}>event code</td>
                                                            <td style={{
                                                                color: '#005CC5'
                                                            }}>{button.get('eventCode')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>child id</td>
                                                            <td>{button.getIn(['linker', 'childId'])}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>text</td>
                                                            <td>
                                                                <input
                                                                style={{
                                                                    imeMode: 'active' //default는 한글
                                                                }}
                                                                name="name"
                                                                value={button.get('name')}
                                                                onChange={(e) => { 
                                                                    devBtnInfoChange(e, targetedBox.getIn(['block', 'id']), index) }
                                                                } />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{
                                                                // textDecoration: button.get('linker') ? 'line-through' : 'none'
                                                            }}>sensing</td>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            {/* <td>{index + 1}</td> */}
                                            {/* <td>{button.get('code')}</td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {targetedBox.getIn(['block', 'info', 'buttons']).size !== 9 &&
                            <div style={{ width: '100%' }}>
                                <button className="btn-add" onClick={(e) => { addBtnFuncSide(e, targetedBox.getIn(['block', 'id'])) }}>
                                    <MdAdd size={16} />
                                </button>
                            </div>}
                    </div>}
            </div>

            <div className="toolbox">
                <button className="toolbtn" onClick={saveDeviceTextBoxGraph}>
                    <MdSave style={{
                        position: 'absolute',
                        top: 3}}/>
                        <span style={{marginLeft: 13}}>저장</span>
                    </button>
                <button className="toolbtn">
                    <MdBuild style={{
                        position: 'absolute',
                        top:3
                    }}/>
                    <span style={{marginLeft: 13}}>컴파일</span>
                </button>
                <button className="toolbtn">
                    <MdVerticalAlignTop style={{
                        position: 'absolute',
                        top:3
                    }}/>
                    <span style={{marginLeft: 13}}>배포</span>
                </button>
                <button className="toolbtn">
                    <MdGetApp style={{
                        position: 'absolute',
                        top:3
                    }}/>
                    <span style={{marginLeft: 13}}>코드 추출</span>
                </button>
                <button className="toolbtn">
                    <MdBugReport style={{
                        position: 'absolute',
                        top:3
                    }}/>
                    <span style={{marginLeft: 13}}>테스트</span>
                </button>
            </div>

            {/* pallet */}
            <div className="overflow-trick"></div>
            <div className="pallet" onScroll={scrollFunc}>
                <div className="background">
                </div>
                <svg
                    id="draggable"
                    onClick={focusClear}
                    onDragOver={dragOver}
                    onMouseUp={(e) => draggableLinkerEnd(e)}
                    onDrop={drop}
                    style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        minWidth: '1718px',
                        minHeight: '1151px',
                        position: 'absolute',
                        backgroundImage: 'none',
                    }}>
                    {children}
                </svg>
            </div>
        </div>
    )
}

export default DevicePallet;