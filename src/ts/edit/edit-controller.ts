import Model from '../model';
import CarAdapter from '../car-adapter';
import EditView from './edit-view';
import {Car} from '../car/car';
import CarActionController from '../car-action/car-action-controller';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

export default class EditController extends CarActionController {
    private model: Model;

    public async init() {
        this.model = new Model();
        const adapter: CarAdapter = new CarAdapter();
        const data: Car = await this.model.load(`/cars-api/${location.pathname.slice(1)}`, {}, adapter);
        const editView: EditView = new EditView(data);

        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(editView.render());
            AutoComplete(this.autocompleteSettings);
            this.bind();
        }
    }
}
