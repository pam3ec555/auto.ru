import AddPostView from './add-post-view';
import {hide, pushUrl, showBlock, StatusCode, ViewType} from '../util';
import Controller from '../controller';
import Model from '../model';
import App from '../app';
import {UserData} from "../menu/menu";

declare const require: any;

const AutoComplete = require("autocomplete-js");

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
            AutoComplete({
                _Blur(): void {
                    hide(this.DOMResults);
                },
                _Focus(): void {
                    if (this.Input.id === `model-field`) {
                        const brandField = document.querySelector(`#brand-field`);

                        if (brandField) {
                            const brandName = brandField.getAttribute(`data-autocomplete-old-value`);

                            if (brandName !== ``) {
                                const modelApiUrl = `/cars-data-api/${brandName}`;
                                this.Input.setAttribute(`data-autocomplete`, modelApiUrl);
                            }
                        }
                    }

                    showBlock(this.DOMResults);
                },
                _Select(item: HTMLElement): void {
                    if (item.hasAttribute(`data-autocomplete-value`)) {
                        this.Input.value = item.getAttribute(`data-autocomplete-value`);
                    } else {
                        this.Input.value = item.innerHTML;
                    }

                    this.Input.setAttribute(`data-autocomplete-old-value`, this.Input.value);
                    this._Blur();
                }
            });
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
                })
                .then((response: Response) => {
                    if (response.status === StatusCode.OK) {
                        pushUrl(`/`);
                    }
                });
        }
    }
}
