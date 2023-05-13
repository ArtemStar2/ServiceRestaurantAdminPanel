import { IUser } from "../IUser";

export interface authResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}