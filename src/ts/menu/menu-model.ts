import {Menu, NavData, UserData} from './menu';
import Model from "../model";

export const navData: Array<NavData> = [
    {
        link: `/add-post`,
        name: `Добавить объявление`,
        id: `add-post`
    }
];

export default class MenuModel extends Model {
    private userData: UserData;
    private menuData: Menu;

    public async getData() {
        this.userData = await this.getUser();

        return {
            navData,
            userData: this.userData
        };
    }

    private getUser(): any {
        return fetch(`/authentication-api`)
            .then((res: Response) => {
                return res.json();
            })
            .then((user: UserData): UserData => {
                return user;
            })
            .catch(() => {
                return new Object();
            });
    }
}
