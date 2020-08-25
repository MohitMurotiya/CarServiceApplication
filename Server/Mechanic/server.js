const http = require("http");
const app = require("./app");

const port = process.env.PORT || 8020;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is Listening on Mechanic MS Port: " + port);
});
