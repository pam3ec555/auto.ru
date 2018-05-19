import {ViewType} from './util';

export default abstract class Controller {
    protected viewState: ViewType;

    constructor(viewState: ViewType) {
        this.viewState = viewState;
    }

    public destroy(): void {
        this.bind(false);
    }

    protected bind(bind: boolean = true) {
        //
    }
}
