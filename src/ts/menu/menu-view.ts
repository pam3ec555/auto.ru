import View from '../view';
import {MenuData, NavData, UserData} from './menu-data';
import {logo} from '../images'
import {toggleOverlay} from '../util';

const drawLogo = (): string => {
    return `<div class="logo">
  <img src="${logo}" alt="Car">
</div>`;
};

const drawLog = (data: UserData): string => {
    return `<span class="login__user-name">${data.name}</span>
<button type="button" class="login__log-out" id="log-out"></button>`;
};

const drawNav = (data: Array<NavData>): string => {
    let navItems: string = ``;

    data.forEach((item: {link: string, name: string}) => {
         navItems += `<li class="nav__item">
  <a href="${item.link}" class="nav__link">${item.name}</a>
</li>`;
    });
    return `<ul class="nav__list">
  ${navItems}
</ul>`;
};

const drawMobileHeader = (): string => {
    return `<header class="outer-block">
  <button type="button" class="hamburger" id="menu-show">
    <div class="hamburger__inner"></div>
  </button>
  ${drawLogo()}
  <button type="button" class="search-btn" id="search-btn"></button>
</header>
<input type="text" class="search-input search-input--hidden" id="search-input">`;
};

const drawMobileMenu = (data: MenuData): string => {
    return `${drawMobileHeader()}
            <div class="m-menu m-menu--hidden" id="mobile-menu">
  <div class="m-menu__section login outer-block">${drawLog(data.userData)}</div>
  <nav class="m-menu__section nav outer-block">${drawNav(data.navData)}</nav>
  <button type="button" class="close-btn m-menu__close-btn" id="menu-hide"></button>
</div>
<main class="inner" id="inner"></main>`;
};

export default class MenuView extends View {
    constructor(data: MenuData) {
        super(data);
    }

    protected get template(): string {
        return drawMobileMenu(this.data);
    }
}