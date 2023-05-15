import $api from "../http";
import { AxiosResponse } from "axios";
import { ITable } from "../models/ITable";
import { ResponseSolo } from "../models/response/soloResponse"

export default class tableService{
    static fetchTable():Promise<AxiosResponse<ITable[]>>{
        return $api.get<ITable[]>('/api/tables')
    }
    static fetchTableOne(id: string | undefined):Promise<AxiosResponse<any>>{
        return $api.get<ITable>('/api/tables/' + id)
    }
    static deleteTables(tableId: string):Promise<AxiosResponse<ResponseSolo>>{
        return $api.post<ResponseSolo>('/api/tables/delete', {tableId})
    }
    static TableUpdate(data: FormData):Promise<AxiosResponse<ITable>>{
        return $api.post<ITable>('/api/tables/update', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    static createTable(data: FormData):Promise<AxiosResponse<ITable>>{
        return $api.post<ITable>('/api/tables/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}