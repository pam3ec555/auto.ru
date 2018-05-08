const {Router} = require(`express`);
const async = require(`./util/async`);

const carsRouter = new Router();

carsRouter.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

carsRouter.post(`/add-post/create`, async(async (req, res) => {
    const data = req.body();
    console.log(data);
}));

module.exports = carsRouter;
