import {Car} from './car';
import CarView from './car-view';
import {pushUrl} from '../util';
import Controller from '../controller';
import Slider from '../slider';
import Model from '../model';
import CarAdapter from '../car-adapter';
import NotFoundView from '../errors/not-found/not-found-view';

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
                const slider = new Slider(`#slider`);
                slider.init();
                this.bind();
            }
        }
    }

    protected bind(bind: boolean = true): void {
        const removeBtn: HTMLButtonElement = document.querySelector(`#remove-car`);

        if (removeBtn) {
            if (bind) {
                removeBtn.addEventListener(`click`, this.onRemoveClick);
            } else {
                removeBtn.removeEventListener(`click`, this.onRemoveClick);
            }
        }

        const editBtn: HTMLHRElement = document.querySelector(`#edit-car`);

        if (editBtn) {
            if (bind) {
                editBtn.addEventListener(`click`, this.onEditCar);
            } else {
                editBtn.removeEventListener(`click`, this.onEditCar);
            }
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
                this.model.drop(`/cars-api/drop-car/${id}`);
            }
        }
    }
}
