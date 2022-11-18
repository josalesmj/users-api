const Sequelize = require('sequelize');
const db = require('../database/index');

const User = db.define('users', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

User.sync({ force: false });

module.exports = User;