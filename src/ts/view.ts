import {createElement} from './util';

export default abstract class View {
    protected data: any;

    constructor(data: any) {
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

    public render(): HTMLElement {
        this.clearInner();
        return createElement(this.template);
    }
}