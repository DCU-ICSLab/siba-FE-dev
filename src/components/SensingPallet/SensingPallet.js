import React, { Fragment } from 'react';
import './SensingPallet.css';
import { DraggableTextBox, FocusBox, TargetBox } from 'components/TextBox/TextBoxHelper';
import { MdAdd, MdBuild, MdSave, MdVerticalAlignTop, MdGetApp, MdBugReport } from 'react-icons/md'
import DraggableLinker from 'components/TextBox/DraggableLinker';
import { BUTTON_TYPE } from 'constants/index';

const SensingPallet = ({
    children
}) => {

    return (
        <div id="SensingPallet">

            <div className="toolbox">
            </div>
            <div className="pallet">
                <div className="hub-list-info">디바이스 센싱 데이터 모델 정의</div>
                <div>
                    
                </div>
                <div className="data-model">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>센싱 키 값</th>
                                <th>데이터 타입</th>
                                <th>전송 주기(sec)</th>
                                <th>전송 프로토콜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default SensingPallet;