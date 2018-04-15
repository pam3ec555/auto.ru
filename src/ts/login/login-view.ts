import View from '../view';

const drawLogin = (): string => {
    return `<div class="login-page">
  <h2 class="login-page__title">Вход</h2>
  <div class="login-page__form">
      <div class="login-page__row">
        <label for="login" class="login-page__label">Логин</label>
        <div class="login-page__val">
          <input type="text" id="login">
        </div>
      </div>
      <div class="login-page__row">
        <label for="password" class="login-page__label">Пароль</label>
        <div class="login-page__val">
          <input type="password" id="password">
        </div>
      </div>
      <button type="button" class="login-page__submit" id="submit">Войти</button>
  </div>
</div>`;
};

export default class LoginView extends View {
    protected get template(): string {
        return drawLogin();
    }
}