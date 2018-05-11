import {Car} from "../car/car";

export type Data = {
    data: Array<Car>,
    limit: number,
    skip: number,
    total: number
};
