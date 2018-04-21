import MenuModel from './menu-model';
import MenuView from './menu-view';
import {MenuType, toggleOverlay, ViewType} from '../util';
import {MenuData} from './menu-data';
import App from '../app';
import Controller from '../controller';

const appWrap: HTMLElement = document.querySelector(`#app`);
const innerBlock: HTMLElement = document.querySelector(`#inner`);

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

const clearHeader = (): void => {
    const header = document.querySelector(`header`);
    const searchInput = document.querySelector(`#search-input`);

    if (header) {
        header.remove();
    }

    if (searchInput) {
        searchInput.remove();
    }
};

const clearMobileMenu = (): void => {
    const mobileMenu = document.querySelector(`#mobile-menu`);

    if (mobileMenu) {
        mobileMenu.remove();
    }
};

export default class MenuController extends Controller {
    private data: MenuData;
    private menuModel: MenuModel;
    private menuType: MenuType;

    constructor(viewState: ViewType, menuType: MenuType) {
        super(viewState);
        this.menuType = menuType;
    }

    public init(): void {
        this.menuModel = new MenuModel();
        this.data = this.menuModel.data;
        const menuView = new MenuView(this.data, this.viewState, this.menuType);
        appWrap.appendChild(menuView.render());
        this.bind();
    }

    public resize(viewState: ViewType): void {
        const menuView = new MenuView(this.data, viewState, this.menuType);
    }

    public changeMenuType(menuType: MenuType): void {
        const menuView = new MenuView(this.data, this.viewState, menuType);
        clearHeader();
        clearMobileMenu();
        appWrap.insertBefore(menuView.render(), innerBlock);
    }

    private bind(): void {
        const menuShowBtn: HTMLButtonElement = document.querySelector(`#menu-show`);
        const menuHideBtn: HTMLButtonElement = document.querySelector(`#menu-hide`);
        const searchInput: HTMLInputElement = document.querySelector(`#search-input`);
        const searchBtn: HTMLButtonElement = document.querySelector(`#search-btn`);
        const addPostBtn: HTMLHRElement = document.querySelector(`#add-post`);

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

        if (addPostBtn) {
            addPostBtn.addEventListener(`click`, this.onAddPostClick);
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

    private onAddPostClick(e: Event): void {
        e.preventDefault();
        App.showAddingPost();
        hideMenu();
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