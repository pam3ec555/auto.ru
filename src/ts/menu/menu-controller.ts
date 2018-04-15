import MenuModel from './menu-model';
import MenuView from './menu-view';
import Controller from '../controller';
import {toggleOverlay} from '../util';
import {MenuData} from './menu-data';
import App from '../app';

const hideMenu = (): void => {
    const menu: HTMLElement = document.querySelector(`#mobile-menu`);

    if (menu) {
        menu.classList.add(`m-menu--hidden`);
        toggleOverlay(false);
    }
};

const showMenu = (): void => {
    const menu: HTMLElement = document.querySelector(`#mobile-menu`);

    if (menu) {
        menu.classList.remove(`m-menu--hidden`);
        toggleOverlay(true);
    }
};

export default class MenuController extends Controller {
    private data: MenuData;

    public init(): void {
        const menuModel: MenuModel = new MenuModel();
        this.data = menuModel.data;
        const appWrap: HTMLElement = document.querySelector(`#app`);
        const menuView = new MenuView(this.data);
        appWrap.appendChild(menuView.render());
        this.bind();
    }

    protected bind(): void {
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

        this.initLogLinks();
    }

    private initLogLinks(): void {
        if (Object.keys(this.data.userData).length !== 0) {
            const logoutBtn: HTMLButtonElement = document.querySelector(`#log-out`);

            if (logoutBtn) {
                logoutBtn.addEventListener(`click`, this.onLogoutClick)
            }
        } else {
            const loginBtn: HTMLHRElement = document.querySelector(`#log-in`);
            const signUpBtn: HTMLHRElement = document.querySelector(`#sign-up`);

            if (loginBtn) {
                loginBtn.addEventListener(`click`, this.onLoginClick);
            }

            if (signUpBtn) {
                signUpBtn.addEventListener(`click`, this.onSignUpClick);
            }
        }
    }

    private onLogoutClick(): void {
        //Todo make logout
    }

    private onLoginClick(e: Event): void {
        e.preventDefault();
        App.showLogin();
        hideMenu();
    }

    private onSignUpClick(e: Event): void {
        e.preventDefault();
        App.showRegistry();
        hideMenu();
    }

    private onMenuHideClick(): void {
        hideMenu();
    }

    private onMenuShowClick(): void {
        showMenu();
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