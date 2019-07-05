import React, { Fragment } from 'react';
import { MdAccountCircle } from 'react-icons/md'
import './SibaHeader.css';

const SibaHeader = ({ userState }) => {

    let name = null;
    let profileImage = null;
    if(userState.get('user')){
        name = userState.getIn(['user','name'])
        profileImage = userState.getIn(['user','profileImage'])
    }

    return (
        <div id="SibaHeader">
            <h1>SIBA for IoT Developers</h1>
            <div className="util-list">
                <div className="username">
                    {name}
                </div>
                <div className="userimage">
                    {profileImage ?
                        <img alt='Avatar' src={profileImage} height={26} width={26} />
                        : <MdAccountCircle size={26} color="#656565"/>}
                </div>
            </div>
        </div>
    )
}

export default SibaHeader;