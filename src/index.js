//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const userController = require('./controllers/userController');

const koa = new Koa();
const router = new Router();

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

koa
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(userController.routes())
  .use(userController.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;