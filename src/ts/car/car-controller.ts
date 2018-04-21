import CarModel from './car-model';
import {CarData} from './car-data';
import CarView from './car-view';
import {ViewType} from '../util';
import Controller from '../controller';

export default class CarController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const carModel: CarModel = new CarModel();
        const data: CarData = carModel.data;
        const carView: CarView = new CarView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carView.render());
        }
    }

    public resize(viewState: ViewType): void {

    }

    private bind(): void {

    }
}