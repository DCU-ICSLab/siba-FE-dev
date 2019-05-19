import React, { Fragment } from 'react';
import './Siba.css';
import siba from 'resources/siba.jpg';

const Siba = ({ children, sibaTalkFunc, sbTalk, sibaCallFunc }) => {
    return (
        <div id="Siba" onMouseEnter={sibaTalkFunc} onMouseLeave={sibaTalkFunc} onClick={sibaCallFunc}>
            <img src={siba} width="53" height="50" draggable="false"/>

            {sbTalk &&
                <Fragment>
                    <div className="talk">
                        <span>테스트하려면 클릭하라 왈!</span>
                    </div>
                    <div className="talk-tri"></div>
                </Fragment>
            }
        </div>
    )
}

export default Siba;