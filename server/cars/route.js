const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const async = require(`../util/async`);
const carStore = require(`../cars/store`);
const imageStore = require(`../images/store`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const generateId = require(`../util/generate-id`);

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

carsRouter.get(`/cars` || `/`, async(async (req, res) => {
    const data = await toPage(await carStore.getAllCars());

    return res.send(data);
}));

carsRouter.get(`/cars/:id/photo`, async(async (req, res) => {
    const {id} = req.params;
    const car = await carStore.getCar(id);

    if (!car) {
        // throw new NotFoundError(`Car with id "${id}" not found`);
    }

    const {photo} = car;

    if (!photo) {
        // throw new NotFoundError(`Wizard with name "${wizardName}" didn't upload avatar`);
    }

    const {info, stream} = await imageStore.get(photo.path);

    if (!info) {
        // throw new NotFoundError(`File was not found`);
    }

    res.set(`content-type`, photo.mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
}));

carsRouter.post(`/add-post/create`, upload.array(`photos`), async(async (req, res) => {
    const data = req.body;
    const photos = req.files;
    data.id = generateId();

    while (await carStore.getCar(data.id) !== null) {
        data.id = generateId();
    }

    if (photos) {
        data.photos = {};
        photos.forEach(async (photo, i) => {
            data.photos[i] = photo;
            const photoInfo = {
                path: `/cars/${data.id}/photo/${i}`,
                mimetype: photo.mimetype
            };
            await imageStore.save(photoInfo.path, createStreamFromBuffer(photo.buffer));
            data.photos[i] = photoInfo;
        });
    }
    await carStore.createCar(data);

    return res.send(data);
}));

carsRouter.delete(`/drop-cars`, async(async (req, res) => {
    await carStore.removeAllCars();

    return res.send(`Removed all cars`);
}));

module.exports = carsRouter;
