import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

export const getDeviceDetail = (authKey) =>{

    const baseURL = `${API_BASE_URL}/device/${authKey}`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const saveDeviceTextBoxGraph = (authKey, textBoxGraph) =>{

    const baseURL = `${API_BASE_URL}/device/${authKey}`

    return axios.post(baseURL, textBoxGraph)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const deployDeviceTextBoxGraph = (authKey, textBoxGraph) =>{

    const baseURL = `${API_BASE_URL}/device/${authKey}/deploy`

    return axios.post(baseURL, textBoxGraph)
    .then(res=> {
        console.log(res);
        return res;
    });
}