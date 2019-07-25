import React, { Fragment } from 'react';
import { MdClose, MdSave } from 'react-icons/md'
import './ModalWrapper.css';
import Modal from 'react-modal';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeGenerator } from 'utils'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ModalWrapper = ({children, codeModal, closeModal, selectedDevice, copy, copyChange}) => {
    const codeString = CodeGenerator(selectedDevice)
    return (
        <Modal 
        isOpen={codeModal}
        style={{
            overlay: {
                zIndex: 9999,
                backgroundColor: 'rgba(33,33,33,0.2)'
            },
            content:{
                padding: 0,
                borderRadius: '2px',
                border: '1px solid #dadce0',
                backgroundColor: '#F5F5F5',
                top: '85px',
                margin: '0 auto',
                // left: '70px',
                // right: '70px',
                maxWidth: 840,
                bottom: '85px',
            }
        }}>
            <div id="ModalWrapper">
                <header>
                    <span className="title">deivce source code generation</span>
                    <button className="close-btn" onClick={closeModal}>
                        <MdClose size={16}/>
                    </button>
                </header>
                <article>
                    <section className="code-box">
                        <div className="code-box-head">
                            <button className="category-btn">Arduino</button>
                            <button className="category-btn disabled">atmega</button>
                            <button className="category-btn disabled">ARM(linux)</button>
                            <button className="category-btn disabled">raspberry</button>
                        </div>
                        <div className="tool-bar">
                            <button className="toolbtn">
                                <MdSave style={{
                                    position: 'absolute',
                                    top: 3
                                }} />
                                <span style={{ marginLeft: 13 }}>코드 저장</span>
                            </button>
                            <CopyToClipboard text={codeString}
                                onCopy={() => copyChange()}>
                                <button className="toolbtn">
                                <MdSave style={{
                                    position: 'absolute',
                                    top: 3
                                }} />
                                <span style={{ marginLeft: 13 }}>복사</span>
                            </button>
                            </CopyToClipboard>
                        </div>
                        <div className="code-box-body">
                            {copy && <div className="copy-st">copied to clipboard success!</div>}
                            <SyntaxHighlighter 
                            language="cpp"
                            style={darcula}
                            customStyle={{
                                margin:0
                            }}
                            showLineNumbers
                            >
                            {codeString}
                            </SyntaxHighlighter>
                        </div>
                        {/* <div className="code-box-foot">
                             {codeString.length} word
                        </div> */}
                    </section>
                </article>
            </div>
        </Modal>
    )
}

export default ModalWrapper;