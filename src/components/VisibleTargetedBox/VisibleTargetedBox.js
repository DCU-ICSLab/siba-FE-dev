import React, { Fragment } from 'react';
import './VisibleTargetedBox.css';

const VisibleTargetedBox = ({
    children,
    headRows,
    footRows,
    preText,
    postText,
    buttons,
    boxType,
    targetedBox,
    type,
    changeTextBoxInfo,
    eventAdd
}) => {

    let changeFunc = undefined;

    switch(type){

        case '0':
            changeFunc = (e, location) => { 
                changeTextBoxInfo(e, targetedBox.getIn(['block', 'id']), 'height', location, targetedBox.getIn(['block', location])) 
            }
            break;

        //조회 박스 수정
        case '1':
            changeFunc = undefined
            break;

        //알림 박스 수정
        case '2':
            changeFunc = (e, location) => { changeTextBoxInfo(e, location) }
            break;

        default:
            break;
    }

    return (
        <div id="VisibleTargetedBox">
            <div className="text-area">
                <textarea 
                className="pretext" 
                name="preorder"
                disabled={type==='1'} 
                rows={headRows} 
                value={preText}
                placeholder="선행 텍스트 입니다."
                onChange={(e)=>changeFunc(e, 'headRow')}>
                </textarea>
                {(boxType === 1 || boxType === 5) && <div>
                    {
                        buttons.map((btn, index) => {
                            return (
                                <div key={index}>{index + 1}. {btn.get('name')}</div>
                            )
                        })
                    }
                </div>}
                {boxType === 3 &&
                    <button
                        className="time-set-btn"
                        disabled={true}>시간 설정</button>}
                <textarea 
                className="posttext" 
                name="postorder"
                disabled={type==='1'} 
                rows={footRows} 
                value={postText}
                placeholder="후행 텍스트 입니다."
                onChange={(e) => changeFunc(e, 'footRow')}>
                </textarea>
                {/* {postText !== '' && <div className="posttext">{postText}</div>} */}
            </div>
            <div className="lt"/>
            <div className="lb"/>
            <div className="rt"/>
            <div className="rb"/>
        </div>
    )
}

export default VisibleTargetedBox;