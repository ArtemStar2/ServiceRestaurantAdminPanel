import { FC } from "react";
import { IUser } from '../../models/IUser'
import { ReactSVG } from "react-svg";

interface UserItem{
    value: IUser;
    userDelete: Function
}

const UserItem : FC<UserItem> = ({value, userDelete}) => {
    return (
        <li className="users__item">
            <span className="name">
                {value.login}
            </span>
            <span className="role">
                {value.role}   
            </span>
            <ReactSVG className="delete" onClick={() => userDelete(value.id)} src={"/src/assets/svg/delete.svg"} /> 
        </li>
    );
};

export default UserItem;