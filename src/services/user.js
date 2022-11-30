const userRepository = require('../repositories/user');

exports.create = (async (request) => {
  let status = undefined;
  let body = '';
  let user = request.body;
  user.nome = user.nome.toLowerCase();
  
  if (await userRepository.findOne(user.nome)) {
    const err = { message: 'Conflict. User already exists', status: 409 };
    throw err;
  }

  await userRepository.create(user)
    .then(() => {
      status = 201;
      body = { message: 'User created' };;
    });

  return {status, body};
});

exports.findAll = (async () => {
  let status = undefined;
  let body = '';

  await userRepository.findAll()
    .then(users => {
      status = 200;
      body = { total: users.rows.length, count: users.count, rows: users.rows };
    });

  return { status, body };
});

exports.findOne = (async (request) => {
  let status = undefined;
  let body = '';

  await userRepository.findOne(request.params.nome.toLowerCase())
    .then(user => {
      if (!user) {
        const err = { message: 'User not found', status: 404 };
        throw err;
      }
      status = 200;
      body = user;
    });

  return { status, body };
});

exports.update = (async (request) => {
  let status = undefined;
  let body = '';

  const nome = request.params.nome.toLowerCase();
  let user = request.body;
  if (user.nome) {
    user.nome = user.nome.toLowerCase();
  }

  await userRepository.findOne(nome)
    .then(async (result) => {
      if (!result) {
        const err = { message: 'User not found', status: 404 };
        throw err;
      }
      else {
        await userRepository.update(nome, user)
          .then(() => {
            status = 200;
            body = { message: 'User updated' };
          });
      }
    });

  return { status, body };
});

exports.remove = (async (request) => {
  let status = undefined;
  let body = '';

  await userRepository.findOne(request.params.nome.toLowerCase())
    .then(async (user) => {
      if (!user) {
        const err = { message: 'User not found', status: 404 };
        throw err;
      }
      await userRepository.remove(request.params.nome.toLowerCase())
        .then(() => {
          status = 200;
          body = { message: 'User deleted' };
        });
    });

  return { status, body };
});

exports.getByPage = (async (request) => {
  let status = undefined;
  let body = '';
  let offset = request.params.page == 1 ? 0 : (request.params.page - 1) * request.params.limit;
  let limit = request.params.limit;

  await userRepository.getByPage(offset, limit)
    .then(users => {
      status = 200;
      body = { total: users.rows.length, count: users.count, rows: users.rows };
    });

  return { status, body };
});