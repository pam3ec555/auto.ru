const request = require(`supertest`);
const app = require(`express`)();
const carsRoute = require(`../../server/route`);

app.use(`/add-post/create`, carsRoute);

const correctCar = {
    name: `car1`,
    price: 100000,
    mileage: 100000,
    year: 2011,
    ownerCount: 1,
    photos: [],
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

describe(`POST /add-post/create`, () => {
    it(`try to add post`, () => {
        return request(app)
            .post(`/add-post/create`)
            .send(correctCar)
            .expect(200, correctCar);
    });
});

// Todo resolve problem with router and testing post req for adding car
