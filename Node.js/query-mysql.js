// npm install mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "<user>",
  password: "<password>"
});
connection.connect();
var sql = "select * from user where name = ? and age > ?",
  attrs = ["Tom", 10];
connection.query(sql, attrs, function(err, res, fields) {
  if(err) throw err;
  console.log(res.constructor.name); // Array
  console.log(res.length); // 5
  console.log(res); // [{id: 1, name: 'Tom', age: 25}, {...}, ...]
  console.log(res[0].constructor.name); // RowDataPacket
  console.log("Result data sample: ", res[0]); // {id: 1, name: 'Tom', age: 25}
  console.log("Age is ", res[0]["age"]); // 25
});
connection.end();
