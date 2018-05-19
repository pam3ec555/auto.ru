import AddPostView from './add-post-view';
import {ViewType} from '../util';
import Controller from '../controller';
import Model from '../model';
import App from '../app';
import {UserData} from "../menu/menu";

export default class AddPostController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(viewState: ViewType): void {
        const userData: UserData = App.userData;
        const addPostView: AddPostView = new AddPostView(userData);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(addPostView.render());
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
        const form: HTMLFormElement = document.querySelector(`#add-post-form`);

        if (form) {
            const formData: FormData = new FormData(form);
            const model: Model = new Model();
            model.save(`/cars-api/add-post`, {
                body: formData
            });
        }
    }
}
