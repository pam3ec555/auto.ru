import View from '../view';

const drawLogin = (): string => {
    return `<div class="form-block outer-block">
  <h2 class="title">Вход</h2>
  <div class="form">
      <div class="row">
        <label for="login" class="label">Логин</label>
        <div class="value">
          <input type="text" id="login">
        </div>
      </div>
      <div class="row">
        <label for="password" class="label">Пароль</label>
        <div class="value">
          <input type="password" id="password">
        </div>
      </div>
  </div>
  <button type="button" class="submit" id="submit">Войти</button>
</div>`;
};

export default class LoginView extends View {
    protected get template(): string {
        return drawLogin();
    }
}
