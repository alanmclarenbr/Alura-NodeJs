module.exports = function(app){
	var listarLivros = function(req, res){
		var connection = app.infra.connectionFactory();
		var livrosDAO = new app.infra.LivrosDAO(connection);

		livrosDAO.lista(function(err, results){
			res.format({
				html: function(){
					res.render('livros/lista', {lista:results});		
				},
				json: function(){
					res.json(results);
				}
			});
			
		});

		connection.end();		
	};

	app.get('/livros', listarLivros);

	app.get('/livros/remove', function(){
		var connection = app.infra.connectionFactory();
		var livrosDAO = app.infra.livrosBanco(connection);
		var livro = livrosDAO.carrega(id, callback);
		if(livro){
			livrosDAO.remove(livro, callback);
		}
	});

	app.get('/livros/form', function(req, res){
		res.render('livros/form', {errosValidacao:{},livro:{}});
	});

	app.post('/livros', function(req, res){
		
		var livro = req.body;
		console.log(livro);

		req.assert('titulo', 'O Título é obrigatório!').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();
		

		var errors = req.validationErrors();
		if(errors){
			res.format({
				html: function(){
					res.status(400).render('livros/form',{errosValidacao:errors, livro:livro});
					return;		
				},
				json: function(){
					res.status(400).json(errors);
				}
			});
			
		}

		var connection = app.infra.connectionFactory();
		var livrosDAO = new app.infra.LivrosDAO(connection);
		livrosDAO.salva(livro, function(err, results){
			console.log(err);
			res.redirect('/livros');
		});		
	});

}