const express = require(`express`);
const multer = require(`multer`);
const carStore = require(`../cars/store`);
const imageStore = require(`../images/store`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const generateId = require(`../util/generate-id`);
const CodeStatus = require(`../util/code-status`);

const {Router} = express;
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

const toPage = async (cursor, skip = 0, limit = 20) => {
    return {
        data: await (cursor.skip(skip).limit(limit).toArray()),
        skip,
        limit,
        total: await cursor.count()
    };
};

/**
 * Method for parse integer body values from string to int
 * @param body {object}
 * @return {object}
 */
const parsePostDataToInt = (body) => {
    const intParams = new Set([
        `enginePower`,
        `engineVolume`,
        `mileage`,
        `ownerCount`,
        `price`,
        `year`
    ]);

    intParams.forEach((param) => {
        body[param] = +(body[param]);
    });

    return body;
};

router.get(`/cars-api/cars`, async (req, res) => {
    let data = {};
    if (req.query && Object.keys(req.query).length > 0) {
        data = await toPage(await carStore.getCarsBySort(req.query));
    } else {
        data = await toPage(await carStore.getAllCars());
    }

    return res.send(data);
});

router.get(`/cars-api/cars/:id`, async (req, res) => {
    const {id} = req.params;
    const car = await carStore.getCar(id);

    return res.send(car);
});

router.get(`/cars/:id/photo/:photoIndex`, async (req, res) => {
    const {id, photoIndex} = req.params;
    const car = await carStore.getCar(id);

    if (!car) {
        // Todo throw new NotFoundError(`Car with id "${id}" not found`);
    }

    const {photos} = car;
    const photo = photos[photoIndex];
    const photoPath = `/cars/${id}/photo/${photoIndex}`;

    if (!photo) {
        // Todo throw new NotFoundError(`Wizard with name "${wizardName}" didn't upload avatar`);
    }

    const {info, stream} = await imageStore.get(photoPath);

    if (!info) {
        // Todo throw new NotFoundError(`File was not found`);
    }

    res.set(`content-type`, photo.mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
});

router.post(`/cars-api/add-post`, upload.array(`photos`), async (req, res) => {
    const data = parsePostDataToInt(req.body);
    const photos = req.files;
    data._id = generateId();

    while (await carStore.getCar(data._id) !== null) {
        data._id = generateId();
    }

    if (photos) {
        data.photos = {};
        photos.forEach(async (photo, i) => {
            data.photos[i] = photo;
            const photoInfo = {
                path: `/cars/${data._id}/photo/${i}`,
                mimetype: photo.mimetype
            };
            await imageStore.save(photoInfo.path, createStreamFromBuffer(photo.buffer));
            data.photos[i] = photoInfo;
        });
    }
    await carStore.createCar(data);

    return res.send(data);
});

router.delete(`/cars-api/drop-car/:id`, async (req, res) => {
    const {id} = req.params;

    if (id) {
        await carStore.removeCar(id);
        res.sendStatus(CodeStatus.OK);
    } else {
        res.sendStatus(CodeStatus.NOT_FOUND);
    }
});

router.delete(`/drop-cars`, async (req, res) => {
    await carStore.removeAllCars();

    return res.send(`Removed all cars`);
});

module.exports = router;
