module.exports = function(app){
	var listarLivros = function(req, res){
		var connection = app.infra.connectionFactory();
		var livrosDAO = new app.infra.LivrosDAO(connection);

		livrosDAO.lista(function(err, results){
			res.render('livros/lista', {lista:results});
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
		res.render('livros/form');
	});

	app.post('/livros', function(req, res){
		
		var livro = req.body;
		
		var connection = app.infra.connectionFactory();
		var livrosDAO = new app.infra.LivrosDAO(connection);
		livrosDAO.salva(livro, function(err, results){
			res.redirect('/livros');
		});		
	});

}