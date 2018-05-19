const db = require(`../database/database`);
const Store = require(`../store`);

const setupCollection = async () => {
    const dBase = await db;
    const collection = dBase.collection(`users`);

    return collection;
};

class AuthenticationStore extends Store {
    async getUser(login) {
        return (await this.collection).findOne({login});
    }
}

module.exports = new AuthenticationStore(setupCollection()
    .catch(() => {
        console.error(`Failed to set up "authentication collection"`);
    }));
