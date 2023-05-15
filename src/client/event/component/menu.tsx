import { FC } from "react";
import { NavLink } from "react-router-dom";

const SidebarEvent : FC = () => {
    return (
        <nav className="client__sidebar">
            <NavLink to="/event/" className={'client__sidebar-link'} >
                Мероприятия
            </NavLink>
        </nav>
    );
};

export default SidebarEvent;