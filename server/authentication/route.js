const express = require(`express`);
const session = require(`express-session`);
const MongoStore = require(`connect-mongo`)(session);
const mongoose = require(`mongoose`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const authenticationStore = require(`./store`);
const setAccessHeaders = require(`../util/set-access-headers`);
const CodeStatus = require(`../util/code-status`);
const passwordHash = require(`password-hash`);

const {Router} = express;
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

mongoose.connect(`mongodb://localhost:27017`);

router.use(bodyParser.json());

router.use(setAccessHeaders);

router.use(session({
    secret: `key`,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 60000
    }
}));

router.route(``)
    .post(upload.none(), async(async (req, res) => {
        const {login, password} = req.body;
        const userData = await authenticationStore.getUser(login);
        let authenticationStatus;

        if (userData) {
            if (passwordHash.verify(password, userData.password)) {
                authenticationStatus = CodeStatus.OK;
                req.session.name = userData.name;
                req.session.email = userData.email;
                req.session.tel = userData.tel;
                // Todo save session status
            } else {
                authenticationStatus = CodeStatus.BAD_REQUEST;
            }
        } else {
            authenticationStatus = CodeStatus.NOT_FOUND;
        }

        return res.sendStatus(authenticationStatus);
    }))
    .get(async(async (req, res) => {
        const user = {
            name: req.session.name,
            email: req.session.email,
            tel: req.session.tel
        };
        console.log(req.session);
        res.send(user);
    }));

module.exports = router;
