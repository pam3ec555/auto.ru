import Controller from '../../controller';
import NotFoundView from './not-found-view';

export default class NotFoundController extends Controller {
    public init(): void {
        const view: NotFoundView = new NotFoundView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(view.render());
        }
    }
}
