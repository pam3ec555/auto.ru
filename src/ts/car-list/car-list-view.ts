import {Car} from '../car/car';
import View from '../view';
import {Data} from "./car-list";

const drawCard = (data: Car): string => {
    const imageSrc: string = (data.photos && (Array as any).from(data.photos).length > 0) ?
        `/cars/${data._id}/photo/0` :
        ``;
    const preview = (data.photos && (Array as any).from(data.photos).length > 0) ?
        `<img src="${imageSrc}" class="content__preview">` :
        ``;

    return `<section class="content__item">
  <a href="/cars/${data._id}" class="content-link content-link--preview">${preview}</a>
  <a href="/cars/${data._id}" class="content__title content-link">${data.brand} ${data.model}</a>
  <div class="content__props">
    <span class="content__price">${data.price}</span>
    <span class="content__year">${data.year}</span>
    <span class="content__mileage">${data.mileage}</span>
  </div>
</section>`;
};

const drawCarList = (data: Array<Car>): string => {
    let carList: string = `<div class="content">`;

    if (data.length > 0) {
        data.forEach((carData: Car): void => {
             carList += drawCard(carData);
        });
    }

    carList += `</div>`;

    return carList;
};

export default class CarListView extends View {
    constructor(data: Data) {
        super(data);
    }

    protected get template(): string {
        return drawCarList(this.data.data);
    }
}
