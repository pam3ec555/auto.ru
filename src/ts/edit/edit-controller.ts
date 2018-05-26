import Controller from '../controller';
import {autocompleteSettings, ViewType} from '../util';
import Model from '../model';
import CarAdapter from '../car-adapter';
import EditView from './edit-view';
import {Car} from '../car/car';

declare const require: any;

const AutoComplete = require(`autocomplete-js`);

export default class EditController extends Controller {
    private model: Model;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        this.model = new Model();
        const adapter: CarAdapter = new CarAdapter();
        const data: Car = await this.model.load(`/cars-api/${location.pathname.slice(1)}`, {}, adapter);
        const editView: EditView = new EditView(data);

        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(editView.render());
            AutoComplete(autocompleteSettings);
            this.bind();
        }
    }

    protected bind(): void {
        const
    }
}
