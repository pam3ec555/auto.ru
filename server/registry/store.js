const db = require(`../database/database`);
const Store = require(`../store`);

const setupCollection = async () => {
    const dBase = await db;
    const collection = dBase.collection(`users`);
    collection.createIndex({unique: true});

    return collection;
};

class RegistryStore extends Store {
    async createUser(userData) {
        return (await this.collection).insertOne(userData);
    }

    async dropUsers() {
        return (await this.collection).drop();
    }
}

module.exports = new RegistryStore(setupCollection()
    .catch(() => {
        console.error(`Failed to set up "cars collection"`);
    }));
