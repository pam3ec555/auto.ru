import {Menu, NavData, UserData} from './menu';
import Model from '../model';
import {Car, CarPhotos} from "../car/car";
import DefaultAdapter from "../default-adapter";

export const navData: Array<NavData> = [
    {
        link: `/add-post`,
        name: `Добавить объявление`,
        id: `add-post`
    }
];

const adapter = new class extends DefaultAdapter {
    public preprocess(data: {
        user: UserData,
        iat: number
    }): UserData {
        return data.user;
    }
}();

export default class MenuModel extends Model {
    private userData: UserData;
    private menuData: Menu;

    public async getData() {
        if (!this.userData) {
            this.userData = await this.getUser();
        }

        return {
            navData,
            userData: this.userData
        };
    }

    private getUser(): any {
        const headers: Headers = new Headers();
        const userToken: string = localStorage.getItem(`user-token`);
        if (userToken) {
            headers.append(`authorization`, userToken);
        }

        const options: object = {
            headers
        };

        return this.load(`/authentication-api`, options, adapter)
            .catch(() => {
                return null;
            });
    }
}
