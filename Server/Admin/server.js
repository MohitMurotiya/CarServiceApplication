const http = require("http");
const app = require("./app");
//const eurekaHelper = require("./eureka-helper");
require("dotenv").config();

const port = process.env.PORT || 8088;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is Listening on Admin MS Port: " + port);
});

//eurekaHelper.registerWithEureka("Admin-MicroService", port);
