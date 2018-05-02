import View from '../view';
import {IMenu, INavData, IUserData} from './menu';
import {logo} from '../images';
import {MenuType, ViewType} from '../util';
import {userData} from '../data';

const drawLogo = (): string => {
    return `<div class="logo">
  <img src="${logo}" alt="Car">
</div>`;
};

const drawDesktopGuest = (): string => {
    return `<p>
  <a href="#" class="login__log-in" id="log-in">Войти</a> или
  <a href="#" class="login__sign-up" id="sign-up">Зарегистрироваться</a>
</p>`;
};

const drawGuest = ():string => {
    return `<p>Вы не авторизованы.
  <a href="#" class="login__log-in" id="log-in">Войти</a> или
  <a href="#" class="login__sign-up" id="sign-up">Зарегистрироваться</a>
</p>`
};

const drawLog = (data: IUserData): string => {
    return `<span class="login__user-name">${data.name}</span>
<button type="button" class="login__log-out" id="log-out"></button>`;
};

const drawNav = (data: Array<INavData>): string => {
    let navItems: string = ``;

    data.forEach((item: {link: string, name: string, id: string}): void => {
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
</button>` : `<a href="#" class="back-btn" id="back-btn">
  <div class="back-btn__inner"></div>
</a>`;
    const searchBtn = (menuType === MenuType.LIST) ? `<button type="button" class="search-btn" id="search-btn"></button>` : `<span class="empty empty--header-btn"></span>`;
    const searchInput = (menuType === MenuType.LIST) ? `<input type="text" class="search-input search-input--hidden" id="search-input">` : ``;

    return `<header class="outer-block">
  ${leftBtn}
  ${drawLogo()}
  ${searchBtn}
</header>
${searchInput}`;
};

const drawDesktopHeader = (data: IMenu): string => {
    const loginView: string = (Object.keys(data.userData).length !== 0) ? drawLog(userData) : drawDesktopGuest();

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

const drawMobileMenu = (data: IMenu, menuType: MenuType, resize: boolean): string => {
    const inner = (!resize) ? `<main class="inner" id="inner"></main>` : ``;
    const loginView: string = (Object.keys(data.userData).length !== 0) ? drawLog(userData) : drawGuest();
    const menu = (menuType === MenuType.LIST) ? `<div class="m-menu m-menu--hidden" id="mobile-menu">
  <div class="m-menu__section login outer-block">${loginView}</div>
  <nav class="m-menu__section nav outer-block">${drawNav(data.navData)}</nav>
  <button type="button" class="close-btn m-menu__close-btn" id="menu-hide"></button>
</div>` : ``;

    return `${drawMobileHeader(menuType)}
${menu}
${inner}`;
};

const drawDesktopMenu = (data: IMenu, menuType: MenuType, resize: boolean): string => {
    const inner = (!resize) ? `<div class="inner" id="inner"></div>` : ``;
    const searchInput = (menuType === MenuType.LIST) ? `<div class="search-input__wrap" id="search-wrap">
  <input type="text" class="search-input" id="search-input">
  <div class="search-input__border"></div>
</div>` : ``;
    const sortResults = (menuType === MenuType.LIST) ? `<div class="sort-results" id="sort-results"></div>` : ``;
    const sort = (menuType === MenuType.LIST) ? `<div class="sort" id="sort"></div>` : ``;

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

    constructor(data: IMenu, viewState: ViewType, menuType: MenuType, resize: boolean = false) {
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