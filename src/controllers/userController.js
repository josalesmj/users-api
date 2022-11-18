//const UserService = require('');
const User = require('../users/User');
class UserController {

  usersList = null;

  constructor() {
    this.usersList = [];
  }

  async create(ctx) {
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
          message: 'Forbidden. User must be at least 18 old'
        }
        throw err;
      }
      else if (this.usersList.find(({ nome }) => nome === ctx.request.body.nome)) {
        const err = {
          status: 409,
          message: 'Conflict. User already exists'
        }
        throw err;
      }
      let user = new User(ctx.request.body);
      this.usersList.push(user);
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
  }

  async update(ctx) {
    let status = undefined;
    let body = '';
    try {
      const userIndex = this.usersList.findIndex(({ nome }) => nome === ctx.request.params.nome);
      if (userIndex == -1) {
        const err = {
          status: 404,
          message: 'User not found'
        }
        throw err;
      }
      for ([key, value] of Object.entries(ctx.request.body)) {
        if (this.usersList[userIndex][key] != undefined && value.length > 0) {
          this.usersList[userIndex][key] = value;
        }
      }
      status = 200;
      body = this.usersList[userIndex];
    }
    catch (err) {
      status = err.status == undefined ? 500 : err.status;
      body = { err: err };
    }
    finally {
      ctx.status = status;
      ctx.body = body;
    }
  }

  async delete(ctx) {
    let status = undefined;
    let body = '';
    try {
      const userIndex = this.usersList.findIndex(({ nome }) => nome === ctx.request.params.nome);
      if (userIndex == -1) {
        const err = {
          status: 404,
          message: 'User not found'
        }
        throw err;
      }
      const user = this.usersList.splice(userIndex, 1)[0];
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
  }

  async getOne(ctx) {
    let status = undefined;
    let body = '';
    try {
      const user = this.usersList.find(({ nome }) => nome === ctx.request.params.nome);
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
  }

  async getAll(ctx) {
    let status = undefined;
    let body = '';
    try {
      if (!this.usersList) {
        const err = {
          status: 500,
          message: 'Something went wrong'
        }
        throw err;
      }
      status = 200;
      body = { total: this.usersList.length, count: 0, rows: this.usersList }
    }
    catch (err) {
      status = err.status == undefined ? 500 : err.status;
      body = { err: err };
    }
    finally {
      ctx.status = status;
      ctx.body = body;
    }
  }
}

module.exports = UserController;