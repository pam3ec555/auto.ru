import {createElement} from "./util";

export default abstract class View {
    protected get template(): string {
        throw new Error(`You have to define template for view`);
    }

    private render(): HTMLElement {
        return createElement(this.template);
    }

    protected bind(): void {

    }
}