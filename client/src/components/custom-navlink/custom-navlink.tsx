import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import './custom-navlink.scss';
import {ReactNode} from "react";

type CustomNavLinkPros = {
    name?: string
    path: string
    className?: string,
    children?: ReactNode
}

const CustomNavlink = ({
                           name,
                           path,
                           className,
                           children
                       }: CustomNavLinkPros) => {
    return (
        <NavLink className={clsx('navlink', className)}
                 to={path}>{name ?? children}</NavLink>
    );
};

export default CustomNavlink;