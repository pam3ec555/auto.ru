import {CarList} from './car-list';
import {cars} from '../data';

export default class CarListModel {
    private carListData: Array<CarList> = cars;

    public get data(): Array<CarList> {
        return this.carListData;
    }
}
