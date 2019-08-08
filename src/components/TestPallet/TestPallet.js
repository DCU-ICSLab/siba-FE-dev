import React, { Fragment } from 'react';
import './TestPallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd, MdBuild, MdSave, MdVerticalAlignTop, MdGetApp, MdBugReport } from 'react-icons/md'
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const TestPallet = ({
    children,
    connectedDev
}) => {

    return (
        <div id="TestPallet">

            <div className="toolbox">
                <header>
                target device MAC address: {connectedDev.size!==0 ? <span>{connectedDev.getIn([0,'devMac'])}</span> : <span>not exist</span>}
                </header>
            </div>
            <div className="pallet">
                {children}
            </div>

        </div>
    )
}

export default TestPallet;