import LoginView from './login-view';
import {CodeStatus, hide, setClass, showBlock} from '../util';
import Controller from '../controller';
import Model from '../model';
import App from '../app';
import Validation from '../validation';
import AccessErrorView from '../errors/access-error/access-error-view';
import {UserData} from '../menu/menu';

enum ErrorType {
    PASSWORD = 0,
    LOGIN = 1
}

const showErrors = (error: ErrorType): void => {
    const loginField: HTMLInputElement = document.querySelector(`#login`);
    const loginError: HTMLElement = document.querySelector(`#login-error`);
    const passwordError: HTMLElement = document.querySelector(`#password-error`);
    const passwordField: HTMLInputElement = document.querySelector(`#password`);

    if (loginField && loginError && passwordError && passwordField) {
        if (error === ErrorType.LOGIN) {
            showBlock(loginError);
            setClass(loginField, `error`);
            hide(passwordError);
            setClass(passwordField, `error`, false);
        } else {
            showBlock(passwordError);
            setClass(loginField, `error`, false);
            hide(loginError);
            setClass(passwordField, `error`);
        }
    }
};

const validateFields = (form: HTMLFormElement): boolean => {
    let result: boolean = true;
    const validation: Validation = new Validation();
    const inputs: any = form.querySelectorAll(`input`);
    const emptyError: HTMLElement = document.querySelector(`#empty-fields`);

    if (inputs.length > 0 && emptyError) {
        (Array as any).from(inputs).forEach((input: HTMLInputElement) => {
            if (validation.validateEmpty(input.value)) {
                setClass(input, `error`, false);
            } else {
                setClass(input, `error`);

                if (result) {
                    result = false;
                }
            }
        });

        if (!result) {
            showBlock(emptyError);
        } else {
            hide(emptyError);
        }
    } else {
        result = false;
    }

    return result;
};

export default class LoginController extends Controller {
    public init(): void {
        const userData: UserData = App.userData;
        const view: LoginView|AccessErrorView = (userData) ?
            new AccessErrorView(`Вы уже авторизованы!`) :
            new LoginView();
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
        const form: HTMLFormElement = document.querySelector(`#login-form`);

        if (form && validateFields(form)) {
            const formData: FormData = new FormData(form);
            const model: Model = new Model();
            model.save(`/authentication-api`, {
                body: formData
            })
                .then((response: Response) => {
                    if (response.status === CodeStatus.OK) {
                        return response.json();
                    } else {
                        if (response.status === CodeStatus.NOT_FOUND) {
                            showErrors(ErrorType.LOGIN);
                        } else if (response.status === CodeStatus.BAD_REQUEST) {
                            showErrors(ErrorType.PASSWORD);
                        }

                        throw new Error(`Can not to login!`);
                    }
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
