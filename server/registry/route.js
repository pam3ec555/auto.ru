const express = require(`express`);
const multer = require(`multer`);
const registryStore = require(`./store`);
const passwordHash = require(`password-hash`);
const CodeStatus = require(`../util/code-status`);

const {Router} = express;
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router.post(``, upload.none(), async (req, res) => {
    const data = req.body;
    const {password, login} = data;

    if (!await registryStore.checkForUser(login)) {
        data.password = passwordHash.generate(password);
        await registryStore.createUser(data);
        res.send(data);
    } else {
        res.sendStatus(CodeStatus.BAD_REQUEST);
    }
});

router.delete(`/drop`, async (req, res) => {
    await registryStore.dropUsers();

    return res.send(`Users was removed`);
});

module.exports = router;
