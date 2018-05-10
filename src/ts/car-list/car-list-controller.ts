import CarListView from './car-list-view';
import {Car, CarPhotos} from '../car/car';
import App from '../app';
import {ViewType} from '../util';
import Controller from '../controller';
import Model from "../model";
import DefaultAdapter from "../default-adapter";

const adapter = new class extends DefaultAdapter {
    public preprocess(data: {
        [index: number]: CarPhotos;
    }): Array<CarPhotos> {
        const preprocessed: Array<CarPhotos> = [];
        (Array as any).from(data).forEach((it: CarPhotos) => {
            preprocessed.push(it);
        });

        return preprocessed;
    }
}();

export default class CarListController extends Controller {
    private carsData: Array<Car>;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        const model: Model = new Model();
        this.carsData = await model.load(`/cars`, {}, adapter);
        const carListView: CarListView = new CarListView(this.carsData);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carListView.render());
            this.bind();
        }
    }

    private bind(bind: boolean = true): void {
        const carLinks: NodeListOf<HTMLHRElement> = document.querySelectorAll(`.content-link`);

        if (carLinks.length > 0) {
            (Array as any).from(carLinks).forEach((item: HTMLHRElement): void => {
                if (bind) {
                    item.addEventListener(`click`, this.onCardClick);
                } else {
                    item.removeEventListener(`click`, this.onCardClick);
                }
            });
        }
    }

    private onCardClick = (e: Event): void => {
        e.preventDefault();
        this.bind(false);
        App.showCar();
    }
}
