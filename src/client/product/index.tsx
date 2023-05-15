import { FC } from "react";
import SidebarProduct from "./component/menu";
import ListProduct from "./component/list";
import OrderProduct from "./component/order";
declare const window: any;

const tg = window?.Telegram?.WebApp;

const MenuList : FC = () => {
    return (
        <div className="client">
            <pre>{JSON.stringify(tg, null, 2)}</pre>
            
            <SidebarProduct />
            <ListProduct />
            <OrderProduct />
        </div>
    );
};

export default MenuList;