const http = require("http");
const msg = require("./loger");
const Adder = require("./adder");

const addObj = new Adder();

const myWebServer = http.createServer((request, response) => {
  if (request.url === "/") {
    // root url
    response.write("<h1>Root Response from the Web Server</h1>");
    response.end();
  } else if (request.url === "/message") {
    response.write("<h1>Message Response from the Web Server</h1>");
    let htmlStr = "";
    htmlStr += "<h2>" + msg.message() + "</h2>";
    htmlStr += "<h2>" + msg.message("Nasser", "Ramadan Kareem") + "</h2>";
    response.write(htmlStr);
    response.end();
  } else if (request.url === "/add") {
    response.write("<h1>Add Response from the Web Server</h1>");
    addObj.on("addedEvent", () => {
      response.write("<h2>Sum of numbers is " + addObj.sum + "</h2");
      response.end();
    });
    addObj.add(45, 125);
  } else {
    response.write("Resource does not exist...");
    response.end();
  }
}); // child of EventEmitter

myWebServer.on("connection", (socket) => {
  console.log("A Connection is made to myWebServer by a client!!!");
});

// starting the server to listen for http connections
myWebServer.listen(3030);

console.log("server is waiting for request on port number 3030");
