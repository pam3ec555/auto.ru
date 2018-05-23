// TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';
import {MenuType, ViewType, ViewTypeWidths} from './util';
import {UserData} from './menu/menu';

enum ControllerID {
    CAR_LIST = 'car-list',
    CAR = 'car',
    REGISTRY = 'registry',
    LOGIN = 'login',
    ADD_POST = 'add-post'
}

type Routes = {
    [name: string]: any
};

const getRoute = (): string => {
    const path: string = location.pathname;
    const pathChunks: Array<string> = path.slice(1).split(`/`);
    let route: ControllerID;

    if (pathChunks.length === 1 && (pathChunks[0] === `cars` || pathChunks[0] === ``)) {
        route = ControllerID.CAR_LIST;
    } else if (pathChunks.length === 2 && pathChunks[0] === `cars`) {
        route = ControllerID.CAR;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.ADD_POST) {
        route = ControllerID.ADD_POST;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.LOGIN) {
        route = ControllerID.LOGIN;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.REGISTRY) {
        route = ControllerID.REGISTRY;
    }

    return route;
};

const getMenuType = (): MenuType => {
    return (getRoute() === ControllerID.CAR_LIST) ? MenuType.LIST : MenuType.OTHER;
};

export default new class App {
    private viewState: ViewType;
    private prevRoute: Routes;
    private menu: MenuController;
    private _userData: UserData;
    private routes: Routes = {
        [ControllerID.CAR_LIST]: new CarListController(this.viewState),
        [ControllerID.CAR]: new CarController(this.viewState),
        [ControllerID.REGISTRY]: new RegistryController(this.viewState),
        [ControllerID.LOGIN]: new LoginController(this.viewState),
        [ControllerID.ADD_POST]: new AddPostController(this.viewState)
    };

    constructor() {
        this.init();
    }

    public async replaceAuthStatus() {
        this.routes[getRoute()].init();
        this.menu.destroy();
        this.menu = new MenuController(this.viewState, getMenuType());
        await this.menu.init();
        this._userData = this.menu.menuData.userData;
        this.changeController();
    }

    public get userData() {
        return this._userData;
    }

    private changeController(): void {
        if (this.prevRoute) {
            this.prevRoute.destroy();
        }

        const route: string = getRoute();
        this.prevRoute = this.routes[route];
        this.routes[route].init();
    }

    private calcViewState(): void {
        if (window.innerWidth >= ViewTypeWidths.DESKTOP) {
            this.viewState = ViewType.DESKTOP;
        } else {
            this.viewState = ViewType.MOBILE;
        }
    }

    private async init() {
        this.calcViewState();
        this.menu = new MenuController(this.viewState, getMenuType());
        await this.menu.init();
        this._userData = this.menu.menuData.userData;
        this.changeController();

        window.addEventListener(`popstate`, () => {
            this.menu.changeMenuType(getMenuType(), this.viewState);
            this.changeController();
        });

        window.addEventListener(`resize`, () => {
            const prevViewState = this.viewState;
            this.calcViewState();
            if (prevViewState !== this.viewState) {
                this.menu.resize(this.viewState);
            }
        });
    }
}();
