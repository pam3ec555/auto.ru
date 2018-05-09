import CarListModel from './car-list-model';
import CarListView from './car-list-view';
import {Car} from '../car/car';
import App from '../app';
import {ViewType} from '../util';
import Controller from '../controller';

export default class CarListController extends Controller {
    private carsData: Array<Car>;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        const carListModel: CarListModel = new CarListModel();
        this.carsData = await carListModel.data;
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
