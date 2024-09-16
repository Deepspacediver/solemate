import '@components/button/button.scss';
import {ButtonHTMLAttributes, ReactNode,} from "react";
import clsx from "clsx";
import {NavLink} from "react-router-dom";

export enum ButtonVariants {
    PRIMARY = 'primary'
}

type ButtonPros =
    {
        isNavlink?: boolean,
        path?: string,
        children: ReactNode,
        variant?: ButtonVariants
    }
    & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
                    isNavlink,
                    path,
                    children,
                    className,
                    variant,
                    ...rest
                }: ButtonPros) => {
    return (
        isNavlink && path ?
            (<NavLink
                className={clsx('button', variant && `button--${variant}`, className)}
                to={path}>
                {children}
            </NavLink>) :
            (<button {...rest} className={clsx(className, 'button')}>
                {children}
            </button>)
    );
};

export default Button;