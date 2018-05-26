import View from '../../view';

const drawNotFound = (): string => {
    return `<h3>Not found</h3>`;
};

export default class NotFoundView extends View {
    protected get template(): string {
        return drawNotFound();
    }
}
