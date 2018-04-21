import View from '../view';
import {MenuData, NavData, UserData} from './menu-data';
import {logo} from '../images'
import {MenuType, toggleOverlay, ViewType} from '../util';
import {userData} from '../data';

const drawLogo = (): string => {
    return `<div class="logo">
  <img src="${logo}" alt="Car">
</div>`;
};

const drawGuest = ():string => {
    return `<p>Вы не авторизованы.
  <a href="#" class="login__log-in" id="log-in">Войти</a> или
  <a href="#" class="login__sign-up" id="sign-up">Зарегистрироваться</a>
</p>`
};

const drawLog = (data: UserData): string => {
    return `<span class="login__user-name">${data.name}</span>
<button type="button" class="login__log-out" id="log-out"></button>`;
};

const drawNav = (data: Array<NavData>): string => {
    let navItems: string = ``;

    data.forEach((item: {link: string, name: string, id: string}) => {
         navItems += `<li class="nav__item">
  <a href="${item.link}" class="nav__link" id="${item.id}">${item.name}</a>
</li>`;
    });
    return `<ul class="nav__list">
  ${navItems}
</ul>`;
};

const drawMobileHeader = (viewState: ViewType, menuType: MenuType): string => {
    const hamburger = (menuType === MenuType.LIST) ? `<button type="button" class="hamburger" id="menu-show">
    <div class="hamburger__inner"></div>
  </button>` : ``;
    const searchBtn = (menuType === MenuType.LIST) ? `<button type="button" class="search-btn" id="search-btn"></button>` : ``;
    const searchInput = (menuType === MenuType.LIST) ? `<input type="text" class="search-input search-input--hidden" id="search-input">` : ``;

    return `<header class="outer-block">
  ${hamburger}
  ${drawLogo()}
  ${searchBtn}
</header>
${searchInput}`;
};

const drawMobileMenu = (data: MenuData, viewState: ViewType, menuType: MenuType): string => {
    const loginView: string = (Object.keys(data.userData).length !== 0) ? drawLog(userData) : drawGuest();
    const menu = (menuType === MenuType.LIST) ? `<div class="m-menu m-menu--hidden" id="mobile-menu">
  <div class="m-menu__section login outer-block">${loginView}</div>
  <nav class="m-menu__section nav outer-block">${drawNav(data.navData)}</nav>
  <button type="button" class="close-btn m-menu__close-btn" id="menu-hide"></button>
</div>` : ``;

    return `${drawMobileHeader(viewState, menuType)}
${menu}
<main class="inner" id="inner"></main>`;
};

export default class MenuView extends View {
    private viewState: ViewType;
    private menuType: MenuType;

    constructor(data: MenuData, viewState: ViewType, menuType: MenuType) {
        super(data);
        this.viewState = viewState;
        this.menuType = menuType;
    }

    protected get template(): string {
        return drawMobileMenu(this.data, this.viewState, this.menuType);
    }
}