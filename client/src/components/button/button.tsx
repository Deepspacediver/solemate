import '@components/button/button.scss';
import {ButtonHTMLAttributes, ReactNode,} from "react";
import clsx from "clsx";
import {NavLink} from "react-router-dom";
import {LoaderSVG} from "@components/loader/loader.tsx";

export enum ButtonVariants {
    PRIMARY = 'primary',
    SUBMIT = 'submit',
}

type ButtonPros =
    {
        isNavlink?: boolean,
        path?: string,
        children: ReactNode,
        variant?: ButtonVariants,
        state?: {},
        isLoading?: boolean,
    }
    & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
                    isNavlink,
                    path,
                    children,
                    className,
                    variant,
                    state,
                    isLoading,
                    ...rest
                }: ButtonPros) => {
    return (
        isNavlink && path ?
            (<NavLink

                className={clsx('button', variant && `button--${variant}`, className)}
                to={path}
                state={state}
            >
                {children}
            </NavLink>) :
            (<button disabled={isLoading} {...rest}
                     className={clsx(className, 'button', variant && `button--${variant}`, isLoading && 'button--disabled')}>
                {isLoading ? <LoaderSVG className="button__icon"/> : children}
            </button>)
    );
};

export default Button;