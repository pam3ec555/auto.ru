import AddPostView from './add-post-view';
import {ViewType} from '../util';
import Controller from '../controller';
import Model from "../model";

export default class AddPostController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(viewState: ViewType): void {
        const addPostView: AddPostView = new AddPostView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(addPostView.render());
            this.bind();
        }
    }

    private bind(bind: boolean = true): void {
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
            const addPostModel: Model = new Model();
            addPostModel.save(`/add-post/create`, {
                body: formData
            });
        }
    }
}
