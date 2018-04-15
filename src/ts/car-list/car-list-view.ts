import {CarListData} from './car-list-data';
import View from '../view';

const drawCard = (data: CarListData): string => {
    return `<section class="content__item">
  <a href="${data.link}" class="content-link">
      <img src="${data.preview}"
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

const drawCarList = (data: Array<CarListData>): string => {
    let carList: string = ``;

    if (data.length > 0) {
        data.forEach((carData: CarListData) => {
             carList += drawCard(carData);
        });
    }

    return carList;
};

export default class CarListView extends View {
    constructor(data: Array<CarListData>) {
        super(data);
    }

    protected get template(): string {
        return drawCarList(this.data);
    }
}