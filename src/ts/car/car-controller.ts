import CarModel from './car-model';
import {CarData} from './car-data';
import CarView from './car-view';
import Controller from '../controller';

export default class CarController extends Controller {
    public init(): void {
        const carModel: CarModel = new CarModel();
        const data: CarData = carModel.data;
        const carView: CarView = new CarView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);
        if (contentBlock) {
            contentBlock.appendChild(carView.render());
        }
    }

    protected bind(): void {

    }
}