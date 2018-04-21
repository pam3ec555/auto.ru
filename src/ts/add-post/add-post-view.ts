import View from '../view';

const drawAddingPost = (): string => {
    return `<div class="form-block outer-block">
  <h2 class="title">Добавление</h2>
  <div class="form">
    <div class="row">
      <span class="label">Марка автомобиля</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Модель автомобиля</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Кузов</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Объем двигателя</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Мощность двигателя</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Тип двигателя</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Коробка</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Привод</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Руль</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Состояние</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">ПТС</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Владельцы</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Год выпуска</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Пробег</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
    <div class="row">
      <span class="label">Цвет</span>
      <div class="value">
        <input type="text">
      </div>
    </div>
  </div>
  <button type="button" class="submit" id="submit">Добавить</button>
</div>`
};

export default class AddPostView extends View {
    protected get template(): string {
        return drawAddingPost();
    }
}