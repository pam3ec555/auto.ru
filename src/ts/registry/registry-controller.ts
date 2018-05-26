import RegistryView from './registry-view';
import Controller from '../controller';
import Model from "../model";
import Validation from '../validation';
import {hide, setClass, showBlock, CodeStatus} from '../util';
import App from '../app';
import AccessErrorView from '../errors/access-error/access-error-view';

const validateFields = (): boolean => {
    let result: boolean = true;
    const validation: Validation = new Validation();
    const correctFields: {
        [name: string]: boolean
    } = {
        password: false,
        doublePassword: false,
        email: false,
        noEmpty: true,
        tel: false
    };

    const loginField: HTMLInputElement = document.querySelector(`#login`);
    const passwordField: HTMLInputElement = document.querySelector(`#password`);
    const passwordRepeatField: HTMLInputElement = document.querySelector(`#repeat-password`);
    const nameField: HTMLInputElement = document.querySelector(`#name`);
    const telField: HTMLInputElement = document.querySelector(`#tel`);
    const emailField: HTMLInputElement = document.querySelector(`#email`);

    if (loginField && passwordField && passwordRepeatField && nameField && telField && emailField) {
        /* Login */
        if (!validation.validateEmpty(loginField.value)) {
            result = false;
            correctFields.noEmpty = false;
            setClass(loginField, `error`);
        } else {
            setClass(loginField, `error`, false);
        }

        /* Password */
        if (validation.validateEmpty(passwordField.value) && validation.validateEmpty(passwordRepeatField.value)) {
            if (passwordField.value === passwordRepeatField.value) {
                if (validation.validatePassword(passwordField.value)) {
                    correctFields.password = true;
                    setClass(passwordField, `error`, false);
                    setClass(passwordRepeatField, `error`, false);
                } else {
                    setClass(passwordField, `error`);

                    if (result) {
                        result = false;
                    }
                }

                correctFields.doublePassword = true;
            } else {
                setClass(passwordField, `error`);
                setClass(passwordRepeatField, `error`);

                if (result) {
                    result = false;
                }
            }
        } else {
            setClass(passwordField, `error`);
            setClass(passwordRepeatField, `error`);

            if (result) {
                result = false;
            }

            if (correctFields.noEmpty) {
                correctFields.noEmpty = false;
            }
        }

        /* Name */
        if (!validation.validateEmpty(nameField.value)) {
            if (result) {
                result = false;
            }

            if (correctFields.noEmpty) {
                correctFields.noEmpty = false;
            }

            setClass(nameField, `error`);
        } else {
            setClass(nameField, `error`, false);
        }

        /* Tel */
        if (!validation.validateTel(telField.value)) {
            if (result) {
                result = false;
            }

            setClass(telField, `error`);
        } else {
            correctFields.tel = true;
            setClass(telField, `error`, false);
        }

        /* Email */
        if (!validation.validateEmail(emailField.value)) {
            if (result) {
                result = false;
            }

            setClass(emailField, `error`);
        } else {
            correctFields.email = true;
            setClass(emailField, `error`, false);
        }
    } else {
        result = false;
    }

    const passwordError: HTMLElement = document.querySelector(`#password-error`);

    if (passwordError) {
        if (!correctFields.password) {
            showBlock(passwordError);
        } else {
            hide(passwordError);
        }
    }

    const repeatPasswordError: HTMLElement = document.querySelector(`#repeat-password-error`);

    if (repeatPasswordError) {
        if (!correctFields.doublePassword) {
            showBlock(repeatPasswordError);
        } else {
            hide(repeatPasswordError);
        }
    }

    const telError: HTMLElement = document.querySelector(`#tel-error`);

    if (telError) {
        if (!correctFields.tel) {
            showBlock(telError);
        } else {
            hide(telError);
        }
    }

    const emailError: HTMLElement = document.querySelector(`#email-error`);

    if (emailError) {
        if (!correctFields.email) {
            showBlock(emailError);
        } else {
            hide(emailError);
        }
    }

    const emptyError: HTMLElement = document.querySelector(`#empty-fields`);

    if (emptyError) {
        if (!correctFields.noEmpty) {
            showBlock(emptyError);
        } else {
            hide(emptyError);
        }
    }

    return result;
};

export default class RegistryController extends Controller {
    public init(): void {
        const userData = App.userData;
        const view: RegistryView|AccessErrorView = (userData) ?
            new AccessErrorView(`Вы уже авторизованы!`) :
            new RegistryView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(view.render());
            if (!userData) {
                this.bind();
            }
        }
    }

    protected bind(bind: boolean = true): void {
        const submit: HTMLButtonElement = document.querySelector(`#submit`);

        if (submit) {
            if (bind) {
                submit.addEventListener(`click`, this.onFormSubmit);
            } else {
                submit.removeEventListener(`click`, this.onFormSubmit);
            }
        }
    }

    private onFormSubmit = (): void => {
        const form: HTMLFormElement = document.querySelector(`#registry-form`);

        if (form && validateFields()) {
            const formData: FormData = new FormData(form);
            const model: Model = new Model();
            model.save(`/registry-api`, {
                body: formData
            })
                .then((response: Response) => {
                    if (response.status === CodeStatus.OK) {
                        return response.json();
                    } else if (response.status === CodeStatus.BAD_REQUEST) {
                        const loginError: HTMLElement = document.querySelector(`#login-error`);
                        const loginField: HTMLInputElement = document.querySelector(`#login`);

                        if (loginError && loginField) {
                            showBlock(loginError);
                            setClass(loginField, `error`);
                        }
                    }

                    throw new Error(`Can not to create user!`);
                })
                .then((data: any) => {
                    return model.save(`/authentication-api`, {
                        body: formData
                    });
                })
                .then((response: Response) => {
                    if (response.status === CodeStatus.OK) {
                        return response.json();
                    }

                    throw new Error(`Can not to login!`);
                })
                .then((data: {
                    token: string
                }) => {
                    localStorage.setItem(`user-token`, data.token);
                    history.pushState({}, '', `/`);
                    App.replaceAuthStatus();
                })
                .catch((err: Error) => {
                    throw new Error(`Error: ${err}`);
                });
        }
    }
}
