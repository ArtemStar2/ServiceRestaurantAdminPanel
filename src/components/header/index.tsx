import { FC, useContext } from "react";
import { Context } from "../../main";
import { ReactSVG } from "react-svg";

const Header : FC = () => {
    const {store} = useContext(Context)
    return (
        <header className="header">
            <div className="box-content">
                <div></div>
                <div className="header__account">
                    <span>{store.user.login}</span>
                    <ReactSVG className="header__logout" onClick={() => store.logout()} src={"/src/assets/svg/logout.svg"} />
                </div>
            </div>
        </header>
    );
};

export default Header;