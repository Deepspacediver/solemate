import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import './custom-navlink.scss';

type CustomNavLinkPros = {
    name: string
    path: string
    className?: string
}

const CustomNavlink = ({name, path, className}: CustomNavLinkPros) => {
    return (
        <NavLink className={clsx('navlink', className)} to={path}>{name}</NavLink>
    );
};

export default CustomNavlink;