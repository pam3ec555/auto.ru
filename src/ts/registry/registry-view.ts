import View from '../view';

const drawRegistry = (): string => {
    return `<div class="registry">
  <h2 class="registry__title">Регистрация</h2>
  <div class="registry__form">
    <div class="registry__row">
      <label for="login" class="registry__label">Логин</label>
      <div class="registry__val">
        <input type="text" id="login">
      </div>
    </div>
    <div class="registry__row">
      <label for="password" class="registry__label">Пароль</label>
      <div class="registry__val">
        <input type="password" id="password">
      </div>
    </div>
    <div class="registry__row">
      <label for="repeat-password" class="registry__label">Повторите пароль</label>
      <div class="registry__val">
        <input type="password" id="repeat-password">
      </div>
    </div>
    <div class="registry__row">
      <label for="name" class="registry__label">Имя</label>
      <div class="registry__val">
        <input type="text" id="name">
      </div>
    </div>
    <div class="registry__row">
      <label for="tel" class="registry__label">Моб. телефон</label>
      <div class="registry__val">
        <input type="tel" id="tel">
      </div>
    </div>
    <div class="registry__row">
      <label for="email" class="registry__label">E-mail</label>
      <div class="registry__val">
        <input type="email" id="email">
      </div>
    </div>
    <button type="button" class="registry__submit" id="submit">Зарегистрироваться</button>
  </div>
</div>`;
};

export default class RegistryView extends View {
    protected get template(): string {
        return drawRegistry();
    }
}