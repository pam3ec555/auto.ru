import LoginView from './login-view';
import {ViewType} from '../util';
import Controller from '../controller';

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

    private bind(): void {
        // Todo login form events
    }
}
