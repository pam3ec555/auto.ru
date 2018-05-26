import AddPostView from './add-post-view';
import App from '../app';
import {UserData} from "../menu/menu";
import CarActionController from '../car-action/car-action-controller';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

export default class AddPostController extends CarActionController {
    public init(): void {
        const userData: UserData = App.userData;
        const addPostView: AddPostView = new AddPostView(userData);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(addPostView.render());
            AutoComplete(this.autocompleteSettings);
            this.bind();
        }
    }
}
