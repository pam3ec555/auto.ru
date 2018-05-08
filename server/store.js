const db = require(`./database`);

const setupCollection = async () => {
    const dBase = await db;
    const collection = dBase.collection(`cars`);

    return collection;
};

class CarStore {
    constructor(collection) {
        this.collection = collection;
    }

    async getCar(id) {
        return (await this.collection).findOne({id});
    }

    async getAllCars() {
        return (await this.collection).find();
    }
}
