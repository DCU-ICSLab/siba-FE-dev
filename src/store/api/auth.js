import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//skill 서버로 데이터 전송
export const getUserInfo = () =>{

    const baseURL = `${API_BASE_URL}/user`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

// 새 디바이스 생성
export const createDevice = (deviceInfo) =>{

    const baseURL = `${API_BASE_URL}/device`

    console.log(deviceInfo)

    return axios.post(baseURL, deviceInfo)
    .then(res=> {
        console.log(res);
        return res;
    });
}

//새 허브 구성 생성
export const vhubCreate = (hubInput) =>{

    const baseURL = `${API_BASE_URL}/vhub`

    return axios.post(baseURL,{
        hubName: hubInput.get('hubName'),
        authKey: hubInput.get('authKey'),
        hubType: hubInput.get('hubType')
    })
    .then(res=> {
        console.log(res);
        return res;
    });
}