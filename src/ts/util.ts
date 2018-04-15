export const createElement = (template: string): HTMLElement => {
    const outer: HTMLElement = document.createElement(`DIV`);
    outer.className = `wrapper`;
    outer.innerHTML = template;
    return outer;
};

export const toggleOverlay = (show: boolean): void => {
    const body = document.querySelector(`body`);

    if (show) {
        const overlay = document.createElement(`DIV`);
        overlay.className = `overlay`;
        overlay.id = `overlay`;
        body.appendChild(overlay);
    } else {
        const overlay = document.querySelector(`#overlay`);

        if (overlay) {
            overlay.remove();
        }
    }
};

export enum KeyCode {
    ENTER = 13,
    ESC = 27
}