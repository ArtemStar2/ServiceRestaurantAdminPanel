import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { ResponseSolo } from "../models/response/soloResponse"

export default class userService{
    static fetchUser():Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/api/users')
    }
    static deleteUser(userId: string):Promise<AxiosResponse<ResponseSolo>>{
        return $api.post<ResponseSolo>('/api/auth/admin/delete', {userId})
    }
    static createUser(login: string, password: string):Promise<AxiosResponse<IUser>>{
        return $api.post<IUser>('/api/auth/admin/create', {login, password})
    }
}