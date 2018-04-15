import Controller from '../controller';
import RegistryView from './registry-view';

export default class RegistryController extends Controller {
    public init(): void {
        const registryView: RegistryView = new RegistryView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(registryView.render());
        }
        this.bind();
    }

    protected bind(): void {
        //Todo add events for registry
    }
}