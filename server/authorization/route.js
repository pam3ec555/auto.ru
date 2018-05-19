const express = require(`express`);
const async = require(`../util/async`);
const multer = require(`multer`);
const authenticationStore = require(`./store`);
const CodeStatus = require(`../util/code-status`);
const passwordHash = require(`password-hash`);
const jwt = require(`jsonwebtoken`);

const {Router} = express;
const SECRET_KEY = `secret-key`;
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

/**
 * Format of token
 * Authorization: Bearer <access_token>
 * @param req
 * @param res
 * @param next
 */
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== `undefined`) {
        req.token = bearerHeader;
        next();
    } else {
        res.sendStatus(CodeStatus.FORBIDDEN);
    }
}

router.route(`/`)
    .post(upload.none(), async(async (req, res) => {
        const {login, password} = req.body;
        const userData = await authenticationStore.getUser(login);

        if (userData) {
            if (passwordHash.verify(password, userData.password)) {
                jwt.sign({
                    user: {
                        name: userData.name,
                        email: userData.email,
                        tel: userData.tel
                    }
                }, SECRET_KEY, (err, token) => {
                    res.json({token});
                });
            } else {
                res.sendStatus(CodeStatus.BAD_REQUEST);
            }
        } else {
            res.sendStatus(CodeStatus.NOT_FOUND);
        }
    }))
    .get(verifyToken, (req, res) => {
        jwt.verify(req.token, SECRET_KEY, (err, userData) => {
            if (err) {
                res.sendStatus(CodeStatus.FORBIDDEN);
            } else {
                res.json(userData);
            }
        });
    });

module.exports = router;
