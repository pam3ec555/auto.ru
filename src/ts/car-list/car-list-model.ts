import {Car} from '../car/car';

type CarListResponse = {
    data: Array<Car>,
    limit: number,
    skip: number,
    total: 8
};

export default class CarListModel {
    public get data(): any {
        return fetch(`/cars`)
            .then((res: Response): object => {
                return res.json();
            })
            .then((data: CarListResponse): Array<Car> => {
                return data.data;
            })
            .catch((): any => {
                throw new Error(`Error on load cars`);
            });
    }
}
