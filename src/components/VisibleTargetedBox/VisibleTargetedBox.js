import React, { Fragment } from 'react';
import './VisibleTargetedBox.css';

const VisibleTargetedBox = ({
    children,
    preText,
    postText,
    buttons,
    boxType,
}) => {

    return (
        <div id="VisibleTargetedBox">
            <div className="text-area">
                <div className="pretext">{preText}</div>
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
                {postText !== '' && <div className="posttext">{postText}</div>}
            </div>
            <div className="lt"/>
            <div className="lb"/>
            <div className="rt"/>
            <div className="rb"/>
        </div>
    )
}

export default VisibleTargetedBox;