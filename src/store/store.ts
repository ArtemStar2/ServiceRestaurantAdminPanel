import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import authService from "../services/authService";
import axios from "axios";
import { authResponse } from "../models/response/authResponse";
import { API_URL } from "../http";
import toast from "react-hot-toast";

interface Order{
    id: string | undefined;
    count: number;
    price: number;
}
function addObjectToArray(array:any, object:any) {
    const index = array.findIndex((item:any) => item.id === object.id);
    if (index === -1) {
      array.push(object);
    } else {
      array[index].count += object.count;
    }
    return array;
}

function removeItemByIndex(array:any, index:any) {
    if (index > -1 && index < array.length) {
      array.splice(index, 1);
    }
    return array;
}
export default class Store{
    user = {} as IUser
    isAuth = false;
    isLoading = false;
    order = [] as Order[];

    constructor(){
        makeAutoObservable(this, {}, { autoBind: true });
    }
    setAuth(bool: boolean){
        this.isAuth = bool;
    }
    setUser(user: IUser){
        this.user = user
    }
    setLoading(bool: boolean){
        this.isLoading = bool;
    }
    addOrder(id: string | undefined, count: number, price:number){
        addObjectToArray(this.order, {id: id, count: count, price: price})
        // this.order.push({id: id, count: count, price: price});  
    }
    deleteOrder(index: number){
        removeItemByIndex(this.order, index)
        // this.order.push({id: id, count: count, price: price});  
    }
    clearOrder(){
        this.order = [];
        // this.order.push({id: id, count: count, price: price});  
    }
    async auth(login: string, password: string){
        const id = toast.loading("Загрузка ...")
        try{
            const response = await authService.auth(login, password)
            toast.success('Авторизован', {id: id});
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch(e: any){
            toast.error('Ошибка: ' + e?.response?.data?.massage, {id: id})
        }
    }
    
    async logout(){
        const id = toast.loading("Загрузка ...")
        try{
            await authService.logout()
            toast.success('Вы вышли из системы', {id: id});
            localStorage.removeItem('token')
            this.setAuth(false);
            this.setUser({} as IUser)
        } catch(e: any){
            toast.error('Ошибка: ' + e?.response?.data?.massage, {id: id})
        }
    }

    async chechAuth(){
        this.setLoading(true);
        try{
            const response = await axios.get<authResponse>(`${API_URL}/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch(e ){
            console.log((e as Error).message);
        } finally {
            this.setLoading(false)
        }
    }
}