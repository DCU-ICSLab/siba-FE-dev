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

    switch (type) {

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

    let judge = null;
    if(preText)
        judge = preText.split('$')

    return (
        <div id="VisibleTargetedBox" style={{
            marginLeft: boxType==7 ? 13 : 19
        }}>
            <div className="text-area" style={{
                maxWidth: boxType==7 ? 185 : 175
            }}>
                {boxType != 7 && <Fragment>
                    <textarea
                        className="pretext"
                        name="preorder"
                        disabled={type === '1'}
                        rows={headRows}
                        value={preText}
                        placeholder="선행 텍스트 입니다."
                        onChange={(e) => changeFunc(e, 'headRow')}>
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
                        disabled={type === '1'}
                        rows={footRows}
                        value={postText}
                        placeholder="후행 텍스트 입니다."
                        onChange={(e) => changeFunc(e, 'footRow')}>
                    </textarea>
                </Fragment>}
                {boxType == 7 &&
                    <Fragment>
                        <div className="state-val">
                            <header>state</header>
                            <div>{judge[0] == '' ? '-' : judge[0]}</div>
                        </div>
                        <div className="state-op">
                            <header>op</header>
                            <div>{judge[1] == '' ? ' ' : judge[1]}</div>
                        </div>
                        <div className="fix-val">
                            <header>value</header>
                            <div>{judge[2] == '' ? '-' : judge[2]}</div>
                        </div>
                    </Fragment>
                }
            </div>
            <div className="lt" />
            <div className="lb" />
            <div className="rt" style={{
                right: boxType==7 ? 6 : 12
            }}/>
            <div className="rb" style={{
                right: boxType==7 ? 6 : 12
            }}/>
        </div>
    )
}

export default VisibleTargetedBox;