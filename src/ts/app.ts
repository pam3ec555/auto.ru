//TODO see http://autocomplete-js.com/

import MenuModel from './menu/menu-model';

enum ControllerID {
    CAR_LIST = '',
}

class App {
    constructor() {
        this.init();
    }

    private showCarList(): void {
        location.hash = ControllerID.CAR_LIST;
    }

    private changeController(route: string = ``): void {

    }

    private init(): void {
        const menu = new MenuModel();
        menu.init();
    }
}

export default new App();