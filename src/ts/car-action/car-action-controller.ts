import Controller from '../controller';
import {bindElem, CodeStatus, hide, pushUrl, setClass, showBlock} from '../util';
import Model from '../model';
import Validation from '../validation';
import {CarCharacteristics} from './car-action';

enum CarActionType {
    ADD = 'add',
    EDIT = 'edit'
}

const validateFields = (fields: any): boolean => {
    let result: boolean = true;
    const validation: Validation = new Validation();
    let numCorrect: boolean = true;
    let noEmptyFields: boolean = true;
    let imageCorrect: boolean = true;
    const numErrorText: HTMLElement = document.querySelector(`#num-error`);
    const emptyErrorText: HTMLElement = document.querySelector(`#empty-fields`);
    const imageFormatError: HTMLInputElement = document.querySelector(`#image-error`);

    (Array as any).from(fields).forEach((field: HTMLInputElement) => {
        if (field.name === `photos`) {
            if (!validation.validateImages(field)) {
                imageCorrect = false;

                if (result) {
                    result = false;
                }
            }
        } else if (field.name === `price` ||
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

                setClass(field, `error`);
            } else {
                setClass(field, `error`, false);
            }
        } else {
            if (!validation.validateEmpty(field.value)) {
                if (result) {
                    result = false;
                }

                if (noEmptyFields) {
                    noEmptyFields = false;
                }

                setClass(field, `error`);
            } else {
                setClass(field, `error`, false);
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

    if (imageFormatError) {
        if (!imageCorrect && (imageFormatError.style.display === `none` || imageFormatError.style.display === ``)) {
            showBlock(imageFormatError);
        } else if (imageCorrect && imageFormatError.style.display === `block`) {
            hide(imageFormatError);
        }
    }

    return result;
};

export default abstract class CarActionController extends Controller {
    private _carCharacteristics: CarCharacteristics = {
        bodyType: new Set([
            `Седан`,
            `Хэтчбек`,
            `Универсал`,
            `Лифтбэк`,
            `Купе`,
            `Кабриолет`,
            `Родстер`,
            `Тарга`,
            `Лимузин`,
            `Стретч`,
            `Внедорожник`,
            `Кроссовер`,
            `Пикап`,
            `Фургон`,
            `Минивэн`,
            `Микроавтобус`,
            `Автобус`,
            `Грузовик`
        ]),
        engineType: new Set([
            `Бензин`,
            `Дизель`,
            `Газ`,
            `Газодизель`,
            `Роторно-поршевой`
        ]),
        boxTransmission: new Set([
            `Механическая коробка`,
            `Автоматическая коробка`,
            `Роботизированная коробка`,
            `Вариатор`
        ]),
        wheelTransmission: new Set([
            `Передний`,
            `Задний`,
            `Полный`
        ]),
        leftHelm: new Set([
            `Левый`,
            `Правый`
        ]),
        state: new Set([
            `Отличное`,
            `Хорошее`,
            `Плохое`,
            `Битая`
        ]),
        originalPTS: new Set([
            `Оригинал`,
            `Дупликат`
        ])
    };

    private _autocompleteSettings: object = {
        EmptyMessage: `Нет результатов!`,
        _Blur() {
            // Empty
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
            this.Input.blur();
        },
        _Open(): void {
            (Array as any).from(this.DOMResults.querySelectorAll(`li`)).forEach((li: HTMLLIElement) => {
                if (li.className !== `locked`) {
                    li.onmousedown = () => {
                        this._Select(li);
                        hide(this.DOMResults);
                    };
                }
            });
        }
    };

    protected bind(bind: boolean = true): void {
        const submit: HTMLButtonElement = document.querySelector(`#submit`);

        if (submit) {
            bindElem(submit, `click`, this.onFormSubmit, bind);
        }

        const uploadInput: HTMLInputElement = document.querySelector(`#photos`);

        if (uploadInput) {
            bindElem(uploadInput, `change`, this.onUploadChange, bind);
        }
    }

    protected get carCharacteristics(): CarCharacteristics {
        return this._carCharacteristics;
    }

    protected get autocompleteSettings() {
        return this._autocompleteSettings;
    }

    private onUploadChange = (e: Event): void => {
        const uploadCountField = document.querySelector(`#upload-count`);

        if (uploadCountField) {
            console.log((e.target as HTMLInputElement).files);
            uploadCountField.textContent = (e.target as HTMLInputElement).files.length.toString();
        }
    }

    private onFormSubmit = (e: Event): void => {
        e.preventDefault();
        const target: HTMLButtonElement = e.target as HTMLButtonElement;
        const actionType = target.getAttribute(`data-type`);
        const formSelector = (actionType === CarActionType.ADD) ? `#add-post-form` : `#edit-form`;
        const form: HTMLFormElement = document.querySelector(formSelector);
        const inputsSelector: string = `input[type="text"], input[type="number"], input[type="file"], textarea, select`;
        const fields: NodeListOf<HTMLInputElement> = form.querySelectorAll(inputsSelector);

        if (form && fields.length > 0) {
            const correctForm = validateFields(fields);

            if (correctForm) {
                const formData: FormData = new FormData(form);
                const model: Model = new Model();
                model.save(`/cars-api/${location.pathname.slice(1)}`, {
                    method: (actionType === CarActionType.ADD) ? `POST` : `PUT`,
                    body: formData
                })
                    .then((response: Response) => {
                        if (response.status === CodeStatus.OK) {
                            pushUrl(`/`);
                        }
                    });
            }
        }
    }
}
