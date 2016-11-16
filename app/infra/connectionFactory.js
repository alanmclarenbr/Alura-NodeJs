var mysql = require('mysql');

//FACTORY METHOD
var connectMYSQL = function () {
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root',
            database : 'casadocodigo_nodejs22'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: 'root',
           database: 'casadocodigo_nodejs_test'
        });
    }
}

//Wrapper
module.exports = function(){
	return connectMYSQL;
}