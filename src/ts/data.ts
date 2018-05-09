import {NavData, UserData} from './menu/menu';
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

export const car: Car = {
    id: `test`,
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
    ownerName: `Ramil`,
    phoneNum: 79673657611,
    address: `Карбышева 67-55`,
    email: `rep555333@gmail.com`,
    volume: 1.6,
    power: 123,
    type: `Бензин`,
    bodyType: `Седан`,
    color: `Белый`,
    boxTransmission: `АКПП`,
    wheelTransmission: `Передний`,
    leftHelm: `Левый`,
    state: `Отличное`,
    originalPTS: `Оригинал`,
    views: 500,
    postDate: `20.02.2018`,
    link: ``
};
