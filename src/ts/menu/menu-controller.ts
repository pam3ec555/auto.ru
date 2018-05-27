import MenuModel from './menu-model';
import MenuView from './menu-view';
import {
    MenuType,
    toggleOverlay,
    ViewType,
    appWrap,
    pushUrl,
    hide,
    showBlock,
    getSearchVars,
    KeyCode, setClass, bindElem
} from '../util';
import {Menu} from './menu';
import Controller from '../controller';
import App from '../app';
import Validation from '../validation';
import Popup from '../popup';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

const autocompleteOptions = {
    EmptyMessage: `Нет результатов!`,
    _Open(): void {
        (Array as any).from(this.DOMResults.querySelectorAll(`li`)).forEach((li: HTMLLIElement) => {
            if (li.className !== `locked`) {
                li.onmousedown = () => {
                    this._Select(li);
                    hide(this.DOMResults);
                };
            }
        });
    },
    _Blur() {
        setTimeout(() => {
            hide(this.DOMResults);
        }, 100);
    },
    _Focus(): void {
        if (this.Input.id === `sort-model`) {
            const brandField = document.querySelector(`#sort-brand`);

            if (brandField) {
                const brandName = brandField.getAttribute(`data-autocomplete-old-value`);

                if (brandName !== ``) {
                    const modelApiUrl = `/cars-data-api/${brandName}`;
                    this.Input.setAttribute(`data-autocomplete`, modelApiUrl);
                }
            }
        }

        showBlock(this.DOMResults);
    },
    _Select(item: HTMLElement): void {
        if (item.hasAttribute(`data-autocomplete-value`)) {
            this.Input.value = item.getAttribute(`data-autocomplete-value`);
        } else {
            this.Input.value = item.innerHTML;
        }

        this.Input.setAttribute(`data-autocomplete-old-value`, this.Input.value);
        this._Blur();
    }
};

const getSearchString = (obj: {
    [name: string]: string
}): string => {
    let searchString: string = `/cars`;

    if (Object.keys(obj).length > 0) {
        searchString += `?`;

        for (const key in obj) {
            const val = obj[key];
            searchString += `${key}=${val}&`;
        }

        searchString = searchString.substring(0, searchString.length - 1);
    }

    return searchString;
};

const hideMenu = (): void => {
    const menu: HTMLElement = document.querySelector(`#mobile-menu`);

    if (menu) {
        setClass(menu, `m-menu--hidden`);
        toggleOverlay(false);
    }
};

