const Router = require('koa-router');
const { CITEXT } = require('sequelize');
const router = new Router();
const AuthController = require('../controllers/authController');
const jwtMiddleware = require('../middlewares/auth');

router
    .post('/auth', AuthController.authentication)
    .get('/teste', jwtMiddleware, (async (ctx) => {
        
        console.log(ctx.request.headers.authorization);
        ctx.status = 200;
    }));

module.exports = router;