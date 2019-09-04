import React, { Component, Fragment } from 'react';
import { MdClose } from 'react-icons/md'
import './MapModalWrapper.css';
import Modal from 'react-modal';
import TextBox from 'components/TextBox/TextBox';
import Linker from 'components/TextBox/Linker';

const MapModalWrapper = ({
    dataModal,
    changeSelectMap,
    devName,
    devId,
    children,
    pallet,
    linkers,
    setRef,
    changeEventAdditionalAdd
}) => {

    return (
        <Modal
            isOpen={dataModal}
            style={{
                overlay: {
                    zIndex: 9999,
                    backgroundColor: 'rgba(33,33,33,0.2)'
                },
                content: {
                    padding: 0,
                    borderRadius: '2px',
                    border: '1px solid #555',
                    backgroundColor: '#fff',
                    top: '70px',
                    left: '100px',
                    right: '100px',
                    bottom: '70px',
                    // left: '70px',
                    // right: '70px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    //height: 175,
                    //maxWidth: '550px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="MapModalWrapper">
                <header>
                    <span>{devName}장비의 발생 이벤트 설정</span>
                    <button onClick={() => changeSelectMap(false)}>
                        <MdClose />
                    </button>
                </header>
                <div className="select-body" id="DevicePallet">
                    <div className="graph-area">
                        <svg className="graph" ref={setRef}>
                            <g className="graph-inner">
                                {pallet && <Fragment>
                                <g>
                                    {pallet.map((boxInfo, index) => {
                                        return (
                                            <TextBox
                                                isSelect={false}
                                                boxInfo={boxInfo}
                                                key={boxInfo.get('id')}
                                                index={index}
                                                isEvent={false} 
                                                isCheckable={true}
                                                controlCheck={changeEventAdditionalAdd}/>)
                                    })}
                                </g>

                                {
                                    linkers.map((linkerInfo, index) => {
                                        return (
                                            <Linker
                                                linkerInfo={linkerInfo}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                                </Fragment>}
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default MapModalWrapper;