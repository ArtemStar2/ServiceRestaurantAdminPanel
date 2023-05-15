import { FC } from "react";
import SidebarProduct from "./component/menu";
import ListProduct from "./component/list";
import OrderProduct from "./component/order";
declare const window: any;

const tg = window?.Telegram?.WebApp;

const MenuList : FC = () => {
    console.log('asdsdsds');
    console.log(tg.initData);
    return (
        <div className="client">
            {JSON.stringify(tg.initData, null, 2)}
            <SidebarProduct />
            <ListProduct />
            <OrderProduct />
        </div>
    );
};

export default MenuList;