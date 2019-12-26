var devServer = require("static-server");

var server = new devServer({
  rootPath: "./dist",
  port: 8000
});

server.start(() => {
  console.log("development server started at http://localhost:8000/");
});
