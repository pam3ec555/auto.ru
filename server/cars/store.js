const db = require(`../database/database`);
const Store = require(`../store`);

const setupCollection = async () => {
    const dBase = await db;
    const collection = dBase.collection(`cars`);
    collection.createIndex({unique: true});

    return collection;
};

class CarStore extends Store {
    async getCar(id) {
        return (await this.collection).findOne({id});
    }

    async getCarsBySort(sortObj) {
        let sortResultData = await this.getAllCars();

        for (const key in sortObj) {
            const val = sortObj[key];

            sortResultData = sortResultData.filter((car) => {
                return car[key] === val;
            });
            // Todo make sort
        }

        return sortResultData;
    }

    async getAllCars() {
        return (await this.collection).find();
    }

    async createCar(carData) {
        return (await this.collection).insertOne(carData);
    }

    async removeAllCars() {
        return (await this.collection).drop();
    }
}

module.exports = new CarStore(setupCollection()
    .catch(() => {
        console.error(`Failed to set up "cars collection"`);
    }));
