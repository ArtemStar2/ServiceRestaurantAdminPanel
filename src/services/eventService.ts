import $api from "../http";
import { AxiosResponse } from "axios";
import { IEvent } from "../models/IEvent";
import { ResponseSolo } from "../models/response/soloResponse"

export default class eventService{
    static fetchEvent():Promise<AxiosResponse<IEvent[]>>{
        return $api.get<IEvent[]>('/api/events')
    }
    static fetchEventOne(id: string | undefined):Promise<AxiosResponse<IEvent[]>>{
        return $api.get<IEvent[]>('/api/events/' + id)
    }
    
    static deleteEvents(eventId: string):Promise<AxiosResponse<ResponseSolo>>{
        return $api.post<ResponseSolo>('/api/events/delete', {eventId})
    }
    static EventUpdate(data: FormData):Promise<AxiosResponse<IEvent>>{
        return $api.post<IEvent>('/api/events/update', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    static createEvents(data: FormData):Promise<AxiosResponse<IEvent>>{
        return $api.post<IEvent>('/api/events/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}