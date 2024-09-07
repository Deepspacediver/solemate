import './input.scss';
import {InputHTMLAttributes} from "react";
import clsx from "clsx";

type InputPros = { labelName?: string } & InputHTMLAttributes<HTMLInputElement>;


const Input = ({type, className, name, labelName, ...rest}: InputPros) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={name} className="input-wrapper__label">{labelName || 'Label'}</label>
            <input type={type} name={name} className={clsx('input-wrapper__input', className)} {...rest}>
            </input>
        </div>
    );
};

export default Input;