const request = require(`supertest`);
const app = require(`express`)();
const CodeStatus = require(`../../server/util/code-status`);
const carsRouter = require(`../../server/cars/route`);

app.use(``, carsRouter);

const createPath = `/add-post/create`;

describe(`POST ${createPath}`, () => {
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
            .expect(CodeStatus.OK)
            .then((req) => {
                console.info(req.text);
            });
    });
});
