import {Car} from '../car/car';
import View from '../view';

const drawEdit = (data: Car) => {
    return `<div class="form-block outer-block">
  <h2 class="title">Добавление</h2>
  <form class="form" id="add-post-form">
    <div class="row">
      <span class="label">Марка автомобиля</span>
      <div class="value">
        <input type="text" name="brand" data-autocomplete="/cars-data-api/brand" id="brand-field" value="${data.brand}">
      </div>
    </div>
    <div class="row">
      <span class="label">Модель автомобиля</span>
      <div class="value">
        <input type="text" name="model" data-autocomplete="/cars-data-api/:brand" id="model-field"
            value="${data.model}">
      </div>
    </div>
    <div class="row">
      <span class="label">Кузов</span>
      <div class="value">
        <input type="text" name="bodyType" value="${data.bodyType}">
      </div>
    </div>
    <div class="row">
      <span class="label">Объем двигателя</span>
      <div class="value">
        <input type="text" name="engineVolume" value="${data.engineVolume}">
      </div>
    </div>
    <div class="row">
      <span class="label">Мощность двигателя</span>
      <div class="value">
        <input type="text" name="enginePower" value="${data.enginePower}">
      </div>
    </div>
    <div class="row">
      <span class="label">Тип двигателя</span>
      <div class="value">
        <input type="text" name="engineType" value="${data.engineType}">
      </div>
    </div>
    <div class="row">
      <span class="label">Коробка</span>
      <div class="value">
        <input type="text" name="boxTransmission" value="${data.boxTransmission}">
      </div>
    </div>
    <div class="row">
      <span class="label">Привод</span>
      <div class="value">
        <input type="text" name="wheelTransmission" value="${data.wheelTransmission}">
      </div>
    </div>
    <div class="row">
      <span class="label">Руль</span>
      <div class="value">
        <input type="text" name="leftHelm" value="${data.leftHelm}">
      </div>
    </div>
    <div class="row">
      <span class="label">Состояние</span>
      <div class="value">
        <input type="text" name="state" value="${data.state}">
      </div>
    </div>
    <div class="row">
      <span class="label">ПТС</span>
      <div class="value">
        <input type="text" name="originalPTS" value="${data.originalPTS}">
      </div>
    </div>
    <div class="row">
      <span class="label">Владельцы</span>
      <div class="value">
        <input type="number" name="ownerCount" value="${data.ownerCount}">
      </div>
    </div>
    <div class="row">
      <span class="label">Год выпуска</span>
      <div class="value">
        <input type="text" name="year" value="${data.year}">
      </div>
    </div>
    <div class="row">
      <span class="label">Пробег</span>
      <div class="value">
        <input type="text" name="mileage" value="${data.mileage}">
      </div>
    </div>
    <div class="row">
      <span class="label">Цвет</span>
      <div class="value">
        <input type="text" name="color" value="${data.color}">
      </div>
    </div>
    <div class="row">
      <span class="label">Адрес осмотра</span>
      <div class="value">
        <input type="text" name="address" value="${data.address}">
      </div>
    </div>
    <div class="row">
      <span class="label">Цена</span>
      <div class="value">
        <input type="text" name="price" value="${data.price}">
      </div>
    </div>
    <div class="row">
      <span class="label">Описание</span>
      <div class="value">
        <textarea name="description" rows="5">${data.description}</textarea>
      </div>
    </div>
    <div class="row">
      <span class="label">Фотографии</span>
      <div class="value">
        <input type="file" name="photos" multiple>
      </div>
    </div>
    <input type="hidden" name="login" value="${data.login}">
    <input type="hidden" name="ownerName" value="${data.ownerName}">
    <input type="hidden" name="phoneNum" value="${data.phoneNum}">
    <input type="hidden" name="email" value="${data.email}">
    <ul class="error-list">
      <li class="error-list__item" id="num-error">Вы неправильно заполнили числовые поля!</li>
      <li class="error-list__item" id="empty-fields">Заполните все обязательные поля!</li>
    </ul>
  </form>
  <button type="button" class="submit" id="submit">Сохранить</button>
</div>`;
};

export default class EditView extends View {
    constructor(data: Car) {
        super(data);
    }

    protected get template(): string {
        return drawEdit(this.data);
    }
}