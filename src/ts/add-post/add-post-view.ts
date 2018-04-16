import View from '../view';

const drawAddingPost = (): string => {
    return `<div class="add-post">
  <h2 class="add-post__title">Добавление</h2>
  <div class="add-post__form">
    <div class="add-post__row">
      <span class="add-post__label">Марка автомобиля</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Модель автомобиля</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Кузов</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Объем двигателя</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Мощность двигателя</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Тип двигателя</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Коробка</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Привод</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Руль</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Состояние</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">ПТС</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Владельцы</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Год выпуска</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Пробег</span>
      <div class="add-post__address"></div>
    </div>
    <div class="add-post__row">
      <span class="add-post__label">Цвет</span>
      <div class="add-post__address"></div>
    </div>
    <button type="button" class="add-post__submit" id="submit">Добавить</button>
  </div>
</div>`
};

export default class AddPostView extends View {
    protected get template(): string {
        return drawAddingPost();
    }
}