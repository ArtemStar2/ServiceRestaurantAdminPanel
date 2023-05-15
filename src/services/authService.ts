import $api from "../http";
import { AxiosResponse } from "axios";
import { authResponse } from "../models/response/authResponse";
declare const window: any;

const tg = window?.Telegram?.WebApp;
console.log(tg);
export default class authService{
    static async auth(login: string, password: string): Promise<AxiosResponse<authResponse>>{
        if(!password){
            return  $api.post<authResponse>('/api/auth/', {login});
        }
        return  $api.post<authResponse>('/api/auth/admin', {login, password});
    }
    static async logout(): Promise<void>{
        return $api.post('/api/auth/logout');
    }
}