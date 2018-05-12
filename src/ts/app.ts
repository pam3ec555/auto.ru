// TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';
import {MenuType, ViewType, ViewTypeWidths} from './util';

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

const getRoute = () => {
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

class App {
    private viewState: ViewType;
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

    private changeController(): void {
        this.routes[getRoute()].init();
    }

    private calcViewState(): void {
        if (window.innerWidth >= ViewTypeWidths.DESKTOP) {
            this.viewState = ViewType.DESKTOP;
        } else {
            this.viewState = ViewType.MOBILE;
        }
    }

    private init(): void {
        this.calcViewState();
        const menu: MenuController = new MenuController(this.viewState, getMenuType());
        menu.init();
        this.changeController();

        window.addEventListener(`popstate`, () => {
            menu.changeMenuType(getMenuType(), this.viewState);
            this.changeController();
        });

        window.addEventListener(`resize`, () => {
            const prevViewState = this.viewState;
            this.calcViewState();
            if (prevViewState !== this.viewState) {
                menu.resize(this.viewState);
            }
        });
    }
}

export default new App();
