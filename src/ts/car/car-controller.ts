import CarModel from './car-model';
import {ICar} from './car';
import CarView from './car-view';
import {ViewType} from '../util';
import Controller from '../controller';

declare const require: any;
const lory: any = require(`lory.js`).lory;

// const test = require(`tns`);
// const slider = test({
//     container: `.test`
// })
// console.log(test);

// const initSwiper = () => {
//     const swiper = new Swiper.default(`#swiper-container`);
//     console.log(swiper);
// }

export default class CarController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const carModel: CarModel = new CarModel();
        const data: ICar = carModel.data;
        const carView: CarView = new CarView(data);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(carView.render());
            const slider = document.querySelector(`.slider`);

            lory(slider, {
                rewind: true
            });
        }
    }

    private bind(): void {

    }
}