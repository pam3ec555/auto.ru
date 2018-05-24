const db = require(`../database/database`);
const Store = require(`../store`);

const setupCollection = async () => {
    const dBase = await db;
    const collection = dBase.collection(`cars`);
    collection.createIndex({
        brand: `text`,
        model: `text`
    });

    return collection;
};

class CarStore extends Store {
    async getCar(id) {
        return (await this.collection).findOne({id});
    }

    async getCarsBySort(sortObj) {
        if (sortObj.year) {
            sortObj.year = {
                $gte: +(sortObj.year)
            };
        }

        if (sortObj.price) {
            sortObj.price = {
                $lte: +(sortObj.price)
            };
        }

        if (sortObj.mileage) {
            sortObj.mileage = {
                $lte: +(sortObj.mileage)
            };
        }

        if (typeof sortObj.search === `string`) {
            if (sortObj.search.trim() !== ``) {
                sortObj.$text = {
                    $search: `${sortObj.search}`
                };
            }
            delete sortObj.search;
        }

        return (await this.collection).find(sortObj)
            .project({score: {$meta: `textScore`}})
            .sort({score: {$meta: `textScore`}});
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
