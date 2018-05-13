import MenuModel from './menu-model';
import MenuView from './menu-view';
import {MenuType, toggleOverlay, ViewType, appWrap, pushUrl} from '../util';
import {Menu} from './menu';
import App from '../app';
import Controller from '../controller';

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

const removeElems = (...elems: any[]): void => {
    (Array as any).from(elems).forEach((elem: any): void => {
        if (elem) {
            elem.remove();
        }
    });
};

const removeMenuElems = (viewState: ViewType): void => {
    removeElems(document.querySelector(`header`));

    if (viewState === ViewType.DESKTOP) {
        removeElems(document.querySelector(`#mobile-menu`),
                    document.querySelector(`#search-input`));
    } else {
        removeElems(document.querySelector(`#sort`),
                    document.querySelector(`#search-wrap`),
                    document.querySelector(`#sort-results`));
    }
};

const setMenuTypeStatus = (menuType: MenuType) => {
    if (menuType === MenuType.LIST) {
        appWrap.classList.add(`app--main`);
    } else {
        appWrap.classList.remove(`app--main`);
    }
};

export default class MenuController extends Controller {
    private data: Menu;
    private menuModel: MenuModel;
    private menuType: MenuType;

    constructor(viewState: ViewType, menuType: MenuType) {
        super(viewState);
        this.menuType = menuType;
    }

    public async init() {
        this.menuModel = new MenuModel();
        this.data = await this.menuModel.getData();
        const menuView = new MenuView(this.data, this.viewState, this.menuType);
        appWrap.appendChild(menuView.render());
        setMenuTypeStatus(this.menuType);
        this.bind();
    }

    public resize(viewState: ViewType): void {
        this.viewState = viewState;
        this.bind(false);
        toggleOverlay(false);
        removeMenuElems(viewState);
        const menuView: MenuView = new MenuView(this.data, viewState, this.menuType, true);
        appWrap.insertBefore(menuView.render(false), document.querySelector(`#inner`));
        this.bind();
    }

    public changeMenuType(menuType: MenuType, viewState: ViewType): void {
        this.menuType = menuType;
        setMenuTypeStatus(this.menuType);
        this.bind(false);
        const menuView = new MenuView(this.data, this.viewState, menuType);
        appWrap.innerHTML = ``;
        appWrap.appendChild(menuView.render());
        this.bind();
        this.viewState = viewState;
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
                    logoutBtn.addEventListener(`click`, this.onLogoutClick);
                } else {
                    logoutBtn.removeEventListener(`click`, this.onLogoutClick);
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
        // Todo make logout
    }

    private onAddPostClick = (e: Event): void => {
        e.preventDefault();
        hideMenu();
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
    }

    private onLoginClick = (e: Event): void => {
        e.preventDefault();
        hideMenu();
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
    }

    private onSignUpClick = (e: Event): void => {
        e.preventDefault();
        hideMenu();
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
    }

    private onMenuHideClick = (): void => {
        hideMenu();
    }

    private onMenuShowClick = (): void => {
        showMenu();
    }

    private onBackClick = (): void => {
        history.back();
    }

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
