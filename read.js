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
    // var sql = "SELECT * FROM Persons"
    // var sql = "SELECT FirstName,LastName FROM Persons ORDER BY Age"
    // var sql = "SELECT FirstName,LastName FROM Persons WHERE PersonID = 2"
    var sql = "SELECT FirstName,LastName FROM Persons WHERE  City LIKE 'c%'"
    connection.query(sql, function(err, result){
        if(err) {
            throw err;
        }
        console.log(result)
    })
})