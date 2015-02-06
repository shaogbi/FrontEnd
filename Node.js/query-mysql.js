// npm install mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "<user>",
  password: "<password>"
});
connection.connect();
var sql = "select * from blog.user limit 5";
connection.query(sql, function(err, res, fields) {
  if(err) throw err;
  console.log(res.constructor.name); // Array
  console.log(res.length); // 5
  console.log(res); // [{id: 1, name: 'Tom', age: 25}, {...}, ...]
  console.log(res[0].constructor.name); // RowDataPacket
  console.log("Result data sample: ", res[0]); // {id: 1, name: 'Tom', age: 25}
});
connection.end();
