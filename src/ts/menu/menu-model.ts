import {navData, userData} from '../data';
import {IMenu} from './menu';

export default class MenuModel {
    private menuData: IMenu = {
        navData,
        userData
    };

    public get data(): IMenu {
        return this.menuData;
    }
}