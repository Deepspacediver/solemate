import '@components/input/input.scss';
import {InputHTMLAttributes} from "react";
import clsx from "clsx";

type InputPros = { labelName?: string, errors?: string[] } & InputHTMLAttributes<HTMLInputElement>;


const Input = ({type, className, name, labelName, errors, ...rest}: InputPros) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={name} className="input-wrapper__label">{labelName || 'Label'}</label>
            <input type={type} name={name} className={clsx('input-wrapper__input', className)} {...rest}>
            </input>
            {!!errors?.length && <ul className="input-wrapper__error-wrapper">
                {errors.map(error => {
                    return <li key={`${name}_${error}`} className="input-wrapper__error">{error}</li>;
                })}
            </ul>}
        </div>
    );
};

export default Input;