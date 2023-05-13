export interface IUser{
    login: string;
    password: string;
    id: string;
    role: 'admin' | 'user';
}