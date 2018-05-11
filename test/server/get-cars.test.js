const request = require(`supertest`);
const app = require(`express`)();
const CodeStatus = require(`../../server/util/code-status`);
const carsRouter = require(`../../server/cars/route`);

app.use(``, carsRouter);

describe(`Get cars`, () => {
    it(`Get cars by JSON`, () => {
        return request(app)
            .get(`/cars-api/cars`)
            .set(`Accept`, `application/json`)
            .expect(CodeStatus.OK)
            .expect(`Content-Type`, /json/)
            .then((res) => {
                console.info(`Success request`);
                console.info(res.body);
            });
    });

    it(`Error with request name`, () => {
        return request(app)
            .get(`/carsTestError/`)
            .expect(CodeStatus.NOT_FOUND)
            .then(() => {
                console.info(`Wrong request name`);
            });
    });
});
