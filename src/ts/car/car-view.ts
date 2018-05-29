import View from '../view';
import {Car, CarPhotos} from './car';
import App from '../app';
import {UserData} from '../menu/menu';

const drawSliders = (images: Array<CarPhotos>, id: string): string => {
    let sliders: string = `<ul class="slider__list">`;
    images.forEach((image: CarPhotos, index: number): void => {
        sliders += `<li class="slider__item">
  <img src="/cars/${id}/photo/${index}" alt="Фото машины" class="slider__img" data-id="${index}">
</li>`;
    });
    sliders += `</ul>`;

    return sliders;
};

const drawMobileCar = (data: Car): string => {
    const sliders: string = drawSliders(data.photos, data._id);
    const userData: UserData = App.userData;
    const removeBtn: string = (userData && data.login === userData.login) ?
        `<button type="button" id="remove-car" class="btn btn--drop">Удалить</button>` :
        ``;
    const editBtn: string = (userData && data.login === userData.login) ?
        `<a href="/edit/${data._id}" id="edit-car" class="btn btn--primary">Редактировать</a>` :
        ``;
    const sliderBlock: string = (data.photos.length > 0) ? `<div class="slider" id="slider">
  <div class="slider__preview-wrap">
    <button class="slider__btn slider__btn--prev slider__btn--preview"></button>
    <img src="" alt="Фото машины" class="slider__preview" data-id="0">
    <button class="slider__btn slider__btn--next slider__btn--preview"></button>
  </div>
  <div class="slider__image-list-wrap">
    <button class="slider__btn slider__btn--prev slider__btn--list"></button>
    <div class="slider__list-wrap">
      ${sliders}
    </div>
    <button class="slider__btn slider__btn--next slider__btn--list"></button>
  </div>
</div>` : ``;

    return `<div class="outer-block car-view">
<h2 class="title">${data.brand} ${data.model}</h2>
<div class="car-view__wrap car-view__wrap--gallery">
  ${sliderBlock}
  <div class="car-view__settings">
    ${removeBtn}
    ${editBtn}
  </div>
  <input type="hidden" id="car-id" value="${data._id}">
</div>
<div class="car-view__wrap car-view__wrap--data">
  <div class="group-wrap">
    <h3 class="group-title">Контактные данные</h3>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Продавец</span>
      <span class="value value--nowrap">${data.ownerName}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Адрес осмотра</span>
      <span class="value value--nowrap">${data.address}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">Телефон</span>
      <span class="value value--nowrap">${data.phoneNum}</span>
    </div>
    <div class="row row--nowrap">
      <span class="label label--nowrap">E-mail</span>
      <span class="value value--nowrap">${data.email}</span>
    </div>
  </div>
  <div class="group-wrap">
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
        <span class="car__data-engine car__data-engine--volume">${data.engineVolume} /</span>
        <span class="car__data-engine car__data-engine--power">${data.enginePower} л.c. /</span>
        <span class="car__data-engine">${data.engineType}</span>
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
  <div class="group-wrap">
    <h3 class="group-title">Комментарий продавца</h3>
    <p class="car__descr">${data.description}</p>
  </div>
</div>
</div>`;
};

export default class CarView extends View {
    constructor(data: Car) {
        super(data);
    }

    protected get template(): string {
        return drawMobileCar(this.data);
    }
}
