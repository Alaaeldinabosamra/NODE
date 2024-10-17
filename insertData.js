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
    var sql = "INSERT INTO Persons(PersonID,FirstName, LastName, Address , City,Age,SALARY) VALUES(1,'Alaa','Abousamra','Arab','PortSaid','25','3000')"
    connection.query(sql, function(err, result){
        if(err) {
            throw err;
        }
        console.log("Inserted!")
    })
})