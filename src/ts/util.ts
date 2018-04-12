export const createElement = (template: string): HTMLElement => {
    const outer = document.createElement(`div`);
    outer.innerHTML = template;
    return outer;
};

export enum KeyCode {
    ENTER = 13,
    ESC = 27
}