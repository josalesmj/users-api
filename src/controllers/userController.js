const Router = require('koa-router');
const router = new Router();
const User = require('../users/User');

global.usersList = [];

router.get('/users', async (ctx) => {
  let status = undefined;
  let body = '';
  try {
    if (!global.usersList) {
      const err = {
        status: 500,
        message: 'Something went wrong'
      }
      throw err;
    }
    status = 200;
    body = { total: global.usersList.length, count: 0, rows: global.usersList }
  }
  catch (err) {
    status = err.status == undefined ? 500 : err.status;
    body = { err: err };
  }
  finally {
    ctx.status = status;
    ctx.body = body;
  }
});

router.post('/user', async (ctx) => {
  let status = undefined;
  let body = '';
  try {
    if (ctx.request.body.nome == undefined || ctx.request.body.email == undefined || ctx.request.body.idade == undefined) {
      const err = {
        status: 400,
        message: 'Bad Request. Name, email and age are necessary'
      }
      throw err;
    }
    else if (ctx.request.body.idade < 18) {
      const err = {
        status: 403,
        message: 'User must be at least 18 old'
      }
      throw err;
    }
    else if (global.usersList.find(({ nome }) => nome === ctx.request.body.nome)) {
      const err = {
        status: 409,
        message: 'Conflict. User already exists'
      }
      throw err;
    }
    let user = new User(ctx.request.body);
    global.usersList.push(user);
    status = 201;
    body = { message: 'User created' };
  }
  catch (err) {
    status = err.status == undefined ? 500 : err.status;
    body = { err: err };
  }
  finally {
    ctx.status = status;
    ctx.body = body;
  }
});

router.get('/user/:nome', async (ctx) => {
  let status = undefined;
  let body = '';
  try {
    const user = global.usersList.find(({ nome }) => nome === ctx.request.params.nome);
    if (!user) {
      const err = {
        status: 404,
        message: 'User not found'
      }
      throw err;
    }
    status = 200;
    body = user;
  }
  catch (err) {
    status = err.status == undefined ? 500 : err.status;
    body = { err: err };
  }
  finally {
    ctx.status = status;
    ctx.body = body;
  }
});

router.delete('/user/:nome', async (ctx) => {
  let status = undefined;
  let body = '';
  try {
    const userIndex = global.usersList.findIndex(({ nome }) => nome === ctx.request.params.nome);
    if (userIndex == -1) {
      const err = {
        status: 404,
        message: 'User not found'
      }
      throw err;
    }
    const user = global.usersList.splice(userIndex, 1)[0];
    status = 200;
    body = user;
  }
  catch (err) {
    status = err.status == undefined ? 500 : err.status;
    body = { err: err };
  }
  finally {
    ctx.status = status;
    ctx.body = body;
  }
});

module.exports = router;