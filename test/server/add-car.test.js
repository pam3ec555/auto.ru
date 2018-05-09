const request = require(`supertest`);
const app = require(`express`)();
const CodeStatus = require(`../../server/util/code-status`);
const carsRouter = require(`../../server/route`);

app.use(``, carsRouter);
console.log(app);

const correctCar = {
    name: `car1`,
    price: 100000,
    mileage: 100000,
    year: 2011,
    ownerCount: 1,
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
    postDate: `20.02.2018`
};

const createPath = `/add-post/create`;

describe(`POST ${createPath}`, () => {
    it(`try to add post by JSON`, () => {
        return request(app)
            .post(createPath)
            .send(correctCar)
            .expect(CodeStatus.OK, correctCar)
            .then((req) => {
                console.info(req.text);
            });
    });

    it(`try to add post by form`, () => {
        return request(app)
            .post(createPath)
            .field(`name`, `car1`)
            .field(`price`, 100000)
            .field(`mileage`, 100000)
            .field(`year`, 2011)
            .field(`ownerCount`, 1)
            .field(`description`, `best car`)
            .field(`city`, `Казань`)
            .field(`ownerName`, `Ramil`)
            .field(`phoneNum`, 79673657611)
            .field(`address`, `Карбышева 67-55`)
            .field(`email`, `rep555333@gmail.com`)
            .field(`volume`, 1.6)
            .field(`power`, 123)
            .field(`type`, `Бензин`)
            .field(`bodyType`, `Седан`)
            .field(`color`, `Белый`)
            .field(`boxTransmission`, `АКПП`)
            .field(`wheelTransmission`, `Передний`)
            .field(`leftHelm`, `Левый`)
            .field(`state`, `Отличное`)
            .field(`originalPTS`, `Оригинал`)
            .field(`views`, 500)
            .field(`postDate`, `20.02.2018`)
            .attach(`photo`, `test/fixtures/photo-1.jpg`)
            .expect(CodeStatus.OK, correctCar)
            .then((req) => {
                console.info(req.text);
            });
    });
});
