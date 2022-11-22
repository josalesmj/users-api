const userService = require('../services/user');
class UserController {

  constructor() {
    this.usersList = [];
  }

  async create(ctx) {
    let { status, body } = await userService.create(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }

  async update(ctx) {
    let { status, body } = await userService.update(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }

  async delete(ctx) {
    let { status, body } = await userService.remove(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }

  async getOne(ctx) {
    let { status, body } = await userService.findOne(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }

  async getAll(ctx) {
    let { status, body } = await userService.findAll(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }

  async getByPage(ctx) {
    let { status, body } = await userService.getByPage(ctx.request);
    ctx.status = status;
    ctx.body = body;
  }
}

module.exports = UserController;