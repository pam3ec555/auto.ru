import CarModel from './car-model';
import {Car} from './car';
import CarView from './car-view';
import {ViewType} from '../util';
import Controller from '../controller';
import Slider from "../slider";

export default class CarController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const carModel: CarModel = new CarModel();
        const data: Car = carModel.data;
        const carView: CarView = new CarView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carView.render());
            const slider = new Slider(`#slider`);
            slider.init();
        }
    }

    private bind(): void {

    }
}