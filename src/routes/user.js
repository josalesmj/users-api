const Router = require('koa-router');
const router = new Router();
const UserController = require('../controllers/UserController');
const validation = require('../validations/user');

const userController = new UserController();

router
  .get('/users', userController.getAll)
  .get('/user/:nome', userController.getOne)
  .get('/users/:limit/:page', validation.validateLimitAndPage, userController.getByPage)
  .post('/user', validation.validateUser, userController.create)
  .patch('/user/:nome', validation.validatePartialUser, userController.update)
  .put('/user/:nome', validation.validateUser, userController.update)
  .delete('/user/:nome', userController.delete)

module.exports = router;