function LivrosDAO(connection){
	this._connection = connection;
}

LivrosDAO.prototype.lista = function(callback){
	this._connection.query('select * from livros', callback);
}

LivrosDAO.prototype.salva = function(livro, callback){
	this._connection.query('insert into livros set ?', livro ,callback);
}
module.exports = function(){
	return LivrosDAO;
}