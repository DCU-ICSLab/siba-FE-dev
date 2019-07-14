import React, { Fragment } from 'react';
import './AdminPallet.css';
import moment from 'moment';
import {
    MdRemove,
    MdDeviceHub
} from 'react-icons/md'

const AdminPallet = ({
    children,
    sbState,
    setRef
}) => {

    return (
        <div id="AdminPallet" style={{ left: sbState ? '273px' : '28px' }}>
            <div className="hub-list">
                <header style={{
                    borderBottom: '1px solid #dadce0',
                    marginLeft: '3px',
                    marginRight: '3px',
                    paddingLeft: '2px'
                }}>
                    <span className="title">테스트 허브</span>
                </header>
                <div className="wrapper">
                    <div className="graph-area">
                    </div>
                    <div className="hub-pallet">
                        {children}
                    </div>
                </div>
                <div className="admin-console" >
                    <header>
                        <span>Run :</span>
                        <span className="console-hub-info">
                            <MdDeviceHub color="#03E103" style={{
                                position: 'absolute',
                                left: 4,
                                top: 4
                            }} />
                            SIBA hub [ 192.168.0.21 ]
                        </span>
                        <button className="console-fold-btn">
                            <MdRemove size={20} />
                        </button>
                    </header>
                    <div ref={ref => setRef(ref)} className="console-body">

                    </div>
                    <div className="admin-console-helper">
                        <button className="selected">
                            <span>terminal</span>
                        </button>
                        <button className="unselected">
                            <span>logs</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPallet;