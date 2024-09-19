import Button from "@components/button/button.tsx";
import '@components/password-modal/password-modal.scss';
import clsx from "clsx";
import Input from "@components/input/input.tsx";

type PasswordModalProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    handleCorrectPasswordSubmit: () => Promise<void>
}

const PasswordModal = ({
                           isOpen,
                           setIsOpen,
                           handleCorrectPasswordSubmit
                       }: PasswordModalProps) => {
    return (
        <div
            onClick={() => setIsOpen(false)}
            className={clsx("password-modal", isOpen && 'password-modal--open')}>
            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className={clsx("password-modal__content", isOpen && 'password-modal__content--open')}>

                <Button
                    onClick={() => setIsOpen(false)}
                    className="password-modal__button password-modal__button--close"
                    type="button">X</Button>

                <h3 className="password-modal__heading">Enter admin
                    password</h3>

                <form className="password-modal__form" onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const inputValue = formData.get('password');
                    if (inputValue !== import.meta.env.VITE_DELETE_PASSWORD) {
                        return;
                    }
                    await handleCorrectPasswordSubmit();
                }}>
                    <Input name={'password'} type="password"
                           labelName="Password"
                           className="password-modal__input"/>
                    <Button className="password-modal__button">Submit</Button>
                </form>
            </div>

        </div>

    );
};

export default PasswordModal;