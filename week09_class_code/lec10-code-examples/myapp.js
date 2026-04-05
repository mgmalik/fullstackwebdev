const express = require("express");

const webApp = express();

webApp.get("/", (request, response) => {
  response.send("Welcome to NODE JS Web App... Developing using Express");
});

webApp.get("/test", function (req, res) {
  res.send("<h1>This is test request on test URL </h1>");
});

webApp.get("/post", (req, res) => {
  res.send("<h1>This is GET request on post URL </h1>");
});

webApp.get("/boolean", (req, res) => {
  res.send(false);
});

webApp.get("/json", (req, res) => {
  res.send({
    name: "Abbas",
    age: 46,
    married: true,
    department: "IS",
    course: "web development",
  });
});

webApp.get("/array", (req, res) => {
  res.send([1, 2, 3, true, false, { name: "abbas", teacher: true }]);
});

webApp.listen(3030, () =>
  console.log("server is running on port 3030.\nTo stop server press CTRL + C"),
);
