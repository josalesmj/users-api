//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const yamljs = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');

const dbConnection = require('./database/index');
const spec = yamljs.load('./api.yaml');
const userRoute = require('./routes/user');

const koa = new Koa();
const router = new Router();

dbConnection
  .authenticate().then(() => {
    console.log('Conexão com banco de dados realizada.');
  })
  .catch((err) => {
    console.log(err);
  });

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

koa
  .use(bodyParser())
  .use(koaSwagger({ routePrefix: '/docs', swaggerOptions: { spec }}))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(userRoute.routes())
  .use(userRoute.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;