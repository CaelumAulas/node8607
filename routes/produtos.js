const express = require('express');

module.exports = function(app){

  const ProdutoController = require('../controllers/produtoController');
  const produtoController = new ProdutoController(app);

  app.get('/produtos'
    ,(request, response) => produtoController.listar(request, response))

  app.get('/produtos/cadastro', function (request, response) {
    const Livro = require('../models/livro');
    const livro = new Livro();
    response.render('produtos/form', {livro})
  })

  app.post('/produtos/detalhe'
    ,express.urlencoded({ extended: false })
    ,express.json()
    ,(request, response, next) => 
      produtoController.validar(request, response, next)
    ,(request, response, next) => 
        produtoController.cadastrar(request, response, next)
    
  )

}
