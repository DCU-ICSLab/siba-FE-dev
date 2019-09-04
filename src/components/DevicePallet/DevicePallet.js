import React, { Fragment } from 'react';
import './DevicePallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { VisibleTargetedBox } from 'components';
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
import DraggableLinker from 'components/TextBox/DraggableLinker';
import GetButtonType from 'utils/GetButtonType'
import { BUTTON_TYPE } from 'constants/index';

const JudgeEditor = ({ changeJudgeInfo, targetedBox }) => {
    const preText = targetedBox.getIn(['block', 'preorder'])
    console.log(preText);
    const tempText = preText.split('$')
    const sVal = tempText[0]
    const comparison = tempText[1]
    const cVal = tempText[2]
    return (<div className="judge-area">
        <div className="judge-item">
            <div className="judge-ct">상태 값</div>
            <div className="judge-in">
                <input value={sVal}
                    onChange={(e) => changeJudgeInfo(e.target.value + '$' + comparison + '$' + cVal, targetedBox.getIn(['block', 'id']))}>
                </input>
            </div>
        </div>
        <div className="judge-item">
            <div className="judge-ct">연산</div>
            <div className="judge-in">
                <select name="preorder"
                    value={comparison}
                    onChange={(e) => changeJudgeInfo(sVal + '$' + e.target.value + '$' + cVal, targetedBox.getIn(['block', 'id']))}>
                    {/* <option value="1">{'조건 없음'}</option> */}
                    <option value="==">{'== (eq)'}</option>
                    <option value="!=">{'!= (ne)'}</option>
                    <option value=">">{'> (gt)'}</option>
                    <option value="<">{'< (lt)'}</option>
                </select>
            </div>
        </div>
        <div className="judge-item">
            <div className="judge-ct">비교 값</div>
            <div className="judge-in">
                <input value={cVal}
                    onChange={(e) => changeJudgeInfo(sVal + '$' + comparison + '$' + e.target.value, targetedBox.getIn(['block', 'id']))}>
                </input>
            </div>
        </div>
    </div>)
}

const TypeCheck = ({ label, value, text, tempButton, targetedBox, buttonTypeChange }) => {
    return (
        <label htmlFor={label}>
            <input
                id="ctrl"
                type="radio"
                name="option"
                value={value}
                checked={targetedBox.getIn(['block', 'info', 'buttons', tempButton.get('idx'), 'type']) === value}
                onChange={(e) => buttonTypeChange(e, tempButton.get('idx'))}
            ></input><span>{text}({value})</span>
        </label>
    )
}

const ButtonCard = ({ button, idx, addonOpen, setTempBtn, tempButton, findChild, deleteButton }) => {


    return (
        <div className="btn-obj" style={{
            backgroundColor: tempButton && tempButton.get('idx') === idx ? '#F1DF26' : '#4994DB'
        }}>
            <span>{idx + 1}번 버튼 <span> (event code: {button.get('eventCode')})</span></span>
            <button className="btn-obj-del" onClick={(e)=>deleteButton(e, idx)}>
                <MdClose />
            </button>
            <div style={{
                marginTop: 15
            }}>
                <span className="btn-obj-type">{GetButtonType(button.get('type'))} 버튼</span>
                <button
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
                    }} /> Edit</button>
            </div>
        </div>
    )
}

