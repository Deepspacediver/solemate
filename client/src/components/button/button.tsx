import '@components/button/button.scss';
import {ButtonHTMLAttributes, ReactNode,} from "react";
import clsx from "clsx";

type ButtonPros = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children, className, ...rest}: ButtonPros) => {
    return (
        <button {...rest} className={clsx('button', className)}>
            {children}
        </button>
    );
};

export default Button;