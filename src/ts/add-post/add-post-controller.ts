import AddPostView from './add-post-view';
import App from '../app';
import {UserData} from "../menu/menu";
import CarActionController from '../car-action/car-action-controller';
import AccessErrorView from '../errors/access-error/access-error-view';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

export default class AddPostController extends CarActionController {
    public init(): void {
        const userData: UserData = App.userData;
        const view: AddPostView|AccessErrorView = (userData) ?
            new AddPostView(userData) :
            new AccessErrorView(`Для добавления объявления вам необходимо авторизироваться!`);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(view.render());

            if (userData) {
                AutoComplete(this.autocompleteSettings);
                this.bind();
            }
        }
    }
}
