export interface IAdapter {
    preprocess: any;
    toServer: any;
}

export default abstract class DefaultAdapter implements IAdapter {
    public preprocess(data: any) {
        return data;
    }

    public toServer(data: any) {
        return data;
    }
}
