import {CarListData} from './car-list-data';
import {cars} from '../data';

export default class CarListModel {
    private carListData: Array<CarListData> = cars;

    public get data(): Array<CarListData> {
        return this.carListData;
    }
}