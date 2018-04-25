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

/**
 * Type of menu`s view
 * if = 0, Render menu for car-list view
 * if = 1, Render menu for all other views
 */
export enum MenuType {
    LIST = 0,
    OTHER = 1
}

export enum ViewType {
    MOBILE = 0,
    TABLET = 1,
    DESKTOP = 2
}

export enum ViewTypeWidths {
    TABLET = 768,
    DESKTOP = 1200
}