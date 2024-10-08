import './header.scss';
import CustomNavlink from "@components/custom-navlink/custom-navlink.tsx";

const navLinks: { name: string, path: string }[] = [{
    name: "Home",
    path: '/'
}, {
    name: "Shoes",
    path: '/shoes'
}, {
    name: "Categories",
    path: "/categories"
}];

const Header = () => {
    return (
        <header className="header">
            <CustomNavlink path="/">
                <h1 className="header__heading">Solemate</h1>
            </CustomNavlink>
            <nav>
                <ul className="header__link-container">
                    {navLinks.map(({path, name}) => (
                        <CustomNavlink className="header__link" key={name}
                                       path={path}><span
                            className="header__link-text">{name}</span>
                        </CustomNavlink>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;