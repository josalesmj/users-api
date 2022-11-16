module.exports = class User {
  nome = null;
  email = null;
  idade = null;

  constructor(user) {
    this.nome = user.nome
    this.email = user.email
    this.idade = user.idade
  }
}