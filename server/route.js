const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const async = require(`./util/async`);
const carsStore = require(`./store`);

const carsRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

const toPage = async (cursor, skip = 0, limit = 20) => {
    return {
        data: await (cursor.skip(skip).limit(limit).toArray()),
        skip,
        limit,
        total: await cursor.count()
    };
};

carsRouter.use(bodyParser.json());
carsRouter.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

carsRouter.get(`/cars/`, async(async (req, res) => {
    const data = await toPage(await carsStore.getAllCars());
    console.info(data);

    return res.send(data);
}));

carsRouter.post(`/add-post/create`, upload.single(`photo`), async(async (req, res) => {
    await carsStore.createCar(req.body);

    return res.send(req.body);
}));

carsRouter.delete(`/drop-cars/`, async(async (req, res) => {
    await carsStore.removeAllCars();

    return res.send(`Removed all card`);
}));

module.exports = carsRouter;
