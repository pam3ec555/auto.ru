const express = require(`express`);
const fs = require(`fs`);
const async = require(`../util/async`);
const util = require(`util`);
const readFile = util.promisify(fs.readFile);

const {Router} = express;
const router = new Router();

router.get(`/brand`, async(async (req, res) => {
    const text = req.query.q.toLowerCase();
    const brandData = await readFile(`./data/cars.json`, `utf-8`);
    const brandDataJson = JSON.parse(brandData);
    const brandArray = Object.keys(brandDataJson).filter((brand) => {
        return brand.toLowerCase().indexOf(text) !== -1;
    });

    res.send(brandArray);
}));

router.get(`/:brand`, async (req, res) => {
    const text = req.query.q.toLowerCase();
    const {brand} = req.params;
    const carsData = await readFile(`./data/cars.json`, `utf-8`);
    const carsDataJson = JSON.parse(carsData);
    const modelList = (carsDataJson[brand]) ? carsDataJson[brand].filter((model) => {
        return model.toLowerCase().indexOf(text) !== -1;
    }) : [];

    res.send(modelList);
});

module.exports = router;
