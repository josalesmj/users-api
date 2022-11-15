module.exports = class User {
  fields = {
    name: null,
    email: null,
    age: null
  };

  constructor(user) {
    this.fields = user
    console.log(this.fields);
  }
}