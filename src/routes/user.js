const Router = require('koa-router');
const router = new Router();
const UserController = require('../controllers/UserController');

const userController = new UserController();

router
  .get('/users', userController.getAll.bind(userController))
  .post('/user', userController.create.bind(userController))
  .get('/user/:nome', userController.getOne.bind(userController))
  .put('/user/:nome', userController.update.bind(userController))
  .patch('/user/:nome', userController.update.bind(userController))
  .delete('/user/:nome', userController.delete.bind(userController));

module.exports = router;