const DevicePallet = ({
    children,
    childBox,
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
    deployDeviceTextBoxGraph,
    modalChange,
    buttonTypeChange,
    draggableLinkerEnd,
    isAddOn,
    tempButton,
    setTempBtn,
    tempBtnClear,
    isTypeChange,
    typeChange,
    findChild,
    isSaveRes,
    isDeployRes,
    addonOpen,
    changeJudgeInfo,
    deleteButton }) => {

    let type = targetedBox && targetedBox.getIn(['block', 'type']);

    return (
        <div id="DevicePallet">

            {/* side bar */}
            <div className="side">
                <div className="side-title" style={{
                    position: 'fixed',
                    backgroundColor: '#fff',
                    width: 231,
                    textAlign: 'center',
                    zIndex: 9999
                }}>챗봇 텍스트박스 구성</div>
                <div className="side-wrapper">
                    <div className="side-section" style={{
                        paddingTop: '40px'
                    }}>
                        <div className="side-section-title">텍스트박스 도구 상자</div>
                        <div className="draggable-wrap">
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={1} />
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={2} />
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={3} />
                            {/* <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={4} /> */}
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={5} option={haveEntry} />
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={6} />
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={7} />
                            <DraggableTextBox dragStart={dragStart} dragOver={dragOver} type={8} />
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
                                        <td style={{ textAlign: 'center' }}>-</td>
                                        <td style={{ textAlign: 'center' }}>-</td>
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
                                            <td>{(targetedBox.getIn(['block', 'parentBox']).size !== 0).toString()}</td>
                                        </tr>
                                        <tr>
                                            <td>isSpread</td>
                                            <td>{(type === 3 || type === 2).toString()}</td>
                                        </tr>
                                        <tr>
                                            {
                                                type !== 7  && <Fragment>
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
                                                            onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height', 'headRow', targetedBox.getIn(['block', 'headRow'])) }}>
                                                        </textarea>
                                                    </td>
                                                </Fragment>
                                            }
                                            {
                                                type == 7  && <Fragment>
                                                    <td>statement</td>
                                                    <td>
                                                        <textarea
                                                            spellCheck="false"
                                                            name="preorder"
                                                            style={{
                                                                imeMode: 'active' //default는 한글
                                                            }}
                                                            rows={targetedBox.getIn(['block', 'headRow'])}
                                                            value={(targetedBox.getIn(['block', 'preorder'])).replace(/\$/g,' ')}
                                                            onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height', 'headRow', targetedBox.getIn(['block', 'headRow'])) }}>
                                                        </textarea>
                                                    </td>
                                                </Fragment>
                                            }
                                        </tr>
                                        {type!==7 && <tr>
                                            <td>foot text</td>
                                            <td>
                                                <textarea
                                                    spellCheck="false"
                                                    name="postorder"
                                                    style={{
                                                        imeMode: 'active' //default는 한글
                                                    }}
                                                    rows={targetedBox.getIn(['block', 'footRow'])}
                                                    value={targetedBox.getIn(['block', 'postorder'])}
                                                    onChange={(e) => { changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height', 'footRow', targetedBox.getIn(['block', 'footRow'])) }}>
                                                </textarea>
                                            </td>
                                        </tr>}
                                        {(type === 2 || type === 3) &&
                                            <Fragment>
                                                <tr>
                                                    <td>parent id</td>
                                                    <td>{targetedBox.getIn(['block', 'parentBox', 0, 'parentId'])}</td>
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

                    {targetedBox && (type === 1) &&
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
                                            <td style={{ textAlign: 'center' }}>-</td>
                                            <td style={{ textAlign: 'center' }}>-</td>
                                        </tr>}

                                    {targetedBox.getIn(['block', 'parentBox']).map((box, index) => {
                                        if (targetedBox.getIn(['block', 'id']) !== box.get('parentId'))
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
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
                                                                    <td>{box.get('parentId')}{box.get('parentId') === 0 && <span>{' (entry)'}</span>}</td>
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
                                                <td>{index + 1}</td>
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
                                                                <td style={{
                                                                    width: 145
                                                                }}>{button.get('name')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{
                                                                    // textDecoration: button.get('linker') ? 'line-through' : 'none'
                                                                }}>type</td>
                                                                <td>{GetButtonType(button.get('type'))} 버튼</td>
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
                            {/* {targetedBox.getIn(['block', 'info', 'buttons']).size !== 9 &&
                                <div style={{ width: '100%' }}>
                                    <button className="btn-add" onClick={(e) => { addBtnFuncSide(e, targetedBox.getIn(['block', 'id'])) }}>
                                        <MdAdd size={16} />
                                    </button>
                                </div>} */}
                        </div>}
                </div>
            </div>

            <div className="toolbox">
                <button className="toolbtn" onClick={saveDeviceTextBoxGraph}>
                    <MdSave style={{
                        position: 'absolute',
                        top: 3
                    }} />
                    <span style={{ marginLeft: 13 }}>저장</span>
                </button>
                <button className="toolbtn">
                    <MdBuild style={{
                        position: 'absolute',
                        top: 3
                    }} />
                    <span style={{ marginLeft: 13 }}>컴파일</span>
                </button>
                <button className="toolbtn" onClick={deployDeviceTextBoxGraph}>
                    <MdVerticalAlignTop style={{
                        position: 'absolute',
                        top: 3
                    }} />
                    <span style={{ marginLeft: 13 }}>배포</span>
                </button>
                <button className="toolbtn" onClick={modalChange}>
                    <MdGetApp style={{
                        position: 'absolute',
                        top: 3
                    }} />
                    <span style={{ marginLeft: 13 }}>코드 추출</span>
                </button>
                <button className="toolbtn">
                    <MdBugReport style={{
                        position: 'absolute',
                        top: 3
                    }} />
                    <span style={{ marginLeft: 13 }}>테스트</span>
                </button>
            </div>

            {/* pallet */}
            <div className="overflow-trick"></div>
            <div className="pallet" onScroll={scrollFunc}>
                <div className="background"></div>
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
                {isAddOn && <div className="pallet-shadow">
                </div>}
            </div>

            {/* left */}
            <div className="btn-set">
                <div className="btn-set-wrapper">
                    <header>
                        <span>버튼 편집기</span>
                    </header>
                    <div className="temp-textbox">
                        <div className="temp-textbox-wrapper">
                            {targetedBox &&
                                <VisibleTargetedBox
                                    headRows={targetedBox.getIn(['block', 'headRow'])}
                                    footRows={targetedBox.getIn(['block', 'footRow'])}
                                    preText={targetedBox.getIn(['block', 'preorder'])}
                                    postText={targetedBox.getIn(['block', 'postorder'])}
                                    buttons={targetedBox.getIn(['block', 'info', 'buttons'])}
                                    boxType={targetedBox.getIn(['block', 'type'])}
                                    changeTextBoxInfo={changeTextBoxInfo}
                                    targetedBox={targetedBox}
                                    type={'0'}
                                />}
                        </div>
                    </div>
                    <div className="btn-set-wrapper-body" style={{
                        top: targetedBox ?
                            129 + targetedBox.getIn(['block', 'info', 'buttons']).size * 18 + targetedBox.getIn(['block', 'headRow']) * 20 + targetedBox.getIn(['block', 'footRow']) * 20
                            : 189
                    }}>
                        {
                            (targetedBox && targetedBox.getIn(['block', 'type']) === 7) &&
                            <JudgeEditor targetedBox={targetedBox} changeJudgeInfo={changeJudgeInfo} />
                        }
                        {
                            (targetedBox && (targetedBox.getIn(['block', 'type']) === 1 || targetedBox.getIn(['block', 'type']) === 5)) &&
                            <Fragment>
                                {targetedBox.getIn(['block', 'info', 'buttons']).map((button, index) => {
                                    return (
                                        <ButtonCard
                                            findChild={findChild}
                                            key={index}
                                            button={button}
                                            addonOpen={addonOpen}
                                            setTempBtn={setTempBtn}
                                            idx={index}
                                            tempButton={tempButton} 
                                            deleteButton={deleteButton}/>
                                    )
                                })}
                                {targetedBox.getIn(['block', 'info', 'buttons']).size !== 9 && <div style={{
                                    margin: '10px 5px',
                                }}>
                                    <button className="btn-adder" onClick={(e) => { addBtnFuncSide(e, targetedBox.getIn(['block', 'id'])) }}>
                                        <MdAdd size={18} /> <span>버튼 추가</span>
                                    </button>
                                </div>}
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
            {isAddOn &&
                <div className="edit-addon">
                    <header>
                        <span>{tempButton.get('idx') + 1}번 버튼</span>
                        <button className="edit-addon-close"
                            onClick={(e) => {
                                addonOpen(false)
                                tempBtnClear();
                            }}>close</button>
                    </header>
                    <div>
                        <div className="sec-row">
                            <div className="sec-left">버튼 타입</div>
                            <div className="sec-right">
                                <span>{GetButtonType(tempButton.get('type'))} 버튼</span>
                                <button
                                    disabled={isTypeChange}
                                    className="change-type-btn"
                                    onClick={(e) => { typeChange(true) }}>
                                    타입 변경
                                </button>
                            </div>
                        </div>
                        {isTypeChange && <div className="type-selector">
                            <form className="btn-option">
                                <TypeCheck
                                    label="ctrl"
                                    text="제어"
                                    value="1"
                                    targetedBox={targetedBox}
                                    tempButton={tempButton}
                                    buttonTypeChange={buttonTypeChange} />
                                <TypeCheck
                                    label="get-res"
                                    text="조회-예약"
                                    value="2"
                                    targetedBox={targetedBox}
                                    tempButton={tempButton}
                                    buttonTypeChange={buttonTypeChange} />
                                <TypeCheck
                                    label="get-dt"
                                    text="조회-센싱"
                                    value="3"
                                    targetedBox={targetedBox}
                                    tempButton={tempButton}
                                    buttonTypeChange={buttonTypeChange} />
                                <TypeCheck
                                    label="get-dev"
                                    text="조회-디바이스"
                                    value="4"
                                    targetedBox={targetedBox}
                                    tempButton={tempButton}
                                    buttonTypeChange={buttonTypeChange} />
                                <TypeCheck
                                    label="res"
                                    text="예약"
                                    value="5"
                                    targetedBox={targetedBox}
                                    tempButton={tempButton}
                                    buttonTypeChange={buttonTypeChange} />
                                <div style={{
                                    textAlign: 'right'
                                }}>
                                    <button className="change-type-btn"
                                        onClick={(e) => { typeChange(false) }}>변경 취소</button>
                                </div>
                            </form>
                        </div>}
                        <div className="sec-row">
                            <div className="sec-left">버튼 텍스트</div>
                            <div className="sec-right">
                                <input
                                    className="btn-name-in"
                                    style={{
                                        imeMode: 'active', //default는 한글
                                        border: '1px solid #dadce0'
                                    }}
                                    name="name"
                                    value={targetedBox.getIn(['block', 'info', 'buttons', tempButton.get('idx'), 'name'])}
                                    onChange={(e) => {
                                        devBtnInfoChange(e, targetedBox.getIn(['block', 'id']), tempButton.get('idx'))
                                    }
                                    } />
                            </div>
                        </div>
                        <div className="sec-row">
                            <div className="sec-left">하위 박스</div>
                            <div className="sec-right">{tempButton.get('childId') ? '#' + tempButton.get('childId') : 'child is not exist (End)'}</div>
                        </div>
                        <div className="ch-info">
                            {tempButton.get('childId') && <VisibleTargetedBox
                                headRows={childBox.get('headRow')}
                                footRows={childBox.get('footRow')}
                                preText={childBox.get('preorder')}
                                postText={childBox.get('postorder')}
                                buttons={childBox.getIn(['info', 'buttons'])}
                                boxType={childBox.get('type')}
                            />}
                        </div>
                    </div>
                </div>}

            {
                isSaveRes &&
                //true && 
                <div className="alert-box">
                    <span>텍스트 박스 그래프 저장이 성공적으로 수행되었습니다 :)</span>
                </div>
            }

            {
                isDeployRes &&
                //true && 
                <div className="alert-box" style={{
                    width: 380
                }}>
                    <span>스킬 서버로 텍스트 박스 그래프 배포가 성공적으로 수행되었습니다. :)</span>
                </div>
            }
        </div>
    )
}

export default DevicePallet;