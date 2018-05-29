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

const getCarData = async (req, res) => {
    const {id} = req.params;
    const car = await carStore.getCar(id);

    if (car) {
        res.send(car);
    } else {
        res.sendStatus(CodeStatus.NOT_FOUND);
    }
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

const CarAction = {
    ADD: 0,
    EDIT: 1
};

const getDataForSave = async (req, action) => {
    const data = parsePostDataToInt(req.body);
    const photos = req.files;

    if (action === CarAction.ADD) {
        data._id = generateId();

        while (await carStore.getCar(data._id) !== null) {
            data._id = generateId();
        }
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

    return data;
};

router.get(`/cars-api/cars`, async (req, res) => {
    let data = {};
    const skip = (+(req.query.skip)) ? +(req.query.skip) : 0;

    if (req.query && Object.keys(req.query).length > 0 &&
        !(Object.keys(req.query).length === 1 && req.query.skip)) {
        data = await toPage(await carStore.getCarsBySort(req.query), skip);
    } else {
        data = await toPage(await carStore.getAllCars(), skip);
    }

    return res.send(data);
});

router.get(`/cars-api/cars/:id`, getCarData);

router.get(`/cars-api/edit/:id`, getCarData);

router.get(`/cars/:id/photo/:photoIndex`, async (req, res) => {
    const {id, photoIndex} = req.params;
    const car = await carStore.getCar(id);

    if (!car) {
        throw new Error(`Car is not found`);
    }

    const {photos} = car;
    const photo = photos[photoIndex];
    const photoPath = `/cars/${id}/photo/${photoIndex}`;

    if (!photo) {
        throw new Error(`Photo is not found`);
    }

    const {info, stream} = await imageStore.get(photoPath);

    if (!info) {
        throw new Error(`Photo is not found`);
    }

    res.set(`content-type`, photo.mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
});

router.post(`/cars-api/add-post`, upload.array(`photos`), async (req, res) => {
    const data = await getDataForSave(req, CarAction.ADD);
    await carStore.createCar(data);

    return res.send(data);
});

router.put(`/cars-api/edit/:id`, upload.array(`photos`), async (req, res) => {
    const data = await getDataForSave(req, CarAction.EDIT);
    await carStore.editCar(data._id, data);

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

    return res.sendStatus(CodeStatus.OK);
});

module.exports = router;
