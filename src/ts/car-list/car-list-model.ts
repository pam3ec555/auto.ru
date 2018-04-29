import {ICarList} from './car-list';
import {cars} from '../data';

export default class CarListModel {
    private carListData: Array<ICarList> = cars;

    public get data(): Array<ICarList> {
        return this.carListData;
    }
}