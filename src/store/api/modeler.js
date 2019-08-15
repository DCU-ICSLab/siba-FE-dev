import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//테스트 시작
export const getModelerInfo = (devId) =>{

    const baseURL = `${API_BASE_URL}/device/${devId}/model`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const addDataModel = (devId, dataModel) =>{

    const baseURL = `${API_BASE_URL}/device/${devId}/model`

    return axios.post(baseURL, dataModel)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const addNewRule = (stateRule, devId) =>{

    const baseURL = `${API_BASE_URL}/rule/${devId}`

    return axios.post(baseURL, stateRule)
    .then(res=> {
        console.log(res);
        return res;
    });
}