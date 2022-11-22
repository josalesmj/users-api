const Router = require('koa-router');
const router = new Router();
const UserController = require('../controllers/UserController');

const userController = new UserController();

router
  .get('/users', userController.getAll)
  .get('/users/:limit/:page', userController.getByPage)
  .post('/user', userController.create)
  .get('/user/:nome', userController.getOne)
  .put('/user/:nome', userController.update)
  .patch('/user/:nome', userController.update)
  .delete('/user/:nome', userController.delete)

module.exports = router;