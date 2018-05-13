import View from '../view';

const drawRegistry = (): string => {
    return `<div class="form-block outer-block">
  <h2 class="title">Регистрация</h2>
  <form class="form" id="registry-form">
    <div class="row">
      <label for="login" class="label">Логин</label>
      <div class="value">
        <input type="text" id="login" name="login">
      </div>
    </div>
    <div class="row">
      <label for="password" class="label">Пароль</label>
      <div class="value">
        <input type="password" id="password" name="password">
      </div>
    </div>
    <div class="row">
      <label for="repeat-password" class="label">Повторите пароль</label>
      <div class="value">
        <input type="password" id="repeat-password" name="repeat-password">
      </div>
    </div>
    <div class="row">
      <label for="name" class="label">Имя</label>
      <div class="value">
        <input type="text" id="name" name="name">
      </div>
    </div>
    <div class="row">
      <label for="tel" class="label">Моб. телефон</label>
      <div class="value">
        <input type="tel" id="tel" name="tel">
      </div>
    </div>
    <div class="row">
      <label for="email" class="label">E-mail</label>
      <div class="value">
        <input type="email" id="email" name="email">
      </div>
    </div>
  </form>
  <button type="button" class="submit" id="submit">Зарегистрироваться</button>
</div>`;
};

export default class RegistryView extends View {
    protected get template(): string {
        return drawRegistry();
    }
}
