import CarListModel from './car-list-model';
import CarListView from './car-list-view';
import {CarListData} from './car-list-data';
import App from '../app'
import {ViewType} from '../util';
import Controller from '../controller';

export default class CarListController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const carListModel: CarListModel = new CarListModel();
        const data: Array<CarListData> = carListModel.data;
        const carListView: CarListView = new CarListView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carListView.render());
            this.bind();
        }
    }

    public resize(viewState: ViewType): void {

    }

    private bind(bind: boolean = true): void {
        const carLinks: NodeListOf<HTMLHRElement> = document.querySelectorAll(`.content-link`);

        if (carLinks.length > 0) {
            [].slice.call(carLinks).forEach((item: HTMLHRElement) => {
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