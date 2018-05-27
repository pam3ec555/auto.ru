import Model from '../model';
import CarAdapter from '../car-adapter';
import EditView from './edit-view';
import {Car} from '../car/car';
import CarActionController from '../car-action/car-action-controller';
import AccessErrorView from '../errors/access-error/access-error-view';
import {UserData} from '../menu/menu';
import App from '../app';
import NotFoundView from '../errors/not-found/not-found-view';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

export default class EditController extends CarActionController {
    public async init() {
        const model: Model = new Model();
        const adapter: CarAdapter = new CarAdapter();
        const data: Car = await model.load(`/cars-api/${location.pathname.slice(1)}`, {}, adapter);
        const userData: UserData = App.userData;
        let view: EditView|AccessErrorView|NotFoundView;

        if (!data) {
            view = new NotFoundView();
        } else if (!userData) {
            view = new AccessErrorView(`Вам запрещен доступ на редактирование этого объявления!`);
        } else {
            view = new EditView(data, this.carCharacteristics);
        }

        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(view.render());
            if (userData && data) {
                AutoComplete(this.autocompleteSettings);
                this.bind();
            }
        }
    }
}
