import React, { Fragment } from 'react';
import './TestUserTextBox.css';
import Moment from 'react-moment';

const TestUserTextBox = ({
    children,
    time
}) => {

    return (
        <div id="TestUserTextBox">
            <div className="text-body">
                {children}
                <div className="msg-time">
                    <Moment date={time} format="A HH:mm"></Moment>
                </div>
            </div>
        </div>
    )
}

export default TestUserTextBox;