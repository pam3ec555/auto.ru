import {ICar} from './car';
import {car} from '../data';

export default class CarModel {
    private carData: ICar = car;

    public get data(): ICar {
        return this.carData;
    }
}