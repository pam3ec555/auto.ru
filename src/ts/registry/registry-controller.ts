import RegistryView from './registry-view';
import {ViewType} from '../util';
import Controller from '../controller';
import Model from "../model";

export default class RegistryController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const registryView: RegistryView = new RegistryView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(registryView.render());
        }
        this.bind();
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
        const form: HTMLFormElement = document.querySelector(`#registry-form`);

        if (form) {
            const formData: FormData = new FormData(form);
            const model: Model = new Model();
            model.save(`/registry-api`, {
                body: formData
            });
        }
    }
}
