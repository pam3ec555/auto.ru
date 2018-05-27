import View from '../view';
import {Menu, NavData, UserData} from './menu';
import {MenuType, ViewType} from '../util';

const drawSort = (): string => {
    const date: Date = new Date();

    return `<div class="empty-wrap">
  <input type="text" data-autocomplete="/cars-data-api/brand" class="sort-input" id="sort-brand" placeholder="Марка">
</div>
<div class="empty-wrap">
  <input type="text" data-autocomplete="/cars-data-api/:brand" class="sort-input" id="sort-model" placeholder="Модель">
</div>
<input type="number" id="sort-year" placeholder="Год от" class="sort-input" min="1900" max="${date.getFullYear()}">
<input type="number" id="sort-price" placeholder="Цена до, &#8381;" class="sort-input" step="10000">
<input type="number" id="sort-mileage" placeholder="Пробег до, км" class="sort-input" step="10000">
<button type="button" id="sort-submit" class="submit submit--sort">Применить</button>`;
};

const drawLogo = (): string => {
    return `<div class="logo">
  <img src="/src/img/icons/logo.svg" alt="Car">
</div>`;
};

const drawDesktopGuest = (): string => {
    return `<p>
  <a href="/login" class="login__log-in" id="log-in">Войти</a> или
  <a href="/registry" class="login__sign-up" id="sign-up">Зарегистрироваться</a>
</p>`;
};

const drawGuest = (): string => {
    return `<p>Вы не авторизованы.
  <a href="/login" class="login__log-in" id="log-in">Войти</a> или
  <a href="/registry" class="login__sign-up" id="sign-up">Зарегистрироваться</a>
</p>`;
};

const drawLog = (data: UserData): string => {
    return `<div class="login">
  <span class="login__user-name">${data.name}</span>
  <button type="button" class="login__log-out" id="log-out"></button>
</div>`;
};

const drawNav = (data: Array<NavData>): string => {
    let navItems: string = ``;

    data.forEach((item: {
        link: string,
        name: string,
        id: string
    }): void => {
         navItems += `<li class="nav__item">
  <a href="${item.link}" class="nav__link" id="${item.id}">${item.name}</a>
</li>`;
    });

    return `<ul class="nav__list">
  ${navItems}
</ul>`;
};

const drawMobileHeader = (menuType: MenuType): string => {
    const leftBtn = (menuType === MenuType.LIST) ? `<button type="button" class="hamburger" id="menu-show">
  <div class="hamburger__inner"></div>
</button>` : `<a href="/" class="back-btn" id="back-btn">
  <div class="back-btn__inner"></div>
</a>`;
    const searchBtn = (menuType === MenuType.LIST) ?
        `<button type="button" class="search-btn" id="search-btn"></button>` :
        `<span class="empty empty--header-btn"></span>`;
    const searchInput = (menuType === MenuType.LIST) ?
        `<input type="text" class="search-input search-input--hidden" id="search-input">` :
        ``;

    return `<header class="outer-block">
  ${leftBtn}
  ${drawLogo()}
  ${searchBtn}
</header>
${searchInput}`;
};

const drawDesktopHeader = (data: Menu): string => {
    const loginView: string = (data.userData) ? drawLog(data.userData) : drawDesktopGuest();

    return `<header class="outer-block">
  <div class="container">
    <div class="flex">
      ${drawLogo()}
      ${drawNav(data.navData)}
    </div>
    ${loginView}
  </div>
</header>`;
};

const drawMobileMenu = (data: Menu, menuType: MenuType, resize: boolean): string => {
    const inner = (!resize) ? `<main class="inner" id="inner"></main>` : ``;
    const loginView: string = (data.userData) ? drawLog(data.userData) : drawGuest();
    const emptyNav = (data.navData.length === 0) ? ` m-menu__section--empty` : ``;
    const menu = (menuType === MenuType.LIST) ? `<div class="m-menu m-menu--hidden" id="mobile-menu">
  <div class="m-menu__section login outer-block">${loginView}</div>
  <nav class="m-menu__section nav outer-block${emptyNav}">${drawNav(data.navData)}</nav>
  <div class="m-menu__section sort outer-block" id="sort">${drawSort()}</div>
  <button type="button" class="close-btn m-menu__close-btn" id="menu-hide"></button>
</div>` : ``;

    return `${drawMobileHeader(menuType)}
${menu}
${inner}`;
};

const drawDesktopMenu = (data: Menu, menuType: MenuType, resize: boolean): string => {
    const inner = (!resize) ? `<div class="inner" id="inner"></div>` : ``;
    const searchInput = (menuType === MenuType.LIST) ? `<div class="search-input__wrap" id="search-wrap">
  <button type="button" class="search-submit" id="search-submit"></button>
  <input type="text" class="search-input" id="search-input">
  <div class="search-input__border"></div>
</div>` : ``;
    const sortResults = (menuType === MenuType.LIST) ? `<div class="sort-results" id="sort-results"></div>` : ``;
    const sort = (menuType === MenuType.LIST) ? `<div class="sort outer-block" id="sort">${drawSort()}</div>` : ``;

    return `${drawDesktopHeader(data)}
${sort}
${searchInput}
${sortResults}
${inner}`;
};

export default class MenuView extends View {
    private viewState: ViewType;
    private menuType: MenuType;
    private resize: boolean;

    constructor(data: Menu, viewState: ViewType, menuType: MenuType, resize: boolean = false) {
        super(data);
        this.viewState = viewState;
        this.menuType = menuType;
        this.resize = resize;
    }

    protected get template(): string {
        let template = ``;

        if (this.viewState === ViewType.DESKTOP) {
            template = drawDesktopMenu(this.data, this.menuType, this.resize);
        } else {
            template = drawMobileMenu(this.data, this.menuType, this.resize);
        }

        return template;
    }
}
