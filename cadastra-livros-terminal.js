var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port:3000,
	path:'/livros',
	method: 'post',
	headers: {
		'Accept':'application/json',
		'Content-type':'application/json'
	}
};

var client = http.request(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Corpo:' + body);
	});
});

var livro = {
	titulo: 'Introdução ao Android',
	descricao: 'Android para iniciantes com Android-Studio',
	preco: 130
}

client.end(JSON.stringify(livro));