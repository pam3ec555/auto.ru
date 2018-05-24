import {Car, CarPhotos} from './car';
import CarView from './car-view';
import {ViewType} from '../util';
import Controller from '../controller';
import Slider from '../slider';
import Model from '../model';
import DefaultAdapter from '../default-adapter';

const adapter = new class extends DefaultAdapter {
    public preprocess(data: Car): Car {
        const preprocessed: Car = (Object as any).assign({}, data);
        const photos: {
            [name: number]: CarPhotos
        } = preprocessed.photos;
        preprocessed.photos = [];

        for (const key in photos) {
            preprocessed.photos.push(photos[key]);
        }

        return preprocessed;
    }
}();

export default class CarController extends Controller {
    private model: Model;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        this.model = new Model();
        const data: Car = await this.model.load(`/cars-api/${location.pathname.slice(1)}`, {}, adapter);
        const carView: CarView = new CarView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carView.render());
            const slider = new Slider(`#slider`);
            slider.init();
            this.bind();
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
