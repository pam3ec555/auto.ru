const express = require(`express`);
const multer = require(`multer`);
const async = require(`../util/async`);
const registryStore = require(`./store`);
const passwordHash = require(`password-hash`);

const {Router} = express;
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router.post(``, upload.none(), async(async (req, res) => {
    const data = req.body;
    const {password} = data;
    data.password = passwordHash.generate(password);
    await registryStore.createUser(data);

    return res.send(data);
}));

router.delete(`/drop`, async(async (req, res) => {
    await registryStore.dropUsers();

    return res.send(`Users was removed`);
}));

module.exports = router;
