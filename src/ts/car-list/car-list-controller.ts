import CarListView from './car-list-view';
import {Car, CarPhotos} from '../car/car';
import {getSearchVars, pushUrl, ViewType} from '../util';
import Controller from '../controller';
import Model from "../model";
import DefaultAdapter from "../default-adapter";
import {Data} from "./car-list";

const adapter = new class extends DefaultAdapter {
    public preprocess(data: Data): Data {
        const preprocessed: Data = (Object as any).assign({}, data);
        preprocessed.data.forEach((car: Car, index: number) => {
            const photos: {
                [name: number]: CarPhotos
            } = car.photos;
            preprocessed.data[index].photos = [];

            for (const key in photos) {
                preprocessed.data[index].photos.push(photos[key]);
            }
        });

        return preprocessed;
    }
}();

const setSortBySearch = (): void => {
    const sortWrap: HTMLElement = document.querySelector(`#sort`);

    if (sortWrap) {
        const searchVars = getSearchVars();

        for (const key in searchVars) {
            if (searchVars[key]) {
                const sortInput: HTMLInputElement = sortWrap.querySelector(`#sort-${key}`);

                if (sortInput) {
                    sortInput.value = searchVars[key];
                }
            }
        }
    }
};

export default class CarListController extends Controller {
    private carsData: Data;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        const model: Model = new Model();
        this.carsData = await model.load(`/cars-api/cars${location.search}`, {}, adapter);
        const carListView: CarListView = new CarListView(this.carsData);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carListView.render());
            setSortBySearch();
            this.bind();
        }
    }

    protected bind(bind: boolean = true): void {
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
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
    }
}
