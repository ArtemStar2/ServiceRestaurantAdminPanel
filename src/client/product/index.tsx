import { FC } from "react";
import SidebarProduct from "./component/menu";
import ListProduct from "./component/list";
import OrderProduct from "./component/order";

const MenuList : FC = () => {
    return (
        <div className="client">
            <pre>{JSON.stringify(localStorage, null, 2)}</pre>
            
            <SidebarProduct />
            <ListProduct />
            <OrderProduct />
        </div>
    );
};

export default MenuList;