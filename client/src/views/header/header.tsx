import './header.scss';
import CustomNavlink from "@components/custom-navlink/custom-navlink.tsx";

const navLinks: { name: string, path: string }[] = [{
    name: "Home",
    path: '/'
}, {
    name: "Items",
    path: '/items'
}, {
    name: "Categories",
    path: "/categories-view"
}];

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__heading">Solemate</h1>
            <nav>
                <ul className="header__link-container">
                    {navLinks.map(({path, name}) => (
                        <CustomNavlink className="header__link" key={name} path={path} name={name}/>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;