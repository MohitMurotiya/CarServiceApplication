const http = require("http");
const app = require("./app");

const server = http.createServer(app);

// set port, listen for requests
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("Server is Listening on Customer MS Port: " + port);
});
