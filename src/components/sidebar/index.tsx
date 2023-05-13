import { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar : FC = () => {
    return (
        <nav className="sidebar__box">
            <NavLink to="/admin/" className={'sidebar__link'} >
                Главная
            </NavLink>
            <NavLink to="/admin/users" className={'sidebar__link'} >
                Пользователи
            </NavLink>
            <NavLink to="/admin/product" className={'sidebar__link'} >
                Меню
            </NavLink>
            <NavLink to="/admin/events" className={'sidebar__link'} >
                Мероприятия
            </NavLink>
            <NavLink to="/admin/tables" className={'sidebar__link'} >
                Бронь столов
            </NavLink>
            <NavLink to="/admin/contact" className={'sidebar__link'} >
                Наши контакты
            </NavLink>
            <NavLink to="/admin/orders" className={'sidebar__link'} >
                Заказы
            </NavLink>
        </nav>
    );
};

export default Sidebar;