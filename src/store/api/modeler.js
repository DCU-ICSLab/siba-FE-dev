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

export const deleteRule = (modId, boxId, idx) =>{

    const baseURL = `${API_BASE_URL}/rule/${modId}/box/${boxId}/idx/${idx}`

    return axios.post(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const addEvent = (eventAdd, devId) =>{

    const baseURL = `${API_BASE_URL}/event/${devId}`

    return axios.post(baseURL,eventAdd)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const deleteEvent = (eventId, type) => {
    const baseURL = `${API_BASE_URL}/event/${eventId}/type/${type}`

    return axios.delete(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const sendToThirdServer = (path, dataset) => {
    return axios.post(path, dataset)
    .then(res=> {
        console.log(res);
        return res;
    });
}