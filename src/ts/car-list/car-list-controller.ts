import CarListModel from './car-list-model';
import CarListView from './car-list-view';
import {CarListData} from './car-list-data';
import Controller from '../controller';
import App from '../app'

export default class CarListController extends Controller {
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

    protected bind(): void {
        const carLinks: NodeListOf<HTMLHRElement> = document.querySelectorAll(`.content-link`);

        if (carLinks.length > 0) {
            [].slice.call(carLinks).forEach((item: HTMLHRElement) => {
                 item.addEventListener(`click`, this.onCardClick)
            });
        }
    }

    private onCardClick(e: Event): void {
        e.preventDefault();
        App.showCar();
    }
}