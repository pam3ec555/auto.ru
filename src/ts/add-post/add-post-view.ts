import View from '../view';
import {UserData} from "../menu/menu";

const drawAddingPost = (userData: UserData): string => {
    return `<div class="form-block outer-block">
  <h2 class="title">Добавление</h2>
  <form class="form" id="add-post-form">
    <div class="row">
      <span class="label">Марка автомобиля</span>
      <div class="value">
        <input type="text" name="brand" data-autocomplete="/cars-data-api/brand" id="brand-field">
      </div>
    </div>
    <div class="row">
      <span class="label">Модель автомобиля</span>
      <div class="value">
        <input type="text" name="model" data-autocomplete="/cars-data-api/:brand" id="model-field">
      </div>
    </div>
    <div class="row">
      <span class="label">Кузов</span>
      <div class="value">
        <input type="text" name="bodyType">
      </div>
    </div>
    <div class="row">
      <span class="label">Объем двигателя</span>
      <div class="value">
        <input type="text" name="engineVolume">
      </div>
    </div>
    <div class="row">
      <span class="label">Мощность двигателя</span>
      <div class="value">
        <input type="text" name="enginePower">
      </div>
    </div>
    <div class="row">
      <span class="label">Тип двигателя</span>
      <div class="value">
        <input type="text" name="engineType">
      </div>
    </div>
    <div class="row">
      <span class="label">Коробка</span>
      <div class="value">
        <input type="text" name="boxTransmission">
      </div>
    </div>
    <div class="row">
      <span class="label">Привод</span>
      <div class="value">
        <input type="text" name="wheelTransmission">
      </div>
    </div>
    <div class="row">
      <span class="label">Руль</span>
      <div class="value">
        <input type="text" name="leftHelm">
      </div>
    </div>
    <div class="row">
      <span class="label">Состояние</span>
      <div class="value">
        <input type="text" name="state">
      </div>
    </div>
    <div class="row">
      <span class="label">ПТС</span>
      <div class="value">
        <input type="text" name="originalPTS">
      </div>
    </div>
    <div class="row">
      <span class="label">Владельцы</span>
      <div class="value">
        <input type="number" name="ownerCount">
      </div>
    </div>
    <div class="row">
      <span class="label">Год выпуска</span>
      <div class="value">
        <input type="text" name="year">
      </div>
    </div>
    <div class="row">
      <span class="label">Пробег</span>
      <div class="value">
        <input type="text" name="mileage">
      </div>
    </div>
    <div class="row">
      <span class="label">Цвет</span>
      <div class="value">
        <input type="text" name="color">
      </div>
    </div>
    <div class="row">
      <span class="label">Адрес осмотра</span>
      <div class="value">
        <input type="text" name="address">
      </div>
    </div>
    <div class="row">
      <span class="label">Цена</span>
      <div class="value">
        <input type="text" name="price">
      </div>
    </div>
    <div class="row">
      <span class="label">Описание</span>
      <div class="value">
        <textarea name="description" rows="5"></textarea>
      </div>
    </div>
    <div class="row">
      <span class="label">Фотографии</span>
      <div class="value">
        <input type="file" name="photos" multiple>
      </div>
    </div>
    <input type="hidden" name="ownerName" value="${userData.name}">
    <input type="hidden" name="phoneNum" value="${userData.tel}">
    <input type="hidden" name="email" value="${userData.email}">
  </form>
  <button type="button" class="submit" id="submit">Добавить</button>
</div>`;
};

export default class AddPostView extends View {
    constructor(data: UserData) {
        super(data);
    }

    protected get template(): string {
        return drawAddingPost(this.data);
    }
}
