import {createElement} from './util';

export default abstract class View {
    protected block: HTMLElement;

    protected get template(): string {
        throw new Error(`You have to define template for view`);
    }

    public render(): HTMLElement {
        return createElement(this.template);
    }

    public bind(): void {

    }
}