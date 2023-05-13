import { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar : FC = () => {
    return (
        <nav className="sidebar__box">
            <NavLink to="/" className={'sidebar__link'} >
                Главная
            </NavLink>
            <NavLink to="/users" className={'sidebar__link'} >
                Пользователи
            </NavLink>
            <NavLink to="/product" className={'sidebar__link'} >
                Меню
            </NavLink>
            <NavLink to="/events" className={'sidebar__link'} >
                Мероприятия
            </NavLink>
            <NavLink to="/tables" className={'sidebar__link'} >
                Бронь столов
            </NavLink>
            <NavLink to="/contact" className={'sidebar__link'} >
                Наши контакты
            </NavLink>
            <NavLink to="/orders" className={'sidebar__link'} >
                Заказы
            </NavLink>
        </nav>
    );
};

export default Sidebar;