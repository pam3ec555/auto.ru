import View from '../view';
import {UserData} from "../menu/menu";
import {CarCharacteristics} from '../car-action/car-action';

const getOptions = (carCharacteristic: Set<string>): string => {
    let options: string = `<option value=""></option>`;

    carCharacteristic.forEach((characteristic: string) => {
        options += `<option value="${characteristic}">${characteristic}</option>`;
    });

    return options;
};

const drawAddingPost = (userData: UserData, carCharacteristics: CarCharacteristics): string => {
    const date: Date = new Date();

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
        <select name="bodyType">
          ${getOptions(carCharacteristics.bodyType)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Объем двигателя</span>
      <div class="value">
        <input type="number" name="engineVolume">
      </div>
    </div>
    <div class="row">
      <span class="label">Мощность двигателя</span>
      <div class="value">
        <input type="number" name="enginePower" step="10">
      </div>
    </div>
    <div class="row">
      <span class="label">Тип двигателя</span>
      <div class="value">
        <select name="engineType">
          ${getOptions(carCharacteristics.engineType)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Коробка</span>
      <div class="value">
        <select name="boxTransmission">
          ${getOptions(carCharacteristics.boxTransmission)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Привод</span>
      <div class="value">
        <select name="wheelTransmission">
          ${getOptions(carCharacteristics.wheelTransmission)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Руль</span>
      <div class="value">
        <select name="leftHelm">
          ${getOptions(carCharacteristics.leftHelm)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Состояние</span>
      <div class="value">
        <select  name="state">
          ${getOptions(carCharacteristics.state)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">ПТС</span>
      <div class="value">
        <select name="originalPTS">
          ${getOptions(carCharacteristics.originalPTS)}
        </select>
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
        <input type="number" name="year" min="1900" max="${date.getFullYear()}">
      </div>
    </div>
    <div class="row">
      <span class="label">Пробег</span>
      <div class="value">
        <input type="number" name="mileage" step="10000">
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
        <input type="number" name="price" step="10000">
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
        <label for="photos" class="btn btn--primary">Загрузить</label>
        <input type="file" name="photos" id="photos" multiple>
        <span>Выбрано <span id="upload-count">0</span> файлов.</span>
      </div>
    </div>
    <input type="hidden" name="login" value="${userData.login}">
    <input type="hidden" name="ownerName" value="${userData.name}">
    <input type="hidden" name="phoneNum" value="${userData.tel}">
    <input type="hidden" name="email" value="${userData.email}">
    <ul class="error-list">
      <li class="error-list__item" id="num-error">Вы неправильно заполнили числовые поля!</li>
      <li class="error-list__item" id="image-error">
        Вы загрузили неверный формат! Разрешены следующие расширения: ".png", ".jpg", ".jpeg", ".gif".
      </li>
      <li class="error-list__item" id="empty-fields">Заполните все обязательные поля!</li>
    </ul>
    <button type="submit" class="btn btn--primary" id="submit" data-type="add">Добавить</button>
  </form>
</div>`;
};

export default class AddPostView extends View {
    private carCharacteristics: CarCharacteristics;

    constructor(data: UserData, carCharacteristics: CarCharacteristics) {
        super(data);

        this.carCharacteristics = carCharacteristics;
    }

    protected get template(): string {
        return drawAddingPost(this.data, this.carCharacteristics);
    }
}
