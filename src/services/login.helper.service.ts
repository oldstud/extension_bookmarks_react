import axios from 'axios'
import { LoginDataI } from "../interface/auth.interface"
import * as HTTPService from './index'

const token = {
    set(token: string) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
      axios.defaults.headers.common.Authorization = '';
    },
  };

export async function LoginService(data : LoginDataI):Promise< any > {
  const response = await HTTPService.httpLogin(data);
  const user = response.data.data;
  //SaveToBackgroundScript(user)
  token.set(user.token);
  console.log("User", user) 
  return user;
}

export async function LogOutService():Promise<any> {
   const response = await HTTPService.httpLogOut();
   return response
}