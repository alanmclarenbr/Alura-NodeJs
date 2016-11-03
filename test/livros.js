var express = require('../config/express')();
var request = require('supertest')(express);

describe('#LivrosController', function () {

    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query("delete from livros", function (ex, result) {
            if(!ex){
                done();
            }
        });
    });

    it('#listagem json', function (done) {
        request.get('/livros')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('#cadastrar livro com dados inválidos', function (done) {
        request.post('/livros')
            .send({titulo: "", descricao:"Novo Livro"})
            .expect(400, done);
    });

    it('#cadastrar livro com dados válidos', function (done) {
        request.post('/livros')
            .send({titulo: "Livro Teste", descricao:"Novo Livro Teste", preco: 100.0})
            .expect(302, done);
    });
});