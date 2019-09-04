import React, { Fragment } from 'react';
import './TestToolBox.css';
import { MdAccessTime, MdCheckCircle } from 'react-icons/md'
import Moment from 'react-moment';

//최적화 시켜야 함.
const TestInfoCard = ({log, devName})=>{
    const isPending = log.get('testStatus')==='2'

    let className='pending'
    switch(log.get('testStatus')){
        //sucess
        case '0':
            className='success'
            break;
        //fail
        case '1':
            className='failure'
            break;
        //pending
        default:
            break;
    }
    return(
        <div id="TestInfoCard" className={className}>
            <header>
                <span className="test-name"><strong>{devName}/</strong>{log.get('devMac')}</span>
                <span className="test-code"># {log.get('testId')}</span>
            </header>
            <div className="test-card-body">
                <div className="duration">
                    <MdAccessTime/> Duration: {log.get('durationAt') ? <span>{Math.abs(log.get('durationAt'))} sec</span> : '0sec'} 
                </div>
                <div className="finished">
                    <MdCheckCircle/><span> Finished: </span>
                    {log.get('finishedAt') ? 
                    <Moment date={log.get('finishedAt')} format="YYYY/MM/DD HH:mm:ss A"></Moment>
                    : <span> - </span>
                    }
                </div>
            </div>
            <div className="add-on">

            </div>
            <div className="additional">

            </div>
        </div>
    )
}

const TestToolBox = ({
    children,
    setRef,
    renderVisibleBox,
    testLogList,
    devName,
    setGraphRef,
    tab,
    changeSideTab,
    addonTab,
    changeAddonTab
}) => {
    return (
        <div id="TestToolBox">
            <div className="tool-main">
                <div className="tool-upper"></div>
                <div className="tool-side-addon">
                    <button 
                    disabled={addonTab==='1'}
                    className={addonTab==='1' ? 'selected' : ''}
                    onClick={()=>changeAddonTab('1')}
                    style={{
                        top: 44
                    }}>test&nbsp;&nbsp; list</button>
                    <button 
                    disabled={addonTab==='2'}
                    className={addonTab==='2' ? 'selected' : ''}
                    onClick={()=>changeAddonTab('2')}
                    style={{
                        top: 144
                    }}>command&nbsp;&nbsp; list</button>
                </div>
                <div className="tool-side">
                    {addonTab==='1' && 
                    <Fragment>
                    <header>
                        <div>수행 테스트 목록</div>
                        <div className="tool-side-tab">
                            <button disabled={tab==='1'} onClick={(e)=>changeSideTab('1')} className={tab==='1' ? 'selected' : ''}>command list</button>
                            <button disabled={tab==='2'} onClick={(e)=>changeSideTab('2')} className={tab==='2' ? 'selected' : ''}>reservation list</button>
                        </div>
                    </header>
                    <div className="test-list">
                        { tab === '1' &&
                            testLogList.map((log,index)=>{
                                return(
                                    <TestInfoCard key={index} log={log} devName={devName}/>
                                )
                            })
                        }
                    </div>
                    </Fragment>
                    }
                </div>
                <div className="graph-area" ref={setGraphRef}>
                    <svg className="graph" ref={setRef}>
                        <g className="graph-inner">
                            {children}
                            <g>
                                {/* <rect fill="#555" width={200} height={200}></rect>
                                <rect fill="none" width={100} height={100}></rect> */}
                                {/* <rect fill="transparent" width={100} height={100}></rect> */}
                                {renderVisibleBox()}
                            </g>
                        </g>
                    </svg>
                    <svg className="shadow">
                    </svg>
                    <svg className="focus-area"></svg>
                </div>
            </div>
        </div>
    )
}

export default TestToolBox;