import '@components/textarea/textarea.scss';

import {TextareaHTMLAttributes} from "react";
import clsx from "clsx";

type InputPros = { labelName?: string, errors?: string[] } & TextareaHTMLAttributes<HTMLTextAreaElement>;


const Textarea = ({className, name, labelName, errors, ...rest}: InputPros) => {
    return (
        <div className="textarea-wrapper">
            <label htmlFor={name} className="textarea-wrapper__label">{labelName || 'Label'}</label>
            <textarea name={name} className={clsx('textarea-wrapper__textarea', className)} {...rest}>
            </textarea>
            {!!errors?.length && <ul className="textarea-wrapper__error-wrapper">
                {errors.map(error => {
                    return <li key={`${name}_${error}`} className="textarea-wrapper__error">{error}</li>;
                })}
            </ul>}
        </div>
    );
};


export default Textarea;