//TODO see http://autocomplete-js.com/

import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';

enum ControllerID {
    CAR_LIST = '',
    CAR = 'car'
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
        [ControllerID.CAR]: new CarController()
    };

    public showCarList(): void {
        location.hash = ControllerID.CAR_LIST;
    }

    public showCar(): void {
        location.hash = ControllerID.CAR;
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