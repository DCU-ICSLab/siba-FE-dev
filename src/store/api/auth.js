import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//skill 서버로 데이터 전송
export const getUserInfo = (authCode) =>{

    const baseURL = `${API_BASE_URL}/user`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}