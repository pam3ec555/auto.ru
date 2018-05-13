const express = require(`express`);
const app = express();
const carsRouter = require(`./cars/route`);
const authorizationRouter = require(`./authentication/route`);
const registryRouter = require(`./registry/route`);
const path = require(`path`);
const async = require(`./util/async`);

app.use(express.static(`dist`));
app.use(``, carsRouter);
app.use(`/authentication-api`, authorizationRouter);
app.use(`/registry-api`, registryRouter);

const htmlFilePath = path.join(`${__dirname}/../dist/index.html`);

app.get(`/*`, async(async (req, res) => {
    return res.sendFile(htmlFilePath);
}));

const PORT = 9000;
const HOSTNAME = `127.0.0.1`;
const serverAddress = `http://${HOSTNAME}:${PORT}`;

module.exports = {
    run() {
        app.listen(PORT, HOSTNAME, () => {
            console.info(`Server run at ${serverAddress}`);
        });
    },
    app
};
