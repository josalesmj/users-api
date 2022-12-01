require('dotenv').config();
const httpCode = require('http-codes');
const jwt = require('jsonwebtoken');

const jwtSecret = (process.env.JWT_SECRET || 'secret-shouldnt-be-undefined');

exports.getToken = (async (request) => {
  let status = undefined;
  let body = '';
  let {user, password} = request.body;
    
  let token = jwt.sign( { user: user}, jwtSecret, { expiresIn: '1h'});
  status = httpCode.OK;
  body = { token: token };
    
  return {status, body};
});

exports.validateToken = (async (request) => {

});