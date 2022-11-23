exports.validateUser = (async (ctx, next) => {
  if (ctx.request.body.nome == undefined || ctx.request.body.nome == '') {
    ctx.status = 400;
    ctx.body = { err: { message: 'Nome é requerido'} };
    return;
  }
  else if (ctx.request.body.email == undefined || ctx.request.body.email == '') {
    ctx.status = 400;
    ctx.body = { err: { message: 'e-mail é requerido' } };
    return;
  }
  else if (ctx.request.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/) == null) {
    ctx.status = 400;
    ctx.body = { err: { message: 'Verifique se o e-mail está em um formato válido.' } };
    return;
  }
  else if (ctx.request.body.idade == undefined) {
    ctx.status = 400;
    ctx.body = { err: { message: 'Idade é requerida' } };
  }
  else if (isNaN(ctx.request.body.idade)) {
    ctx.status = 400;
    ctx.body = { err: { message: 'Idade deve ser um número' } };
    return;
  }
  else if (ctx.request.body.idade < 18) {
    ctx.status = 400;
    ctx.body = { err: { message: 'O usuário deve ser maior de idade' } };
    return;
  }
  return next();
});

exports.validatePartialUser = (async (ctx, next) => {
  if (ctx.request.body.nome != undefined && ctx.request.body.nome == '') {
    ctx.status = 400;
    ctx.body = { err: { message: 'Nome é requerido' } };
    return;
  }
  else if (ctx.request.body.email != undefined &&
    (ctx.request.body.email == '' || (ctx.request.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/) == null))) {
    ctx.status = 400;
    ctx.body = { err: { message: 'Verifique se o e-mail está em um formato válido.' } };
    return;
  }
  else if (ctx.request.body.idade != undefined) {
    if (isNaN(ctx.request.body.idade)) {
      ctx.status = 400;
      ctx.body = { err: { message: 'Idade deve ser um número' } };
      return;
    }
    else if (ctx.request.body.idade < 18) {
      ctx.status = 400;
      ctx.body = { err: { message: 'O usuário deve ter mais de 18 anos' } };
      return;
    }
  }
  
  return next();
});

exports.validateLimitAndPage = (async (ctx, next) => {
  if (isNaN(ctx.request.params.limit) || isNaN(ctx.request.params.page)) {
    ctx.status = 400;
    ctx.body = { err: { message: 'Limite e o número de página devem ser números. Por exemplo: users/10/2' } };
    return;
  }

  return next();
});