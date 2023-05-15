import { FC } from "react";
import { NavLink } from "react-router-dom";

const SidebarProduct : FC = () => {
    return (
        <nav className="client__sidebar">
            <NavLink to="/menu/" className={'client__sidebar-link'} >
                Меню
            </NavLink>
            <NavLink to="/menu/category/stock" className={'client__sidebar-link'} >
                Акции
            </NavLink>
            <NavLink to="/menu/category/food" className={'client__sidebar-link'} >
                Еда
            </NavLink>
            <NavLink to="/menu/category/beverages" className={'client__sidebar-link'} >
                Напитки
            </NavLink>
            <NavLink to="/menu/category/alcohol" className={'client__sidebar-link'} >
                Алкоголь
            </NavLink>
        </nav>
    );
};

export default SidebarProduct;