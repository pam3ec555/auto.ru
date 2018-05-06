import AddPostView from './add-post-view';
import {ViewType} from '../util';
import Controller from '../controller';

export default class AddPostController extends Controller {
    constructor(viewState: ViewType) {
        super(viewState);
    }

    public init(viewState: ViewType): void {
        const addPostView: AddPostView = new AddPostView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(addPostView.render());
        }
    }
}
