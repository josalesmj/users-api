const User = require('../models/User');

exports.create = (async (user) => {
  return await User.create(user);
});

exports.findAll = (async () => {
  let users = await User.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    raw: true
  });
  
  return users;
});

exports.findOne = (async (nome) => {
  return await User.findOne({
    where: { nome },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
});

exports.update = (async (nome, user) => {
  let userToUpdate = await User.findOne({
    where: { nome },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
  });
  for (const [key, value] of Object.entries(user)) {
    if (userToUpdate[key] != undefined && value) {
      userToUpdate[key] = value;
    }
  }
  return await userToUpdate.save();
});
  
exports.remove = (async (nome) => {
  return await User.destroy({
    where: { nome }
  });
});

exports.getByPage = (async (page, limit) => {
  let users = await User.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    offset: page,
    limit: limit,
    raw: true
  });
  return users;
});