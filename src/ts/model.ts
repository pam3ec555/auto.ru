import {default as DefaultAdapter, IAdapter} from './default-adapter';

const defaultAdapter: IAdapter = new class extends DefaultAdapter {}();

export default class Model {
    public load(url: string, params: object = {}, adapter: IAdapter = defaultAdapter) {
        return fetch(url, params)
            .then((res: Response): object|Array<object> => {
                return res.json();
            })
            .then((data: object|Array<object>) => {
                return adapter.preprocess(data);
            })
            .catch((err: Error) => {
                throw new Error(`Failed to load data, ${err}`);
            });
    }

    public save(url: string, params: {
        method?: string,
        body: object|FormData
    }, adapter: IAdapter = defaultAdapter) {
        const reqParams: object = {
            method: params.method || `POST`,
            body: adapter.toServer(params.body)
        };

        return fetch(url, reqParams)
            .catch((err: Error) => {
                throw new Error(`Failed to save data, ${err}`);
            });
    }

    public drop(url: string) {
        return fetch(url, {
            method: `DELETE`
        }).catch((err: Error) => {
            throw new Error(`Failed to drop item|items, ${err}`);
        });
    }
}
