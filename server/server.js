require(`dotenv`).config();
const express = require(`express`);
const app = express();
const carsRouter = require(`./cars/route`);
const authorizationRouter = require(`./authorization/route`);
const registryRouter = require(`./registry/route`);
const carsDataRouter = require(`./cars-data/route`);
const path = require(`path`);
const bodyParser = require(`body-parser`);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});
app.use(express.static(`dist`));
app.use(``, carsRouter);
app.use(`/authentication-api`, authorizationRouter);
app.use(`/registry-api`, registryRouter);
app.use(`/cars-data-api`, carsDataRouter);

const htmlFilePath = path.join(`${__dirname}/../dist/index.html`);

app.get(`/*`, async (req, res) => {
    return res.sendFile(htmlFilePath);
});

const PORT = +(process.env.PORT) || 3000;
const HOST_NAME = +(process.env.HOST) || `127.0.0.1`;
const serverAddress = `http://${HOST_NAME}:${PORT}`;

module.exports = {
    run() {
        app.listen(PORT, HOST_NAME, () => {
            console.info(`Server run at ${serverAddress}`);
        });
    },
    app
};
