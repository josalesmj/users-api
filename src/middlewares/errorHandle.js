//const jwt = require('jsonwebtoken');

//const jwtSecret = (process.env.JWT_SECRET || 'secret-shouldnt-be-undefined');
const httpCode = require('http-codes');

module.exports = async (ctx, next) => {
    try {
      await next();
    }
    catch (err) {
      if (err == undefined) {
        ctx.body = { err: { message: 'Internal Server Error' } };
        ctx.status = httpCode.INTERNAL_SERVER_ERROR;
      }
      else {
        ctx.body = { err: { message: err.message } };
        ctx.status = err.status;
      }
    }
}

