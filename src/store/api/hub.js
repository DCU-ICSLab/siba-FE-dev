import axios from 'axios';
//import { API_BASE_URL } from 'constants/index';

// 새 디바이스 생성
export const getHubInfo = (HUB_API_URL, PORT) =>{

    const baseURL = `http://${HUB_API_URL}:${PORT}/hub`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}