import View from '../view';

const drawLogin = (): string => {
    return `<div class="form-block outer-block">
  <h2 class="title">Вход</h2>
  <form class="form" id="login-form">
      <div class="row">
        <label for="login" class="label">Логин</label>
        <div class="value">
          <input type="text" name="login" id="login">
        </div>
      </div>
      <div class="row">
        <label for="password" class="label">Пароль</label>
        <div class="value">
          <input type="password" name="password" id="password">
        </div>
      </div>
      <li class="error-list__item" id="login-error">Пользователь с таким логином не существует!</li>
      <li class="error-list__item" id="password-error">Неверный пароль!</li>
      <li class="error-list__item" id="empty-fields">Заполните все обязательные поля!</li>
      <button type="submit" class="btn btn--primary" id="submit">Войти</button>
  </form>
</div>`;
};

export default class LoginView extends View {
    protected get template(): string {
        return drawLogin();
    }
}
