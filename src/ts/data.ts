import {NavData, UserData} from './menu/menu-data';
import {CarListData} from './car-list/car-list-data';
import {photo1} from './images';
import {CarData, Contact, Engine} from './car/car-data';

export const navData: Array<NavData> = [
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
        price: 100000,
        mileage: 100000,
        year: 2011,
        link: `car-1`,
        preview: photo1
    },
    {
        name: `car2`,
        price: 200000,
        mileage: 200000,
        year: 2012,
        link: `car-2`,
        preview: photo1
    },
    {
        name: `car3`,
        price: 300000,
        mileage: 300000,
        year: 2013,
        link: `car-3`,
        preview: photo1
    }
];

export const car: CarData = {
    name: `car1`,
    price: 100000,
    mileage: 100000,
    year: 2011,
    ownerCount: 1,
    photos: [
        photo1
    ],
    description: `best car`,
    city: 1,
    contact: {
        name: `Ramil`,
        phoneNum: 79673657611,
        address: `Карбышева 67-55`,
        email: `rep555333@gmail.com`
    },
    engine: {
        volume: 1.6,
        power: 123,
        type: 1
    },
    bodyType: 2,
    color: `Белый`,
    boxTransmission: 1,
    wheelTransmission: 1,
    leftHelm: true,
    state: 5,
    originalPTS: true,
    views: 500,
    postDate: Date.now()
};