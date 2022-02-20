import axios from 'axios'
import { LoginDataI } from "../interface/auth.interface"
import * as HTTPService from './index'
import { UserI } from '../interface/user.interface';

const tokenConfig = {
    set(token: string) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
      axios.defaults.headers.common.Authorization = '';
    },
  };

export async function LoginService(data : LoginDataI):Promise< UserI > {
  const response = await HTTPService.httpLogin(data);
  const user = response.data.data;
  tokenConfig.set(user.token);
  console.log("User", user) 
  return user;
}

export async function LogOutService():Promise<any> {
   const response = await HTTPService.httpLogOut();
   tokenConfig.unset();
   return response
}