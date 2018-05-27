import View from '../../view';

const drawNotFound = (): string => {
    return `<img src="/src/img/page-not-found.png" class="not-found outer-block">`;
};

export default class NotFoundView extends View {
    protected get template(): string {
        return drawNotFound();
    }
}
