import Controller from '../controller';
import AddPostView from './add-post-view';

export default class AddPostController extends Controller {
    public init(): void {
        const addPostView: AddPostView = new AddPostView();
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(addPostView.render());
            this.bind();
        }
    }
}