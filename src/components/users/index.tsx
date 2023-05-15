import { FC } from "react";
import { IUser } from '../../models/IUser'

interface UserItem{
    value: IUser;
    userDelete: Function
}

const UserItem : FC<UserItem> = ({value, userDelete}) => {
    return (
        <li className="users__item">
            <span className="name">
                {value.id}
            </span>
            <span className="name">
                {value.login}
            </span>
            <span className="role">
                {value.role}   
            </span>
            <div className="delete" onClick={() => userDelete(value.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                    <g transform="scale(2)">
                    <circle style={{fill:"#f44336"}} cx="8" cy="8" r="7"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                    </g>
                </svg>
            </div>
        </li>
    );
};

export default UserItem;