import React, { Fragment } from 'react';
import './TestBox.css';
import { SendJsonGenerator } from 'utils'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const TestBox = ({
    children
}) => {
    const codeString = SendJsonGenerator()
    return (
        <div id="TestBox">
            <div className="testbox-wrapper">
                {children}
            </div>
        </div>
    )
}

export default TestBox;