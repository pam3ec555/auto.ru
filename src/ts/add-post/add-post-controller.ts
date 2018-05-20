import AddPostView from './add-post-view';
import {hide, pushUrl, showBlock, StatusCode, ViewType} from '../util';
import Controller from '../controller';
import Model from '../model';
import App from '../app';
import {UserData} from "../menu/menu";
import Validation from "../validation";

declare const require: any;

const AutoComplete = require("autocomplete-js");

const validateAddPostFields = (fields: any): boolean => {
    let result: boolean = true;
    const validation: Validation = new Validation();
    let numCorrect = true;
    let noEmptyFields = true;
    const numErrorText: HTMLElement = document.querySelector(`#num-error`);
    const emptyErrorText: HTMLElement = document.querySelector(`#empty-fields`);

    (Array as any).from(fields).forEach((field: HTMLInputElement) => {
        if (field.name === `price` ||
            field.name === `engineVolume` ||
            field.name === `enginePower` ||
            field.name === `ownerCount` ||
            field.name === `mileage`) {
            if (!validation.validateNum(field.value)) {
                if (result) {
                    result = false;
                }

                if (numCorrect) {
                    numCorrect = false;
                }

                if (!field.classList.contains(`error`)) {
                    field.classList.add(`error`);
                }
            } else if (field.classList.contains(`error`)) {
                field.classList.remove(`error`);
            }
        } else {
            if (!validation.validateEmpty(field.value)) {
                if (result) {
                    result = false;
                }

                if (noEmptyFields) {
                    noEmptyFields = false;
                }

                if (!field.classList.contains(`error`)) {
                    field.classList.add(`error`);
                }
            } else if (field.classList.contains(`error`)) {
                field.classList.remove(`error`);
            }
        }
    });

    if (numErrorText) {
        if (!numCorrect && (numErrorText.style.display === `none` || numErrorText.style.display === ``)) {
            showBlock(numErrorText);
        } else if (numCorrect && numErrorText.style.display === `block`) {
            hide(numErrorText);
        }
    }

    if (emptyErrorText) {
        if (!noEmptyFields && (emptyErrorText.style.display === `none` || emptyErrorText.style.display === ``)) {
            showBlock(emptyErrorText);
        } else if (noEmptyFields && emptyErrorText.style.display === `block`) {
            hide(emptyErrorText);
        }
    }

    return result;
};

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
        const fields = form.querySelectorAll(`input[type="text"], input[type="number"], textarea`);

        if (form && fields.length > 0) {
            const correctForm = validateAddPostFields(fields);

            if (correctForm) {
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
}
