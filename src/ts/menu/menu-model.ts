import {navData, userData} from '../data';
import {Menu} from './menu';

export default class MenuModel {
    private menuData: Menu = {
        navData,
        userData
    };

    public get data(): Menu {
        return this.menuData;
    }
}
