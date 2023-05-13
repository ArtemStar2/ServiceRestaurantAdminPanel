import $api from "../http";
import { AxiosResponse } from "axios";
import { IOrder } from "../models/IOrder";
import { ResponseSolo } from "../models/response/soloResponse"

export default class orderService{
    static fetchEvent():Promise<AxiosResponse<IOrder[]>>{
        return $api.get<IOrder[]>('/api/orders')
    }
    static fetchEventOne(id: string | undefined):Promise<AxiosResponse<IOrder>>{
        return $api.get<IOrder>('/api/orders/' + id)
    }
    static fetchProductOrder(str: string):Promise<AxiosResponse<any>>{
        return $api.post<any>('/api/orders/str', {str})
    }
    static deleteOrder(orderId: string):Promise<AxiosResponse<ResponseSolo>>{
        return $api.post<ResponseSolo>('/api/orders/delete', {orderId})
    }
    static OrderUpdate(data: FormData):Promise<AxiosResponse<IOrder>>{
        return $api.post<IOrder>('/api/orders/update', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    static createOrder(data: FormData):Promise<AxiosResponse<IOrder>>{
        return $api.post<IOrder>('/api/orders/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}