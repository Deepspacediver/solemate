import '@components/button/button.scss';
import {ButtonHTMLAttributes, ReactNode,} from "react";
import clsx from "clsx";
import {NavLink} from "react-router-dom";

type ButtonPros = { isNavlink?: boolean, path?: string, children: ReactNode }
    & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({isNavlink, path, children, className, ...rest}: ButtonPros) => {
    return (
        isNavlink && path ?
            (<NavLink className={clsx('button', className)} to={path}>
                {children}
            </NavLink>) :
            (<button {...rest} className={clsx(className, 'button')}>
                {children}
            </button>)
    );
};

export default Button;