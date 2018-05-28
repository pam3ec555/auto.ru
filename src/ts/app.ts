import MenuController from './menu/menu-controller';
import CarListController from './car-list/car-list-controller';
import CarController from './car/car-controller';
import RegistryController from './registry/registry-controller';
import LoginController from './login/login-controller';
import AddPostController from './add-post/add-post-controller';
import {MenuType, ViewType, ViewTypeWidths} from './util';
import {UserData} from './menu/menu';
import EditController from './edit/edit-controller';
import NotFoundController from './errors/not-found/not-found-controller';
import {Car} from './car/car';
import {Data} from './car-list/car-list';

enum ControllerID {
    CAR_LIST = 'car-list',
    CAR = 'car',
    REGISTRY = 'registry',
    LOGIN = 'login',
    ADD_POST = 'add-post',
    EDIT = 'edit',
    NOT_FOUND = 'not-found'
}

type Routes = {
    [name: string]: any
};

const getRoute = (): string => {
    const path: string = location.pathname;
    const pathChunks: Array<string> = path.slice(1).split(`/`);
    let route: ControllerID;

    if ((pathChunks.length === 1 && (pathChunks[0] === `cars` || pathChunks[0] === ``)) ||
        (pathChunks.length === 2 && pathChunks[1] === `` && (pathChunks[0] === `cars` || pathChunks[0] === ``))) {
        route = ControllerID.CAR_LIST;
    } else if (pathChunks.length === 2 && pathChunks[0] === `cars`) {
        route = ControllerID.CAR;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.ADD_POST) {
        route = ControllerID.ADD_POST;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.LOGIN) {
        route = ControllerID.LOGIN;
    } else if (pathChunks.length === 1 && pathChunks[0] === ControllerID.REGISTRY) {
        route = ControllerID.REGISTRY;
    } else if (pathChunks.length === 2 && pathChunks[0] === ControllerID.EDIT) {
        route = ControllerID.EDIT;
    } else {
        route = ControllerID.NOT_FOUND;
    }

    return route;
};

const getMenuType = (): MenuType => {
    return (getRoute() === ControllerID.CAR_LIST) ? MenuType.LIST : MenuType.OTHER;
};

const calcViewState = (): ViewType => {
    let viewState: ViewType;

    if (window.innerWidth >= ViewTypeWidths.DESKTOP) {
        viewState = ViewType.DESKTOP;
    } else {
        viewState = ViewType.MOBILE;
    }

    return viewState;
}

export default new class App {
    private viewState: ViewType = calcViewState();
    private _carListData: Data;
    private _lastScrollTop: number = 0;
    private _prevLocationSearch: string = ``;
    private prevRoute: Routes;
    private menu: MenuController;
    private _userData: UserData;
    private routes: Routes = {
        [ControllerID.CAR_LIST]: new CarListController(this.viewState),
        [ControllerID.CAR]: new CarController(),
        [ControllerID.REGISTRY]: new RegistryController(),
        [ControllerID.LOGIN]: new LoginController(),
        [ControllerID.ADD_POST]: new AddPostController(),
        [ControllerID.EDIT]: new EditController(),
        [ControllerID.NOT_FOUND]: new NotFoundController()
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

    public set lastScrollTop(top: number) {
        this._lastScrollTop = top;
    }

    public get lastScrollTop(): number {
        return this._lastScrollTop;
    }

    public get userData(): UserData {
        return this._userData;
    }

    public get carListData(): Data {
        return this._carListData;
    }

    public set carListData(data: Data) {
        this._carListData = data;
    }

    private changeController(): void {
        if (this.prevRoute) {
            this.prevRoute.destroy(this.viewState);
        }

        const route: string = getRoute();

        if (route === ControllerID.CAR_LIST) {
            if (location.search !== this._prevLocationSearch) {
                this._carListData = null;
                this._prevLocationSearch = location.search;
            }
        }

        this.prevRoute = this.routes[route];
        this.routes[route].init();
    }

    private async init() {
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
            this.viewState = calcViewState();
            if (prevViewState !== this.viewState) {
                this.menu.resize(this.viewState);
            }
        });
    }
}();
