import $api from "../http";
import { AxiosResponse } from "axios";
import { IProduct } from "../models/IProduct";
import { ResponseSolo } from "../models/response/soloResponse"

export default class productService{
    static fetchProducts():Promise<AxiosResponse<IProduct[]>>{
        return $api.get<IProduct[]>('/api/product')
    }
    static fetchProductOne(id: string | undefined):Promise<AxiosResponse<IProduct>>{
        return $api.get<IProduct>('/api/product/' + id)
    }
    
    static deleteProducts(productId: string):Promise<AxiosResponse<ResponseSolo>>{
        return $api.post<ResponseSolo>('/api/product/delete', {productId})
    }
    static productUpdate(data: FormData):Promise<AxiosResponse<IProduct>>{
        return $api.post<IProduct>('/api/product/update', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    static createProducts(data: FormData):Promise<AxiosResponse<IProduct>>{
        console.log(data);
        return $api.post<IProduct>('/api/product/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}