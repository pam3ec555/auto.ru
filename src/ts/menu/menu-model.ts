import {Menu, NavData, UserData} from './menu';
import Model from '../model';
import DefaultAdapter from "../default-adapter";

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

        const navData: Array<NavData> = (this.userData) ?
            [
                {
                    link: `/add-post`,
                    name: `Добавить объявление`,
                    id: `add-post`
                }
            ] :
            [];

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
