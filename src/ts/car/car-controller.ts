import {Car} from './car';
import CarView from './car-view';
import {bindElem, CodeStatus, pushUrl} from '../util';
import Controller from '../controller';
import Slider from '../slider';
import Model from '../model';
import CarAdapter from '../car-adapter';
import NotFoundView from '../errors/not-found/not-found-view';
import Popup from '../popup';

export default class CarController extends Controller {
    private model: Model;

    public async init() {
        this.model = new Model();
        const adapter: CarAdapter = new CarAdapter();
        const data: Car = await this.model.load(`/cars-api/${location.pathname.slice(1)}`, {}, adapter);
        const view: CarView|NotFoundView = (data) ?
            new CarView(data) :
            new NotFoundView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(view.render());

            if (data) {
                if (data.photos.length > 0) {
                    const slider = new Slider(`#slider`);
                    slider.init();
                }

                this.bind();
            }
        }
    }

    protected bind(bind: boolean = true): void {
        const removeBtn: HTMLButtonElement = document.querySelector(`#remove-car`);

        if (removeBtn) {
            bindElem(removeBtn, `click`, this.onRemoveClick, bind);
        }

        const editBtn: HTMLHRElement = document.querySelector(`#edit-car`);

        if (editBtn) {
            bindElem(editBtn, `click`, this.onEditCar, bind);
        }
    }

    private onEditCar = (e: Event): void => {
        e.preventDefault();
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
    }

    private onRemoveClick = (): void => {
        const carIdInput: HTMLInputElement = document.querySelector(`#car-id`);

        if (carIdInput) {
            const id = carIdInput.value;

            if (id) {
                const popup: Popup = new Popup();
                popup.confirm(`Вы действительно хотите удалить это объявление?`, {
                    confirm: () => {
                        this.model.drop(`/cars-api/drop-car/${id}`)
                            .then((response: Response) => {
                                if (response.status === CodeStatus.OK) {
                                    pushUrl(`/`);
                                }
                            })
                            .catch((err: Error) => {
                                throw new Error(`Error with drop car: ${err}`);
                            });
                    },
                    confirmText: `Да`,
                    cancelText: `Нет`
                });
            }
        }
    }
}
