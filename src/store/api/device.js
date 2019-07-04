import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

export const getDeviceDetail = (devId) =>{

    console.log(devId)

    const baseURL = `${API_BASE_URL}/device/${devId}`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const saveDeviceTextBoxGraph = (devId, textBoxGraph) =>{

    const baseURL = `${API_BASE_URL}/device/${devId}`

    return axios.post(baseURL, textBoxGraph)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const deployDeviceTextBoxGraph = (devId, textBoxGraph) =>{

    const baseURL = `${API_BASE_URL}/device/${devId}/deploy`

    return axios.post(baseURL, textBoxGraph)
    .then(res=> {
        console.log(res);
        return res;
    });
}

export const getDeviceAuthKey = () =>{

    const baseURL = `${API_BASE_URL}/device/authkey`

    return axios.post(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}