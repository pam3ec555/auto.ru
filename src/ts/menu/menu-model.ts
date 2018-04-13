import MenuView from './menu-view';
import {navData, userData} from '../data';
import {MenuData} from './menu-data';

const data: MenuData = {
    navData,
    userData
};

export default class MenuModel {
    public init(): void {
        const appWrap: HTMLElement = document.querySelector(`#app`);
        const menuView = new MenuView(data);
        appWrap.appendChild(menuView.render());
        menuView.bind();
    }
}