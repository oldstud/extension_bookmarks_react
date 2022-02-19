import axios from 'axios'
import { LoginDataI } from '../interface/auth.interface';
import API_URLS from '../constants/api-urls.constants';

export const httpLogin = (data: LoginDataI) => {
    return axios.post(API_URLS.login,  data);
};

export const httpLogOut = () => {
    return axios.post(API_URLS.logout);
};