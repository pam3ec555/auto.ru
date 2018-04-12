import {navData} from "../data";
import View from "../view";

const drawLogo = (): string => {
    return `<div class="logo">
              <img src="img/icons/logo.svg" alt="Car">
            </div>`;
};

const drawLog = (): string => {
    return `<span class="login__user-name">User name</span>
            <button type="button" class="login__log-out" id="log-out"></button>`;
};

const drawNav = (data: Array<object>): string => {
    let navItems: string;

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
            </header>`;
};

const drawMobileMenu = (): string => {
    return `${drawMobileHeader()}
            <div class="m-menu m-menu--hidden" id="mobile-menu">
              <div class="m-menu__section login outer-block">${drawLog()}</div>
              <nav class="m-menu__section nav outer-block">${drawNav(navData)}</nav>
            </div>`;
};

export default class MenuView extends View {
    protected get template(): string {
        return drawMobileMenu();
    }
}