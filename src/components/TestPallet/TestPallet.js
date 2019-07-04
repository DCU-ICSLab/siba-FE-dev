import React, { Fragment } from 'react';
import './TestPallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd, MdBuild, MdSave, MdVerticalAlignTop, MdGetApp, MdBugReport } from 'react-icons/md'
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const TestPallet = ({
    children
}) => {

    return (
        <div id="TestPallet">

            <div className="toolbox">
            </div>
            <div className="pallet">
                {children}
            </div>

        </div>
    )
}

export default TestPallet;