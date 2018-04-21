import {ViewType} from './util';

export default class Controller {
    protected viewState: ViewType;

    constructor(viewState: ViewType) {
        this.viewState = viewState;
    }
}