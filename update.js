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
    var sql = "UPDATE Persons SET FirstName='Alaaeldin' WHERE PersonID = 1 "
    connection.query(sql, function(err, result){
        if(err) {
            throw err;
        }
        console.log(result.affectedRows + ' record updated!')
        console.log(result)
    })
})