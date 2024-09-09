import '@components/checkbox/checkbox.scss';
import clsx from "clsx";


type CheckboxProps = {
    name: string,
    label: string,
    value: string | number,
    handleChange: (value: any) => void,
    isChecked?: boolean,
    className?: string,
}

const CheckMarkIcon = ({isChecked, className}: {
    isChecked?: boolean,
    className: string
}) => <svg className={clsx(className, isChecked && `${className}--checked`)}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" width="48px" height="48px">
    <path
        d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"/>
</svg>;


const Checkbox = ({
                      className,
                      value,
                      label,
                      isChecked,
                      handleChange
                  }: CheckboxProps) => {

    return (
        <div className={clsx('checkbox-wrapper', className)}>
            <label className="checkbox-wrapper__label">{label}
                <input className="checkbox-wrapper__input"
                       value={value}
                       checked={isChecked}
                       type="checkbox" onChange={() => {
                    handleChange(value);
                }}/>
                <span className={clsx('checkbox-wrapper__custom-checkbox')}>
                    {isChecked &&
                        <CheckMarkIcon className="checkbox-wrapper__icon"
                                       isChecked={isChecked}/>}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;