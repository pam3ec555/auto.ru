import Controller from '../controller';
import LoginView from './login-view';

export default class LoginController extends Controller {
    public init(): void {
        const loginView: LoginView = new LoginView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(loginView.render());
            this.bind();
        }
    }

    protected bind():void {
        //Todo login form events
    }
}