var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: "alaaeldin",
    password: "P@ssw0rdalaaeldin",
    database: "alaa"
})

connection.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected Successfully!")
    var sql = "ALTER TABLE Persons ADD COLUMN SALARY INT(20)"
    connection.query(sql, function(err, result){
        if(err) {
            throw err;
        }
        console.log("table Created!")
    })
})