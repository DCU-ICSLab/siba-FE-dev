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
                <div className="data-modeler">
                    <div className="model-category" style={{
                        marginTop: 5
                    }}>
                        <header>
                            <span>디바이스 상태 모델 정의</span>
                        </header>
                        <div className="model-body">
                            <div>10 model dataset is define</div>
                            <div>10 model dataset is define</div>
                        </div>
                        <div className="model-table">
                            <header>
                                <div style={{
                                    borderRight: '1px solid #888',
                                    width: '8%'
                                }}>IDX</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>KEY</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>DATA TYPE</div>
                                <div style={{
                                    width: '25%'
                                }}>USE</div>
                            </header>
                            <div className="model-table-body">
                                <button className="dt-adder">데이터 모델 추가</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="model-category" style={{
                        marginBottom: 5
                    }}>
                        <header>
                            <span>센싱 데이터 모델 정의</span>
                        </header>
                        <div className="model-body">
                            <div>10 model dataset is define</div>
                            <div>10 model dataset is define</div>
                        </div>
                        <div className="model-table">
                            <header>
                                <div style={{
                                    borderRight: '1px solid #888',
                                    width: '8%'
                                }}>IDX</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>KEY</div>
                                <div style={{
                                    borderRight: '1px solid #888'
                                }}>DATA TYPE</div>
                                <div style={{
                                    width: '25%'
                                }}>USE</div>
                            </header>
                            <div className="model-table-body">
                                <div className="data-model">
                                    <div style={{
                                        width: 26,
                                        borderRight: '1px solid #888',
                                    }}>1</div>
                                    <div style={{
                                        width: 108,
                                        borderRight: '1px solid #888',
                                    }}>led_on</div>
                                    <div style={{
                                        width: 109,
                                        borderRight: '1px solid #888',
                                    }}>BOOLEAN</div>
                                    <div style={{
                                        width: 60
                                    }}></div>
                                </div>
                                <button className="dt-adder">데이터 모델 추가</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data-editor">
                    <div className="up-editor">
                        <div className="button-set">
                            <header>
                                <span>조회 버튼 집합</span>
                            </header>
                            <div className="button-set-div">
                                <button className="selected">조회-디바이스</button>
                                <button style={{
                                    left: 100
                                }}>조회-센싱</button>
                            </div>
                            <span>total button count: 6</span>
                            <div className="btn-area">
                            </div>
                        </div>
                        <div className="req-text">
                            <header>
                                <span>결과 텍스트박스</span>
                            </header>
                            <div className="req-body">
                                <div className="req-box-area">

                                </div>
                                <div className="link-model-table">
                                    {/* <header>
                                        <div style={{
                                            borderRight: '1px solid #888',
                                            width: '8%'
                                        }}>IDX</div>
                                        <div style={{
                                            borderRight: '1px solid #888'
                                        }}>KEY</div>
                                        <div style={{
                                            borderRight: '1px solid #888'
                                        }}>DATA TYPE</div>
                                        <div style={{
                                            width: '25%'
                                        }}>USE</div>
                                    </header> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className="down-editor">
                        <header>
                            <span>이벤트 정의기</span>
                        </header>
                        <div className="event-area">

                        </div>
                        <div className="event-helper">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SensingPallet;