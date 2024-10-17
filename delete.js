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
    var sql = "DELETE FROM Persons WHERE PersonID = 4 LIMIT 1"
    connection.query(sql, function(err, result){
        if(err) {
            throw err;
        }
        console.log(result.affectedRows + ' record deleted!')
        console.log(result)
    })
})