//TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';

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

class App {
    constructor() {
        this.init();
    }

    private routes: Routes = {
        [ControllerID.CAR_LIST]: new CarListController(),
        [ControllerID.CAR]: new CarController(),
        [ControllerID.REGISTRY]: new RegistryController(),
        [ControllerID.LOGIN]: new LoginController(),
        [ControllerID.ADD_POST]: new AddPostController()
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

    private init(): void {
        const menu: MenuController = new MenuController();
        menu.init();
        this.changeController(getControllerIDFromHash(location.hash));
        window.addEventListener(`hashchange`, () => {
            this.changeController(getControllerIDFromHash(location.hash));
        });
    }
}

export default new App();