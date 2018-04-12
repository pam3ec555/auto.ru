import MenuView from "./menu-view";

export default class Menu {
    public init(): void {
        const appWrap: HTMLElement = document.querySelector(`#app`);
        const menuView = new MenuView();
        appWrap.appendChild(menuView.render());
    }
}