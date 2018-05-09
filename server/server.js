const express = require(`express`);
const app = express();
const carsRouter = require(`./cars/route`);

app.use(express.static(`dist`));
app.use(``, carsRouter);

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
