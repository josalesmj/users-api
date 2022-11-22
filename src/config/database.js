require('dotenv').config();

const path = require('path');

module.exports = {
  dev: {
    dialect: 'sqlite',
    storage: path.join(process.cwd(), process.env.DB_NAME + '.sqlite'),
    logging: process.env.DB_LOGGING == 'false' ? false : console.log
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: process.env.DB_LOGGING == 'false' ? false : console.log
  },
}[process.env.NODE_ENV];