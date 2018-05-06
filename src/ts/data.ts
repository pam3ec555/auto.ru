import {NavData, UserData} from './menu/menu';
import {CarList} from './car-list/car-list';
import {photo1, photo2, photo3} from './images';
import {Car} from './car/car';

export const navData: Array<NavData> = [
    {
        link: `#`,
        name: `Добавить объявление`,
        id: `add-post`
    }
];

export const userData: UserData = {

};

export const cars: Array<CarList> = [
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

export const car: Car = {
    name: `car1`,
    price: 100000,
    mileage: 100000,
    year: 2011,
    ownerCount: 1,
    photos: [
        photo1,
        photo2,
        photo3
    ],
    description: `best car`,
    city: `Казань`,
    contact: {
        name: `Ramil`,
        phoneNum: 79673657611,
        address: `Карбышева 67-55`,
        email: `rep555333@gmail.com`
    },
    engine: {
        volume: 1.6,
        power: 123,
        type: `Бензин`
    },
    bodyType: `Седан`,
    color: `Белый`,
    boxTransmission: `АКПП`,
    wheelTransmission: `Передний`,
    leftHelm: `Левый`,
    state: `Отличное`,
    originalPTS: `Оригинал`,
    views: 500,
    postDate: `20.02.2018`
};