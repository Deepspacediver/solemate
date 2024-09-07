import Header from '@views/header/header.tsx';
import {Outlet} from "react-router-dom";
import '@views/layout/layout.scss';

const Layout = () => {
    return (
        <div>
            <Header/>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;