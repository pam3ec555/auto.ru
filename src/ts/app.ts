//TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';
import {MenuType, ViewType, ViewTypeWidths} from './util';
import Timer = NodeJS.Timer;

enum ControllerID {
    CAR_LIST = '',
    CAR = 'car',
    REGISTRY = 'registry',
    LOGIN = 'login',
    ADD_POST = 'add'
}

interface IRoutes {
    [name: string]: any
}

const getControllerIDFromHash = (hash: string): string => {
    return hash.replace(`#`, ``);
};

const getMenuType = (): MenuType => {
    return (location.hash === ControllerID.CAR_LIST) ? MenuType.LIST : MenuType.OTHER;
};

class App {
    private viewState: ViewType;

    constructor() {
        this.init();
    }

    private routes: IRoutes = {
        [ControllerID.CAR_LIST]: new CarListController(this.viewState),
        [ControllerID.CAR]: new CarController(this.viewState),
        [ControllerID.REGISTRY]: new RegistryController(this.viewState),
        [ControllerID.LOGIN]: new LoginController(this.viewState),
        [ControllerID.ADD_POST]: new AddPostController(this.viewState)
    };

    public showCarList(): void {
        location.hash = ControllerID.CAR_LIST;
    }

    public showCar(): void {
        location.hash = ControllerID.CAR;
    }

    public showRegistry(): void {
        location.hash = ControllerID.REGISTRY;
    }

    public showLogin(): void {
        location.hash = ControllerID.LOGIN;
    }

    public showAddingPost(): void {
        location.hash = ControllerID.ADD_POST;
    }

    private changeController(route: string = ``): void {
        this.routes[route].init();
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
        this.changeController(getControllerIDFromHash(location.hash));

        window.addEventListener(`hashchange`, () => {
            menu.changeMenuType(getMenuType(), this.viewState);
            this.changeController(getControllerIDFromHash(location.hash));
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