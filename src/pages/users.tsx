import { FC, useContext, useEffect, useState } from "react";
import userService from '../services/userService'
import { IUser } from '../models/IUser'
import toast from "react-hot-toast";
import UserItem from "../components/users";
import Loading from "../components/loading";
import { Context } from "../main";

const Users : FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function getUsers() {
        try {
            const response = await userService.fetchUser()
            setUsers(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const userDelete = async (id:string) => {
        try {
            await userService.deleteUser(id)
            getUsers();
            toast.success('Успешно удалено')
            
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const userCreate = async (login: string, password: string) => {
        try {
            await userService.createUser(login, password)
            getUsers();
            toast.success('Успешно создан')
            setLogin('');
            setPassword('');
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <>
        <div className="users__form">
            <input
                name={'login'}
                className='input__style'
                onChange={e => setLogin(e.target.value)}
                value={login}
                type="text"
                placeholder={'Login'}
            />
            <input
                name={'password'}
                className='input__style'
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder={'Password'}
            />
            <button className='users__add' onClick={() => userCreate(login, password)}>Добавить администратора</button>
        </div>
        {loading ?
            <Loading />
        :
            <ul className="users__list">
                <li className="users__item title">
                    <span className="name">id</span>
                    <span className="name">Имя</span>
                    <span className="role">Должность</span>
                    <span></span>
                </li>
                {users?.map(user => {
                    if(user.id != store.user.id){
                        return(
                            <UserItem key={user.id} value={user} userDelete={userDelete}/>
                        )
                    }
                })}
            </ul>
        }
        </> 
    );
};

export default Users;