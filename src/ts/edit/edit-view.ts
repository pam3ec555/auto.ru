import {Car} from '../car/car';
import View from '../view';
import {CarCharacteristics} from '../car-action/car-action';

const getOptions = (carCharacteristic: Set<string>, value: string): string => {
    let options: string = `<option value=""></option>`;

    carCharacteristic.forEach((characteristic: string) => {
        const selected: string = (value === characteristic) ? ` selected` : ``;
        options += `<option value="${characteristic}"${selected}>${characteristic}</option>`;
    });

    return options;
};

const drawEdit = (data: Car, carCharacteristics: CarCharacteristics) => {
    return `<div class="form-block outer-block">
  <h2 class="title">Редактирование</h2>
  <form class="form" id="edit-form">
    <div class="row">
      <span class="label">Марка автомобиля</span>
      <div class="value">
        <input type="text" name="brand" data-autocomplete="/cars-data-api/brand" id="brand-field" value="${data.brand}"
            data-autocomplete-old-value="${data.brand}">
      </div>
    </div>
    <div class="row">
      <span class="label">Модель автомобиля</span>
      <div class="value">
        <input type="text" name="model" data-autocomplete="/cars-data-api/:brand" id="model-field"
            value="${data.model}" data-autocomplete-old-value="${data.model}">
      </div>
    </div>
    <div class="row">
      <span class="label">Кузов</span>
      <div class="value">
         <select name="bodyType">
          ${getOptions(carCharacteristics.bodyType, data.bodyType)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Объем двигателя</span>
      <div class="value">
        <input type="number" name="engineVolume" value="${data.engineVolume}">
      </div>
    </div>
    <div class="row">
      <span class="label">Мощность двигателя</span>
      <div class="value">
        <input type="number" name="enginePower" value="${data.enginePower}" step="10">
      </div>
    </div>
    <div class="row">
      <span class="label">Тип двигателя</span>
      <div class="value">
        <select name="engineType">
          ${getOptions(carCharacteristics.engineType, data.engineType)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Коробка</span>
      <div class="value">
        <select name="boxTransmission">
          ${getOptions(carCharacteristics.boxTransmission, data.boxTransmission)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Привод</span>
      <div class="value">
        <select name="wheelTransmission">
          ${getOptions(carCharacteristics.wheelTransmission, data.wheelTransmission)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Руль</span>
      <div class="value">
        <select name="leftHelm">
          ${getOptions(carCharacteristics.leftHelm, data.leftHelm)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">Состояние</span>
      <div class="value">
        <select  name="state">
          ${getOptions(carCharacteristics.state, data.state)}
        </select>
      </div>
    </div>
    <div class="row">
      <span class="label">ПТС</span>
      <div class="value">
        <select name="originalPTS">
          ${getOptions(carCharacteristics.originalPTS, data.originalPTS)}
        </select>
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
        <input type="number" name="year" value="${data.year}">
      </div>
    </div>
    <div class="row">
      <span class="label">Пробег</span>
      <div class="value">
        <input type="number" name="mileage" value="${data.mileage}" step="10000">
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
        <input type="number" name="price" value="${data.price}" step="10000">
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
        <label for="photos" class="btn btn--primary">Загрузить</label>
        <input type="file" name="photos" id="photos" multiple>
        <span>Выбрано <span id="upload-count">0</span> файлов.</span>
      </div>
    </div>
    <input type="hidden" name="login" value="${data.login}">
    <input type="hidden" name="ownerName" value="${data.ownerName}">
    <input type="hidden" name="phoneNum" value="${data.phoneNum}">
    <input type="hidden" name="email" value="${data.email}">
    <input type="hidden" name="_id" value="${data._id}">
    <ul class="error-list">
      <li class="error-list__item" id="num-error">Вы неправильно заполнили числовые поля!</li>
      <li class="error-list__item" id="image-error">
        Вы загрузили неверный формат! Разрешены следующие расширения: ".png", ".jpg", ".jpeg", ".gif".
      </li>
      <li class="error-list__item" id="empty-fields">Заполните все обязательные поля!</li>
    </ul>
    <button type="submit" class="btn btn--primary" id="submit" data-type="edit">Сохранить</button>
  </form>
</div>`;
};

export default class EditView extends View {
    private carCharacteristics: CarCharacteristics;

    constructor(data: Car, carCharacteristics: CarCharacteristics) {
        super(data);

        this.carCharacteristics = carCharacteristics;
    }

    protected get template(): string {
        return drawEdit(this.data, this.carCharacteristics);
    }
}
