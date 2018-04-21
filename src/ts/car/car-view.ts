import View from '../view';
import {CarData} from './car-data';

const drawMobileCar = (data: CarData): string => {
    return `<div class="outer-block">
  <h2 class="title">${data.name}</h2>
  <div class="gallery"></div>
  <div class="contacts">
    <h3 class="group-title">Контактные данные</h3>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Продавец</span>
      <span class="value value--nowrap">${data.contact.name}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Адрес осмотра</span>
      <span class="value value--nowrap">${data.contact.address}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Телефон</span>
      <span class="value value--nowrap">${data.contact.phoneNum}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">E-mail</span>
      <span class="value value--nowrap">${data.contact.email}</span>
    </div>
  </div>
  <div class="car__data">
    <h3 class="group-title">Данные о машине</h3>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Год выпуска</span>
      <span class="value value--nowrap">${data.year}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Пробег</span>
      <span class="value value--nowrap">${data.mileage}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Кузов</span>
      <span class="value value--nowrap">${data.bodyType}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Цвет</span>
      <span class="value value--nowrap">${data.color}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Двигатель</span>
      <span class="value value--nowrap">
        <span class="car__data-engine car__data-engine--volume">${data.engine.volume}</span>
        <span class="car__data-engine car__data-engine--power">${data.engine.power}</span>
        <span class="car__data-engine">${data.engine.type}</span>
      </span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Коробка</span>
      <span class="value value--nowrap">${data.boxTransmission}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Привод</span>
      <span class="value value--nowrap">${data.wheelTransmission}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Руль</span>
      <span class="value value--nowrap">${data.leftHelm}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Состояние</span>
      <span class="value value--nowrap">${data.state}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Владельцы</span>
      <span class="value value--nowrap">${data.ownerCount}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">ПТС</span>
      <span class="value value--nowrap">${data.originalPTS}</span>
    </div>
  </div>
  <div class="car__descr-block">
    <h3 class="group-title">Комментарий продавца</h3>
    <p class="car__descr">${data.description}</p>
  </div>
</div>`;
};

export default class CarView extends View {
    constructor(data: CarData) {
        super(data);
    }

    protected get template(): string {
        return drawMobileCar(this.data);
    }
}