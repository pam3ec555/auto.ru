const express = require(`express`);
const app = express();

app.use(express.static(`dist`));

const PORT = 9000;
const serverAddress = `http://localhost:${PORT}`;

module.exports = {
    run() {
        app.listen(PORT, () => {
            console.info(`Server run at ${serverAddress}`);
        });
    },
    app
};
