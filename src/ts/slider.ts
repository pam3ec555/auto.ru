import {bindElem} from './util';

type SliderOptions = {

};

export default class Slider {
    private readonly selector: string;
    private readonly list: HTMLUListElement;
    private readonly listWidths: number;
    private readonly listViewsCount: number;
    private currentListView: number = 1;
    private readonly container: HTMLElement;
    private readonly options: SliderOptions;
    private readonly previewImage: HTMLImageElement;
    private currentId: number;
    private readonly totalImages: number;

    constructor(selector: string, options: SliderOptions = {}) {
        const container: HTMLElement = document.querySelector(selector);

        if (container) {
            this.selector = selector;
            this.container = container;
            this.options = options;
            this.previewImage = document.querySelector(`${selector} .slider__preview`);
            this.totalImages = document.querySelectorAll(`${selector} .slider__item`).length;
            this.list = document.querySelector(`${selector} .slider__list`);
            this.listWidths = this.list.getBoundingClientRect().width;
            const sliderWidths: number = this.list.parentElement.getBoundingClientRect().width;
            this.listViewsCount = Math.ceil(this.listWidths / sliderWidths);
        } else {
            throw new Error(`Couldn't find slider wrapper by selector "${selector}"`);
        }
    }

    public init = (): void => {
        this.setPreview();
        this.bind();
    }

    public destroy = (): void => {
        this.bind(false);
    }

    private setPreview = (id: number = 0): void => {
        const image: HTMLImageElement = document.querySelector(`${this.selector} .slider__img[data-id="${id}"]`);

        if (image && this.previewImage) {
            this.previewImage.src = image.src;
            this.previewImage.setAttribute(`data-id`, id.toString());
            this.currentId = id;
        }
    }

    private bind = (bind: boolean = true): void => {
        const prevPreviewBtn = document.querySelector(`${this.selector} .slider__btn--prev.slider__btn--preview`);
        const nextPreviewBtn = document.querySelector(`${this.selector} .slider__btn--next.slider__btn--preview`);

        if (nextPreviewBtn && prevPreviewBtn) {
            bindElem(prevPreviewBtn, `click`, this.onPrevPreviewClick, bind);
            bindElem(nextPreviewBtn, `click`, this.onNextPreviewClick, bind);
        }

        if (this.list) {
            bindElem(this.list, `click`, this.onListClick, bind);
        }

        if (this.listViewsCount > 1) {
            const nextListView = document.querySelector(`${this.selector} .slider__btn--next.slider__btn--list`);
            const prevListView = document.querySelector(`${this.selector} .slider__btn--prev.slider__btn--list`);

            if (nextListView && prevListView) {
                bindElem(nextListView, `click`, this.onNextListViewCLick, bind);
                bindElem(prevListView, `click`, this.onPrevListViewCLick, bind);
            }
        }
    }

    private restateList = (): void => {
        this.list.style.left = `-${(this.currentListView - 1) * 100}%`;
    }

    private onPrevListViewCLick = (): void => {
        if (this.currentListView === 1) {
            this.currentListView = this.listViewsCount;
        } else {
            this.currentListView--;
        }

        this.restateList();
    }

    private onNextListViewCLick = (): void => {
        if (this.currentListView === this.listViewsCount) {
            this.currentListView = 1;
        } else {
            this.currentListView++;
        }

        this.restateList();
    }

    private onPrevPreviewClick = (): void => {
        if (this.currentId !== 0) {
            this.setPreview(--this.currentId);
        } else {
            this.setPreview(this.totalImages - 1);
        }
    }

    private onNextPreviewClick = (): void => {
        if (this.currentId !== this.totalImages - 1) {
            this.setPreview(++this.currentId);
        } else {
            this.setPreview(0);
        }
    }

    private onListClick = (e: Event): void => {
        e.stopPropagation();
        const target: any = e.target;

        if (target.classList.contains(`slider__item`) || target.classList.contains(`slider__img`)) {
            const id: number = parseInt(target.getAttribute(`data-id`));

            if (typeof id !== `undefined` && id !== this.currentId) {
                this.setPreview(id);
            }
        }
    }
}
