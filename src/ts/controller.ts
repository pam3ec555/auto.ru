export default abstract class Controller {
    public init(): void {
        throw new Error(`You have to define init your module`);
    }

    protected bind(): void {

    }
}