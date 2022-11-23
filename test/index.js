//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem conter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ['nome', 'email', 'idade'],
  properties: {
    nome: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    idade: {
      type: 'number',
      minimum: 18
    }
  }
}

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function () {
  it('deveria retornar -1 quando o valor não esta presente', function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

//testes da aplicação
describe('Testes da aplicaçao', () => {
  it('o servidor esta online', function (done) {
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('deveria ser uma lista vazia de usuarios', function (done) {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it('deveria criar o usuario raupp', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario maria', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "maria", email: "jose.maria@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario raimundo', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "raimundo", email: "jose.raimundo@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario Fernando', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "Fernando", email: "jose.Fernando@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario Emanuel', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "Emanuel", email: "jose.Emanuel@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario Vinicius', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "Vinicius", email: "jose.Vinicius@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });
  //...adicionar pelo menos mais 5 usuários. Se adicionar usuário menor de idade, deve dar erro. Ps: não criar o usuário naoExiste

  it('o usuario é menor de idade', function (done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "Enzo", email: "jose.enzo@devoz.com.br", idade: 17 })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body.err.message).to.be.equal('Forbidden. User must be at least 18 old');
        done();
      });
  });

  it('o usuario naoExiste não existe no sistema', function (done) {
    chai.request(app)
      .get('/user/naoExiste')
      .end(function (err, res) {
        expect(res.body.err.message).to.be.equal('User not found');
        expect(res).to.have.status(404);
        done();
      });
  });

  it('o usuario raupp existe e é valido', function (done) {
    chai.request(app)
      .get('/user/raupp')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it('o usuario Emanuel existe e é valido', function (done) {
    chai.request(app)
      .get('/user/Emanuel')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it('deveria editar o usuario Emanuel para ter uma idade de 40 anos', function (done) {
    chai.request(app)
      .patch('/user/Emanuel')
      .send({ idade: 40 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('User updated');
        done();
      });
  });

  it('o usuario Emanuel existe, é valido e tem 40 anos de idade', function (done) {
    chai.request(app)
      .get('/user/Emanuel')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        expect(res.body.idade).to.be.equal(40);
        done();
      });
  });

  it('deveria editar o usuario Emanuel para Emannuel', function (done) {
    chai.request(app)
      .put('/user/Emanuel')
      .send({ nome: "Emannuel", email: "jose.Emanuel@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('User updated');
        done();
      });
  });

  it('o usuario Emannuel existe e é valido', function (done) {
    chai.request(app)
      .get('/user/Emannuel')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it('deveria excluir o usuario raupp', function (done) {
    chai.request(app)
      .delete('/user/raupp')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('User deleted');
        done();
      });
  });

  it('o usuario raupp não deve existir mais no sistema', function (done) {
    chai.request(app)
      .get('/user/raupp')
      .end(function (err, res) {
        expect(res.body.err.message).to.be.equal('User not found');
        expect(res).to.have.status(404);
        done();
      });
  });

  it('deveria ser uma lista com pelomenos 5 usuarios', function (done) {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
      });
  });
})