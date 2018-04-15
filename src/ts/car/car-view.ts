import View from '../view';
import {CarData} from './car-data';

const drawMobileCar = (data: CarData): string => {
    return `<div class="car">
  <h2 class="car__title">${data.name}</h2>
  <div class="gallery"></div>
  <div class="contacts">
    <h3 class="car__group-title">Контактные данные</h3>
    <div class="contacts__row">
      <span class="contacts__label">Продавец</span>
      <span class="contacts__val">${data.contact.name}</span>
    </div>
    <div class="contacts__row">
      <span class="contacts__label">Адрес осмотра</span>
      <span class="contacts__val">${data.contact.address}</span>
    </div>
    <div class="contacts__row">
      <span class="contacts__label">Телефон</span>
      <span class="contacts__val">${data.contact.phoneNum}</span>
    </div>
    <div class="contacts__row">
      <span class="contacts__label">E-mail</span>
      <span class="contacts__val">${data.contact.email}</span>
    </div>
  </div>
  <div class="car__data">
    <h3 class="car__group-title">Данные о машине</h3>
    <div class="car__data-row">
      <span class="car__data-label">Год выпуска</span>
      <span class="car__data-val">${data.year}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Пробег</span>
      <span class="car__data-val">${data.mileage}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Кузов</span>
      <span class="car__data-val">${data.bodyType}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Цвет</span>
      <span class="car__data-val">${data.color}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Двигатель</span>
      <span class="car__data-val">
        <span class="car__data-engine car__data-engine--volume">${data.engine.volume}</span>
        <span class="car__data-engine car__data-engine--power">${data.engine.power}</span>
        <span class="car__data-engine">${data.engine.type}</span>
      </span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Коробка</span>
      <span class="car__data-val">${data.boxTransmission}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Привод</span>
      <span class="car__data-val">${data.wheelTransmission}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Руль</span>
      <span class="car__data-val">${data.leftHelm}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Состояние</span>
      <span class="car__data-val">${data.state}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">Владельцы</span>
      <span class="car__data-val">${data.ownerCount}</span>
    </div>
    <div class="car__data-row">
      <span class="car__data-label">ПТС</span>
      <span class="car__data-val">${data.originalPTS}</span>
    </div>
  </div>
  <div class="car__descr-block">
    <h3 class="car__group-title">Комментарий продавца</h3>
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