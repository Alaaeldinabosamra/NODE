var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: "alaaeldin",
    password: "P@ssw0rdalaaeldin"
})

connection.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected Successfully !")
})