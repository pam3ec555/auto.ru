import {ViewType} from './util';

export default abstract class Controller {
    protected viewState: ViewType;

    constructor(viewState: ViewType) {
        this.viewState = viewState;
    }
}
