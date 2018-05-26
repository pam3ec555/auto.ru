export const createElement = (template: string): DocumentFragment => {
    const frag: DocumentFragment = document.createDocumentFragment();
    const emptyElem: HTMLElement = document.createElement(`DIV`);
    emptyElem.innerHTML = template;
    (Array as any).from(emptyElem.childNodes).forEach((child: HTMLElement): void => {
         frag.appendChild(child);
    });

    return frag;
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

export enum CodeStatus {
    OK = 200,
    NOT_FOUND = 404
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
    DESKTOP = 1
}

export enum ViewTypeWidths {
    DESKTOP = 1200
}

export const appWrap: HTMLElement = document.querySelector(`#app`);

export const pushUrl = (href: string) => {
    history.pushState({}, '', href);
    window.dispatchEvent(new Event('popstate'));
};

export const hide = (elem: HTMLElement): void => {
    elem.style.display = `none`;
};

export const showBlock = (elem: HTMLElement): void => {
    elem.style.display = `block`;
};

type SearchUrlVars = {
    [name: string]: string
};

export const getSearchVars = (): SearchUrlVars => {
    const vars: SearchUrlVars = {};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m: any, key: string, value: string): any => {
        vars[key] = value;
    });

    return vars;
};
