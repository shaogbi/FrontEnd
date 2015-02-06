var http = require("http");

var requestOptions = {
  host: "product.dangdang.com",
  path: "/23358895.html"
  /* other useful options:
  port: "80",
  method: "GET"
  headers: {"customer attr": "Customer Header"}
  */
};

var responseCallback = function(response) {
  var dataStr = "";
  // response.setEncoding("utf8");
  response.on("data", function(chunk) {
    dataStr += chunk;
  }).on("end", function() {
    console.log(dataStr);
  });
};

var req = http.request(requestOptions, responseCallback);
req.end();
