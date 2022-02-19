import axios from 'axios'
import API_URLS from '../constants/api-urls.constants';
axios.defaults.baseURL = API_URLS.baseURL;

export { 
    httpLogin,
    httpLogOut,
} from './auth-http.service';

