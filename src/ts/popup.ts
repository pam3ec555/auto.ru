import {appWrap, bindElem, createElement, toggleOverlay} from './util';

enum PopupType {
    ALERT = 0,
    CONFIRM = 1
}

type Options = {
    readonly confirm?: any,
    readonly cancel?: any,
    readonly confirmText?: string,
    readonly cancelText?: string,
    readonly title?: string
};

const getTemplate = (message: string, type: PopupType, options: Options): string => {
    const cancelBtn = (type === PopupType.CONFIRM) ?
        `<button type="button" id="cancel-btn" class="btn btn--drop btn--popup">${options.cancelText}</button>` : ``;
    const btnWrapCenter = (type === PopupType.ALERT) ? ` popup__btns-wrap--center` : ``;

    return `<div class="popup" id="popup">
  <h2 class="popup__title">${options.title}</h2>
  <p class="popup__message">${message}</p>
  <div class="popup__btns-wrap${btnWrapCenter}">
    <button type="button" id="confirm-btn" class="btn btn--primary btn--popup">${options.confirmText}</button>
    ${cancelBtn}
  </div>
</div>`;
};

export default class Popup {
    private popup: HTMLElement;

    private defaultCallback = (callback: any): void => {
        if (this.popup) {
            this.bind(callback, false);
            toggleOverlay(false);
            this.popup.remove();
        }
    }

    private defaultOptions: Options = {
        confirm: () => {
            // Empty
        },
        cancel: () => {
            // Empty
        },
        confirmText: `OK`,
        cancelText: `Отмена`,
        title: `Предупреждение`
    };

    public alert(message: string, options: Options = this.defaultOptions): void {
        const _options: Options = Object.assign(this.defaultOptions, options);
        this.showPopup(message, PopupType.ALERT, _options);
    }

    public confirm(message: string, options: Options = this.defaultOptions): void {
        const _options: Options = Object.assign(this.defaultOptions, options);
        this.showPopup(message, PopupType.CONFIRM, _options);
    }

    private showPopup(message: string, type: PopupType, options: Options): void {
        const template: string = getTemplate(message, type, options);
        const frag: DocumentFragment = createElement(template);
        const body: HTMLBodyElement = document.querySelector(`body`);
        body.appendChild(frag);
        this.popup = body.querySelector(`#popup`);
        this.setCoords();
        toggleOverlay(true);
        this.bind(options);
    }

    private bind(options: Options, bind: boolean = true): void {
        const confirmBtn: HTMLButtonElement = this.popup.querySelector(`#confirm-btn`);

        if (confirmBtn) {
            const confirmCallback = () => {
                this.defaultCallback(confirmCallback);
                options.confirm();
            };
            bindElem(confirmBtn, `click`, confirmCallback, bind);
        }

        const cancelBtn: HTMLButtonElement = this.popup.querySelector(`#cancel-btn`);

        if (cancelBtn) {
            const cancelCallback = () => {
                this.defaultCallback(cancelCallback);
                options.cancel();
            };
            bindElem(cancelBtn, `click`, cancelCallback, bind);
        }
    }

    private setCoords(): void {
        const box: any = this.popup.getBoundingClientRect();
        this.popup.style.marginLeft = `-${box.width / 2}px`;
        this.popup.style.marginTop = `-${box.height / 2}px`;
        this.popup.style.left = `50%`;
    }
}
