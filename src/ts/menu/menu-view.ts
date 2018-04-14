import View from '../view';
import {MenuData, UserData} from './menu-data';
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

const drawNav = (data: Array<object>): string => {
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
            </div>`;
};

export default class MenuView extends View {
    private data: MenuData;

    constructor(data: MenuData) {
        super();
        this.data = data;
    }

    protected get template(): string {
        return drawMobileMenu(this.data);
    }

    public bind(): void {
        const menuShowBtn: HTMLButtonElement = document.querySelector(`#menu-show`);
        const menuHideBtn: HTMLButtonElement = document.querySelector(`#menu-hide`);
        const searchInput: HTMLInputElement = document.querySelector(`#search-input`);
        const searchBtn: HTMLButtonElement = document.querySelector(`#search-btn`);

        if (menuShowBtn) {
            menuShowBtn.addEventListener(`click`, this.onMenuShowClick);
        }

        if (menuHideBtn) {
            menuHideBtn.addEventListener(`click`, this.onMenuHideClick);
        }

        if (searchBtn && searchInput) {
            searchBtn.addEventListener(`click`, this.onSearchToggle);
            searchInput.addEventListener(`blur`, this.onSearchToggle);
        }
    }

    private onMenuHideClick(): void {
        const menu: HTMLElement = document.querySelector(`#mobile-menu`);

        if (menu) {
            menu.classList.add(`m-menu--hidden`);
            toggleOverlay(false);
        }
    }

    private onMenuShowClick(): void {
        const menu: HTMLElement = document.querySelector(`#mobile-menu`);

        if (menu) {
            menu.classList.remove(`m-menu--hidden`);
            toggleOverlay(true);
        }
    }

    private onSearchToggle(): void {
        const searchInput: HTMLInputElement = document.querySelector(`#search-input`);
        const searchBtn: HTMLButtonElement = document.querySelector(`#search-btn`);

        if (searchInput.classList.contains(`search-input--hidden`)) {
            searchInput.classList.remove(`search-input--hidden`);
            searchBtn.classList.add(`search-btn--hidden`);
            searchBtn.disabled = true;
            searchInput.focus();
        } else {
            searchInput.classList.add(`search-input--hidden`);
            searchBtn.classList.remove(`search-btn--hidden`);
            searchInput.value = ``;
            searchBtn.disabled = false;
        }
    }
}