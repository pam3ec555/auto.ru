import {createElement} from "./util";

export default abstract class View {
    protected get template(): string {
        throw new Error(`You have to define template for view`);
    }

    public render(): HTMLElement {
        return createElement(this.template);
    }

    protected bind(): void {

    }
}