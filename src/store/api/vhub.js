import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

export const vhubCreate = () =>{

    const baseURL = `${API_BASE_URL}/vhub`

    return axios.post(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}