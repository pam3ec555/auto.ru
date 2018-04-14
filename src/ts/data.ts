import {UserData} from './menu/menu-data';
import {CarListData} from './car-list/car-list-data';

export const navData: Array<object> = [
    {
        link: `#`,
        name: `name`
    },
    {
        link: `#`,
        name: `name`
    },
    {
        link: `#`,
        name: `name`
    }
];

export const userData: UserData = {
    name: `Ramil`
};

export const cars: Array<CarListData> = [
    {
        name: `car1`,
        description: `best car`,
        price: 100000,
        mileage: 100000,
        year: 2011,
        ownerCount: 1
    },
    {
        name: `car2`,
        description: `best car`,
        price: 200000,
        mileage: 200000,
        year: 2012,
        ownerCount: 2
    },
    {
        name: `car3`,
        description: `best car`,
        price: 300000,
        mileage: 300000,
        year: 2013,
        ownerCount: 3
    }
];