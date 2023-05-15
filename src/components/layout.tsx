import { ReactNode, FC, useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Context } from '../main'
import { toJS } from "mobx";
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const {store} = useContext(Context)
    return (
        <>
            {store.isAuth && toJS(store.user.role) == "admin" ?  
            <>
                <Header />
                    <div className="box-content sidebar">
                        <div className="sidebar__left">
                            <Sidebar />
                        </div>
                        <main className="sidebar__right">
                            {children}
                        </main>
                    </div>
                <Footer />
            </>
            : <>
                {children}
            </>}
        </>
    );
};

export default Layout;