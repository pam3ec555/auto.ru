import {Car} from './car';
import {car} from '../data';

export default class CarModel {
    private carData: Car = car;

    public get data(): Car {
        return this.carData;
    }
}