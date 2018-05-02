import {createElement} from './util';

export default abstract class View {
    protected readonly data: any;

    constructor(data: any = {}) {
        this.data = data;
    }

    protected get template(): string {
        throw new Error(`You have to define template for view`);
    }

    private clearInner(): void {
        const inner: HTMLElement = document.querySelector(`#inner`);

        if (inner) {
            inner.innerHTML = ``;
        }
    }

    /**
     * Render template
     * @param {boolean} clean - clean inner
     * @returns {DocumentFragment}
     */
    public render(clean: boolean = true): DocumentFragment {
        if (clean) {
            this.clearInner();
        }

        return createElement(this.template);
    }
}