const showMenu = (): void => {
    const menu: HTMLElement = document.querySelector(`#mobile-menu`);

    if (menu) {
        setClass(menu, `m-menu--hidden`, false);
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

const findBySearch = (): void => {
    const searchInput: HTMLInputElement = document.querySelector(`#search-input`);

    if (searchInput) {
        const value = searchInput.value.trim();
        const searchParams = getSearchVars();

        if (value !== ``) {
            searchParams.search = value;
        } else {
            delete searchParams.search;
        }

        pushUrl(getSearchString(searchParams));
    }
};

const setMenuTypeStatus = (menuType: MenuType) => {
    if (menuType === MenuType.LIST) {
        setClass(appWrap, `app--main`);
    } else {
        setClass(appWrap, `app--main`, false);
    }
};

const sortSubmit = (): void => {
    const validation: Validation = new Validation();
    const popup: Popup = new Popup();
    const sortByObj: {
        [name: string]: string
    } = {};
    const sortBrand: HTMLInputElement = document.querySelector(`#sort-brand`);

    if (sortBrand) {
        if (validation.validateEmpty(sortBrand.value)) {
            sortByObj.brand = sortBrand.value;
        }
    }

    const sortModel: HTMLInputElement = document.querySelector(`#sort-model`);

    if (sortModel) {
        if (validation.validateEmpty(sortModel.value)) {
            sortByObj.model = sortModel.value;
        }
    }

    const sortYear: HTMLInputElement = document.querySelector(`#sort-year`);

    if (sortYear) {
        if (validation.validateEmpty(sortYear.value)) {
            if (validation.validateYear(sortYear.value)) {
                sortByObj.year = sortYear.value;
            } else {
                popup.alert(`Вы не правильно заполнили год при сортировке!`);
            }
        }
    }

    const sortPrice: HTMLInputElement = document.querySelector(`#sort-price`);

    if (sortPrice) {
        if (validation.validateEmpty(sortPrice.value)) {
            if (validation.validateNum(sortPrice.value)) {
                sortByObj.price = sortPrice.value;
            } else {
                popup.alert(`Вы не правильно заполнили цену при сортировке!`);
            }
        }
    }

    const sortMileage: HTMLInputElement = document.querySelector(`#sort-mileage`);

    if (sortMileage) {
        if (validation.validateEmpty(sortMileage.value)) {
            if (validation.validateNum(sortMileage.value)) {
                sortByObj.mileage = sortMileage.value;
            } else {
                popup.alert(`Вы не правильно заполнили пробег при сортировке!`);
            }
        }
    }

    const searchParams = getSearchVars();
    let sortParams = getSearchString(sortByObj);

    if (searchParams.search) {
        const ampersand = (Object.keys(sortByObj).length > 0) ? `&` : `?`;
        sortParams += `${ampersand}search=${searchParams.search}`;
    }

    toggleOverlay(false);
    pushUrl(sortParams);
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
        AutoComplete(autocompleteOptions);
        this.bind();
    }

    public destroy() {
        this.bind(false);
        appWrap.innerHTML = ``;
    }

    public resize(viewState: ViewType): void {
        this.viewState = viewState;
        toggleOverlay(false);
        removeMenuElems(viewState);
        const menuView: MenuView = new MenuView(this.data, viewState, this.menuType, true);
        appWrap.insertBefore(menuView.render(false), document.querySelector(`#inner`));
        AutoComplete(autocompleteOptions);
        this.bind();
    }

    public changeMenuType(menuType: MenuType, viewState: ViewType): void {
        this.menuType = menuType;
        setMenuTypeStatus(this.menuType);
        const menuView = new MenuView(this.data, this.viewState, menuType);
        appWrap.innerHTML = ``;
        appWrap.appendChild(menuView.render());
        AutoComplete(autocompleteOptions);
        this.bind();
        this.viewState = viewState;
    }

    public get menuData() {
        return this.data;
    }

    protected bind(bind: boolean = true): void {
        const menuShowBtn: HTMLButtonElement = document.querySelector(`#menu-show`);
        const menuHideBtn: HTMLButtonElement = document.querySelector(`#menu-hide`);
        const searchInput: HTMLInputElement = document.querySelector(`#search-input`);
        const searchBtn: HTMLButtonElement = document.querySelector(`#search-btn`);
        const addPostBtn: HTMLHRElement = document.querySelector(`#add-post`);
        const backBtn: HTMLHRElement = document.querySelector(`#back-btn`);
        const sortSumit: HTMLButtonElement = document.querySelector(`#sort-submit`);
        const searchSubmit: HTMLButtonElement = document.querySelector(`#search-submit`);

        if (menuShowBtn) {
            bindElem(menuShowBtn, `click`, this.onMenuShowClick, bind);
        }

        if (menuHideBtn) {
            bindElem(menuHideBtn, `click`, this.onMenuHideClick, bind);
        }

        if (this.viewState === ViewType.MOBILE && searchBtn && searchInput) {
            bindElem(searchBtn, `click`, this.onSearchToggle, bind);
            bindElem(searchInput, `blur`, this.onSearchToggle, bind);
            bindElem(searchInput, `keydown`, this.onSearchSubmit, bind);
        } else if (this.viewState === ViewType.DESKTOP && searchInput) {
            bindElem(searchInput, `keydown`, this.onSearchSubmit, bind);
        }

        if (addPostBtn) {
            bindElem(addPostBtn, `click`, this.onAddPostClick, bind);
        }

        if (backBtn) {
            bindElem(backBtn, `click`, this.onBackClick, bind);
        }

        if (sortSumit) {
            bindElem(sortSumit, `click`, this.onSortSubmit, bind);
        }

        if (searchSubmit) {
            bindElem(searchSubmit, `click`, this.onSearchSubmit, bind);
        }

        this.bindLogLinks(bind);
    }

    private bindLogLinks(bind: boolean = true): void {
        if (this.data.userData) {
            const logoutBtn: HTMLButtonElement = document.querySelector(`#log-out`);

            if (logoutBtn) {
                bindElem(logoutBtn, `click`, this.onLogoutClick, bind);
            }
        } else {
            const loginBtn: HTMLHRElement = document.querySelector(`#log-in`);
            const signUpBtn: HTMLHRElement = document.querySelector(`#sign-up`);

            if (loginBtn) {
                bindElem(loginBtn, `click`, this.onLoginClick, bind);
            }

            if (signUpBtn) {
                bindElem(signUpBtn, `click`, this.onSignUpClick, bind);
            }
        }
    }

    private onSearchSubmit = (e: Event): void => {
        if ((e.target as HTMLInputElement|HTMLButtonElement).id === `search-input`) {
            if ((e as any).keyCode === KeyCode.ENTER) {
                findBySearch();
            }
        } else {
            findBySearch();
        }
    }

    private onSortSubmit = (e: Event): void => {
        e.preventDefault();
        sortSubmit();
    }

    private onLogoutClick = (): void => {
        localStorage.removeItem(`user-token`);
        toggleOverlay(false);
        history.pushState({}, '', `/`);
        App.replaceAuthStatus();
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

    private onBackClick = (e: Event): void => {
        e.preventDefault();
        pushUrl((e.target as HTMLHRElement).getAttribute(`href`));
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
            searchBtn.disabled = false;
        }
    }
}
