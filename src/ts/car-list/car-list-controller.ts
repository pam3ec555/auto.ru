import CarListView from './car-list-view';
import {Car, CarPhotos} from '../car/car';
import {bindElem, findAncestor, getSearchVars, pushUrl, setClass, ViewType} from '../util';
import Controller from '../controller';
import Model from '../model';
import DefaultAdapter from '../default-adapter';
import {Data} from './car-list';
import App from '../app';
import Timer = NodeJS.Timer;

const SCROLL_TIMEOUT: number = 100;
let timer: number|Timer  = 0;

const adapter = new class extends DefaultAdapter {
    public preprocess(data: Data): Data {
        const preprocessed: Data = (Object as any).assign({}, data);
        preprocessed.data.forEach((car: Car, index: number) => {
            const photos: {
                [name: number]: CarPhotos
            } = car.photos;
            preprocessed.data[index].photos = [];

            for (const key in photos) {
                preprocessed.data[index].photos.push(photos[key]);
            }
        });

        return preprocessed;
    }
}();

const setDataBySearch = (): void => {
    const sortWrap: HTMLElement = document.querySelector(`#sort`);

    if (sortWrap) {
        const searchVars = getSearchVars();

        if (searchVars.search) {
            const searchInput: HTMLInputElement = document.querySelector(`#search-input`);

            if (searchInput) {
                searchInput.value = decodeURI(searchVars.search);
            }

            delete searchVars.search;
        }

        for (const key in searchVars) {
            if (searchVars[key]) {
                const sortInput: HTMLInputElement = sortWrap.querySelector(`#sort-${key}`);

                if (sortInput) {
                    sortInput.value = decodeURI(searchVars[key]);

                    if (key === `brand` || key === `model`) {
                        sortInput.setAttribute(`data-autocomplete-old-value`, decodeURI(searchVars[key]));
                    }
                }
            }
        }
    }
};

export default class CarListController extends Controller {
    private model: Model;
    private view: CarListView;

    constructor(viewState: ViewType) {
        super(viewState);
    }

    public async init() {
        this.model = new Model();

        if (!App.carListData) {
            App.carListData = await this.model.load(`/cars-api/cars${location.search}`, {}, adapter);
        }

        this.view = new CarListView(App.carListData);
        const contentBlock: HTMLElement = document.querySelector(`#inner`);

        if (contentBlock) {
            contentBlock.appendChild(this.view.render());
            setDataBySearch();
            this.bind();
        }
    }

    protected bind(bind: boolean = true): void {
        this.bindPostsClicks(bind);

        if (this.viewState === ViewType.DESKTOP) {
            const inner: HTMLElement = document.querySelector(`#inner`);

            if (inner) {
                bindElem(inner, `scroll`, this.onInnerScroll, bind);
            }
        } else {
            bindElem(window, `scroll`, this.onWindowScroll, bind);
        }
    }

    private bindPostsClicks = (bind: boolean = true): void => {
        const carLinksSelector: string = (bind) ? `.content-link.content-link--new` : `.content-link`;
        const carLinks: NodeListOf<HTMLHRElement> = document.querySelectorAll(carLinksSelector);

        if (carLinks.length > 0) {
            (Array as any).from(carLinks).forEach((item: HTMLHRElement): void => {
                bindElem(item, `click`, this.onCardClick, bind);

                if (bind) {
                    setClass(item, `content-link--new`, false);
                }
            });
        }
    }

    private getNextData = async () => {
        const content: HTMLElement = document.querySelector(`#content`);

        if (content && App.carListData.skip + App.carListData.limit <= App.carListData.total) {
            if (App.carListData.skip === 0) {
                App.carListData.skip = App.carListData.limit;
            } else {
                App.carListData.skip += App.carListData.limit;
            }

            const search = (location.search !== ``) ?
                `${location.search}&skip=${App.carListData.skip}` :
                `?skip=${App.carListData.skip}`;
            const data: Data = await this.model.load(`/cars-api/cars${search}`, {}, adapter);
            App.carListData.data = App.carListData.data.concat([...data.data]);
            const nextFrag = this.view.getNextCars(data);
            content.appendChild(nextFrag);
            this.bindPostsClicks();
        }
    }

    private onInnerScroll = (e: Event): void => {
        clearTimeout((timer as number));
        timer = setTimeout(() => {
            const target = e.target as HTMLElement;

            if (target.scrollTop + target.getBoundingClientRect().height === target.scrollHeight) {
                this.getNextData();
            }
        }, SCROLL_TIMEOUT);
    }

    private onWindowScroll = (e: Event): void => {
        clearTimeout((timer as number));
        timer = setTimeout(() => {
            if (window.pageYOffset + window.innerHeight > document.body.getBoundingClientRect().height) {
                this.getNextData();
            }
        }, SCROLL_TIMEOUT);
    }

    private onCardClick = (e: Event): void => {
        e.preventDefault();
        let target = e.target as HTMLHRElement|HTMLElement;

        if (!target.classList.contains(`content-link`)) {
            target = findAncestor(target, `content-link`);
        }

        pushUrl(target.getAttribute(`href`));
    }
}
