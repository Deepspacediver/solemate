import Header from '@views/header/header.tsx';
import {Outlet} from "react-router-dom";
import Footer from "@components/footer/footer.tsx";
import '@views/layout/layout.scss';

const Layout = () => {
    return (
        <div className="layout">
            <Header/>
            <main className="layout__main">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;