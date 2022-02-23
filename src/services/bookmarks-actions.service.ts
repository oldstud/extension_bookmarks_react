import axios from 'axios'
import API_URLS from '../constants/api-urls.constants';

export const httpAddBookmark = (data:any) => {
    return axios.post(API_URLS.createMarksItem,  data);
};

export const httpRemoveBookmark = (url:any) => {
    return axios.post(API_URLS.createMarksItem,  url);
};