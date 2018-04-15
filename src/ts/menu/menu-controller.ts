import MenuModel from './menu-model';
import MenuView from './menu-view';
import Controller from '../controller';
import {toggleOverlay} from '../util';

export default class MenuController extends Controller {
    public init(): void {
        const menuModel: MenuModel = new MenuModel();
        const data = menuModel.data;
        const appWrap: HTMLElement = document.querySelector(`#app`);
        const menuView = new MenuView(data);
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