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
    var sql = "INSERT INTO Persons(PersonID,FirstName, LastName, Address , City,Age,SALARY) VALUES ?"
    var values = [
    [2,'Ahmed','Ali','Manakh','PortSaid','23','3000'],
    [3,'Ali','Hassan','Dokki','Cairo','29','3000'],
    [4,'Mohamed','Khaled','Agooza','Cairo','22','3000']
    
    ]; 
    connection.query(sql,[values] ,function(err, result){
        if(err) {
            throw err;
        }
        console.log(result.affectedRows + ' record inserted!')
        console.log(result)
    })
})