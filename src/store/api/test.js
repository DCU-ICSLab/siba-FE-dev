import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//테스트 시작
export const startTest = (authKey, boxId) =>{

    const baseURL = `${API_BASE_URL}/test/${authKey}/box/${boxId}`

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