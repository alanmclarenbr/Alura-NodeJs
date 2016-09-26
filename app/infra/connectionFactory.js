var mysql = require('mysql');

//FACTORY METHOD
function createDBConnection(){
	console.log('createDBConnection()');
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'casadocodigo_js'
	});
}

//Wrapper
module.exports = function(){
	return createDBConnection;
}