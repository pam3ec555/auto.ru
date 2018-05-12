import {Menu, NavData, UserData} from './menu';

export const navData: Array<NavData> = [
    {
        link: `/add-post`,
        name: `Добавить объявление`,
        id: `add-post`
    }
];

const userData: UserData = {
    // Todo refactor this
};

export default class MenuModel {
    private menuData: Menu = {
        navData,
        userData
    };

    public get data(): Menu {
        return this.menuData;
    }
}
