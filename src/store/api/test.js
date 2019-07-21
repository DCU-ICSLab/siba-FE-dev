import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//테스트 시작
export const startTest = (devId, boxId) =>{

    const baseURL = `${API_BASE_URL}/test/${devId}/box/${boxId}`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

// 테스트 취소
export const cancelTest = (authKey) =>{

    const baseURL = `${API_BASE_URL}/device`


    return axios.post(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

//명령 전송
export const sendBuildingJson = (cmdList, devMac, vhubId, devId, userId) =>{

    const baseURL = `${API_BASE_URL}/test/${devMac}`

    console.log('dfdfdfdfd')
    console.log(vhubId)
    console.log(devId)
    console.log(userId)

    return axios.post(baseURL, {
        cmdList: cmdList,
        vhubId: vhubId,
        devId:devId,
        userId: userId
    })
    .then(res=> {
        console.log(res);
        return res;
    });
}