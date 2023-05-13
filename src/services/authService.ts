import $api from "../http";
import { AxiosResponse } from "axios";
import { authResponse } from "../models/response/authResponse";

export default class authService{
    static async auth(login: string, password: string): Promise<AxiosResponse<authResponse>>{
        return  $api.post<authResponse>('/api/auth/admin', {login, password});
    }
    static async logout(): Promise<void>{
        return $api.post('/api/auth/logout');
    }
}