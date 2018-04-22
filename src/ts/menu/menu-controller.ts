import MenuModel from './menu-model';
import MenuView from './menu-view';
import {MenuType, toggleOverlay, ViewType} from '../util';
import {MenuData} from './menu-data';
import App from '../app';
import Controller from '../controller';

const appWrap: HTMLElement = document.querySelector(`#app`);

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
        this.bind(false);
        const menuView = new MenuView(this.data, this.viewState, menuType);
        appWrap.innerHTML = ``;
        appWrap.appendChild(menuView.render());
        this.bind();
    }

    private bind(bind: boolean = true): void {
        const menuShowBtn: HTMLButtonElement = document.querySelector(`#menu-show`);
        const menuHideBtn: HTMLButtonElement = document.querySelector(`#menu-hide`);
        const searchInput: HTMLInputElement = document.querySelector(`#search-input`);
        const searchBtn: HTMLButtonElement = document.querySelector(`#search-btn`);
        const addPostBtn: HTMLHRElement = document.querySelector(`#add-post`);
        const backBtn: HTMLHRElement = document.querySelector(`#back-btn`);

        if (menuShowBtn) {
            if (bind) {
                menuShowBtn.addEventListener(`click`, this.onMenuShowClick);
            } else {
                menuShowBtn.removeEventListener(`click`, this.onMenuShowClick);
            }
        }

        if (menuHideBtn) {
            if (bind) {
                menuHideBtn.addEventListener(`click`, this.onMenuHideClick);
            } else {
                menuHideBtn.removeEventListener(`click`, this.onMenuHideClick);
            }
        }

        if (searchBtn && searchInput) {
            if (bind) {
                searchBtn.addEventListener(`click`, this.onSearchToggle);
                searchInput.addEventListener(`blur`, this.onSearchToggle);
            } else {
                searchBtn.removeEventListener(`click`, this.onSearchToggle);
                searchInput.removeEventListener(`blur`, this.onSearchToggle);
            }
        }

        if (addPostBtn) {
            if (bind) {
                addPostBtn.addEventListener(`click`, this.onAddPostClick);
            } else {
                addPostBtn.removeEventListener(`click`, this.onAddPostClick);
            }
        }

        if (backBtn) {
            if (bind) {
                backBtn.addEventListener(`click`, this.onBackClick);
            } else {
                backBtn.removeEventListener(`click`, this.onBackClick);
            }
        }

        this.bindLogLinks(bind);
    }

    private bindLogLinks(bind: boolean = true): void {
        if (Object.keys(this.data.userData).length !== 0) {
            const logoutBtn: HTMLButtonElement = document.querySelector(`#log-out`);

            if (logoutBtn) {
                if (bind) {
                    logoutBtn.addEventListener(`click`, this.onLogoutClick)
                } else {
                    logoutBtn.removeEventListener(`click`, this.onLogoutClick)
                }
            }
        } else {
            const loginBtn: HTMLHRElement = document.querySelector(`#log-in`);
            const signUpBtn: HTMLHRElement = document.querySelector(`#sign-up`);

            if (loginBtn) {
                if (bind) {
                    loginBtn.addEventListener(`click`, this.onLoginClick);
                } else {
                    loginBtn.removeEventListener(`click`, this.onLoginClick);
                }
            }

            if (signUpBtn) {
                if (bind) {
                    signUpBtn.addEventListener(`click`, this.onSignUpClick);
                } else {
                    signUpBtn.removeEventListener(`click`, this.onSignUpClick);
                }
            }
        }
    }

    private onLogoutClick = (): void => {
        //Todo make logout
    };

    private onAddPostClick = (e: Event): void => {
        e.preventDefault();
        App.showAddingPost();
        hideMenu();
    };

    private onLoginClick = (e: Event): void => {
        e.preventDefault();
        App.showLogin();
        hideMenu();
    };

    private onSignUpClick = (e: Event): void => {
        e.preventDefault();
        App.showRegistry();
        hideMenu();
    };

    private onMenuHideClick = (): void => {
        hideMenu();
    };

    private onMenuShowClick = (): void => {
        showMenu();
    };

    private onBackClick = (): void => {
        history.back();
    };

    private onSearchToggle = (): void => {
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