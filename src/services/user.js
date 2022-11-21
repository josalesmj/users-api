const userRepository = require('../repositories/user');

exports.create = (async (request) => {
  let status = undefined
  let body = '';
  try {
    let user = request.body;
    user.nome = user.nome.toLowerCase();
    if (user.idade < 18) {
      const err = { message: 'Forbidden. User must be at least 18 old' }
      status = 403;
      throw err;
    }
    else if (await userRepository.findOne(user.nome)) {
      const err = { message: 'Conflict. User already exists' }
      status = 409;
      throw err;
    }
    await userRepository.create(user)
      .then(() => {
        status = 201;
        body = { message: 'User created' };;
      });
  }
  catch (err) {
    status = status == undefined ? 500 : status
    if (err == undefined) {
      body = { err: { message: 'Internal Server Error' } };
    }
    else {
      body = { err: err };
    }
  }
  finally {
    return {status, body};
  }
});

exports.findAll = (async () => {
  let status = undefined
  let body = '';
  try {
    await userRepository.findAll()
      .then(users => {
        status = 200;
        body = { total: users.length, count: 0, rows: users }
      });
  }
  catch (err) {
    status = status == undefined ? 500 : status
    if (err == undefined) {
      body = { err: { message: 'Internal Server Error' } };
    }
    else {
      body = { err: err };
    }
  }
  finally {
    return { status, body };
  }
});

exports.findOne = (async (request) => {
  let status = undefined
  let body = '';
  try {
    await userRepository.findOne(request.params.nome.toLowerCase())
      .then(user => {
        if (!user) {
          status = 404;
          const err = { message: 'User not found' };
          throw err;
        }
        status = 200;
        body = user;
      });
  }
  catch (err) {
    status = status == undefined ? 500 : status
    if (err == undefined) {
      body = { err: { message: 'Internal Server Error' } };
    }
    else {
      status = status == undefined ? 500 : status
      if (err == undefined) {
        body = { err: { message: 'Internal Server Error' } };
      }
      else {
        body = { err: err };
      }
    }
  }
  finally {
    return { status, body };
  }
});

exports.update = (async (request) => {
  let status = undefined
  let body = '';
  try {
    const nome = request.params.nome.toLowerCase();
    let user = request.body;
    if (user.nome) {
      user.nome = user.nome.toLowerCase();
    }
    await userRepository.findOne(nome)
      .then(async (result) => {
        if (!result) {
          status = 404;
          const err = { message: 'User not found' };
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
  }
  catch (err) {
    status = status == undefined ? 500 : status
    if (err == undefined) {
      body = { err: { message: 'Internal Server Error' } };
    }
    else {
      body = { err: err };
    }
  }
  finally {
    return { status, body };
  }
});

exports.remove = (async (request) => {
  let status = undefined
  let body = '';
  try {
    await userRepository.findOne(request.params.nome.toLowerCase())
      .then(async (user) => {
        if (!user) {
          status = 404;
          const err = { message: 'User not found' };
          throw err;
        }
        await userRepository.remove(request.params.nome.toLowerCase())
          .then(() => {
            status = 200;
            body = { message: 'User deleted' };
          });
      });
  }
  catch (err) {
    status = status == undefined ? 500 : status
    if (err == undefined) {
      body = { err: { message: 'Internal Server Error' } };
    }
    else {
      body = { err: err };
    }
  }
  finally {
    return { status, body };
  }
});