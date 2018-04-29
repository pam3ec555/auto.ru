import RegistryView from './registry-view';
import {ViewType} from '../util';
import Controller from '../controller';

export default class RegistryController extends Controller{
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(): void {
        const registryView: RegistryView = new RegistryView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(registryView.render());
        }
        this.bind();
    }

    private bind(): void {
        //Todo add events for registry
    }
}