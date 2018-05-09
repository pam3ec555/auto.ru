const {MongoClient} = require(`mongodb`);

const URL = `mongodb://localhost:27017`;
const DB_NAME = `auto-ru`;

module.exports = MongoClient.connect(URL).then((client) => client.db(DB_NAME)).catch((e) => {
    console.error(`Failed to connect to MongoDB`, e);
    process.exit(1);
});
