import {navData, userData} from '../data';
import {MenuData} from './menu-data';

export default class MenuModel {
    private menuData: MenuData = {
        navData,
        userData
    };

    public get data(): MenuData {
        return this.menuData;
    }
}