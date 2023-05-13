import $api from "../http";
import { AxiosResponse } from "axios";
import { IContact } from "../models/IContact";

export default class eventService{
    static fetchContact():Promise<AxiosResponse<IContact>>{
        return $api.get<IContact>('/api/contact')
    }
    static contactUpdate(data: FormData):Promise<AxiosResponse<IContact>>{
        return $api.post<IContact>('/api/contact/update', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    static createContact(data: FormData):Promise<AxiosResponse<IContact>>{
        return $api.post<IContact>('/api/contact/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}