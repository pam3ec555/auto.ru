import {Car} from '../car/car';
import View from '../view';

const drawCard = (data: Car): string => {
    const imageSrc: string = (data.photos && (Array as any).from(data.photos).length > 0) ?
        `/cars/${data.id}/photo/0` :
        ``;

    return `<section class="content__item">
  <a href="${data.link}" class="content-link">
      <img src="${imageSrc}"
         alt="photo" class="content__preview">
  </a>
  <a href="${data.link}" class="content__title content-link">${data.name}</a>
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
    constructor(data: Array<Car>) {
        super(data);
    }

    protected get template(): string {
        return drawCarList(this.data);
    }
}
