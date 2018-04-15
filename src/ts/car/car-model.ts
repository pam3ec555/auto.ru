import {CarData} from './car-data';
import {car} from '../data';

export default class CarModel {
    private carData: CarData = car;

    public get data(): CarData {
        return this.carData;
    }
}