//TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';
import {MenuType, ViewType, ViewTypeWidths} from './util';

enum ControllerID {
    CAR_LIST = '',
    CAR = 'car',
    REGISTRY = 'registry',
    LOGIN = 'login',
    ADD_POST = 'add'
}

interface Routes {
    [name: string]: any
}

const getControllerIDFromHash = (hash: string): string => {
    return hash.replace(`#`, ``);
};

const getMenuType = (): MenuType => {
    return (location.hash === ControllerID.CAR_LIST) ? MenuType.LIST : MenuType.OTHER;
};

class App {
    private menu: MenuController;
    private viewState: ViewType;

    constructor() {
        this.init();
    }

    private routes: Routes = {
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

    private resizeView(route: string = ``): void {
        this.routes[route].resize(this.viewState);
    }

    private calcViewState(): void {
        if (window.innerWidth < ViewTypeWidths.TABLET) {
            this.viewState = ViewType.MOBILE;
        } else if (window.innerWidth >= ViewTypeWidths.DESKTOP) {
            this.viewState = ViewType.DESKTOP;
        } else {
            this.viewState = ViewType.TABLET;
        }
    }

    private init(): void {
        this.calcViewState();
        this.menu = new MenuController(this.viewState, getMenuType());
        this.menu.init();
        this.changeController(getControllerIDFromHash(location.hash));

        window.addEventListener(`hashchange`, () => {
            this.changeController(getControllerIDFromHash(location.hash));
            if (this.viewState !== ViewType.DESKTOP) {
                this.menu.changeMenuType(getMenuType());
            }
        });

        let timeout = 0;
        const RESIZE_TIMEOUT = 100;
        window.addEventListener(`resize`, () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const prevViewState = this.viewState;
                this.calcViewState();
                if (prevViewState !== this.viewState) {
                    this.menu.resize(this.viewState);
                    this.resizeView(getControllerIDFromHash(location.hash));
                }
            }, RESIZE_TIMEOUT);
        });
    }
}

export default new App();