import LoginView from './login-view';
import {StatusCode, ViewType} from '../util';
import Controller from '../controller';
import Model from '../model';
import App from '../app';

export default class LoginController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const loginView: LoginView = new LoginView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(loginView.render());
            this.bind();
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

        if (form) {
            const formData: FormData = new FormData(form);
            const model: Model = new Model();
            model.save(`/authentication-api`, {
                    body: formData
                })
                .then((response: Response) => {
                    if (response.status === StatusCode.OK) {
                        return response.json();
                    }
                })
                .then((data: {
                        token: string
                    }) => {
                    localStorage.setItem(`user-token`, data.token);
                    history.pushState({}, '', `/`);
                    App.replaceAuthStatus();
                });
        }
    }
}
