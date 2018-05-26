import View from '../../view';

const drawErrorMessage = (message: string): string => {
    return `<h3 class="error-message">${message}</h3>`;
};

export default class AccessErrorView extends View {
    private message: string;

    constructor(message: string) {
        super();

        this.message = message;
    }

    protected get template(): string {
        return drawErrorMessage(this.message);
    }
}
