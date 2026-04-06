const express = require("express");
const mysql = require("mysql2");

const webApp = express();

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
// serving the publlichtml folder and its files to client
webApp.use(express.static(__dirname + "/publichtml"));

const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejsdb",
});

dbCon.connect((error) => {
  if (error) {
    console.log("DB ERROR: Not connected - " + error.message);
    throw error;
  }
  console.log("DB is connected successfully...");
});

// webApp.get("/", (req, res) => {
//   res.send("<h1>Welcome to Student Management System...</h1>");
// });

// webApp.post("/", function (req, res) {
//   res.send("<h1>This is a response from POST HTTP request on root ...</h1>");
// });

// GET request to read all the records from the students table
webApp.get("/data/students", (req, res) => {
  let sqlQuery = "SELECT * FROM students";
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("DB QUERY Error: " + error.message);
      console.log(results);
      console.log(fields);
      throw error;
    }
    // console.log(fields);
    res.send(results);
  });
});

webApp.post("/data/student", (req, res) => {
  const student = {
    name: req.body.name,
    gender: req.body.gender,
    semester: req.body.semester,
    major: req.body.major,
  };
  let sqlQuery = `INSERT INTO students (name, gender, semester, major) 
  VALUES('${student.name}', '${student.gender}', ${student.semester}, '${student.major}')`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      // throw error;
      res.send({ success: false, message: "DB error..." });
    }
    // console.log(results);
    if (results.affectedRows) {
      // res.send("<h2>One record has been added...</h2>");
      res.send({ success: true });
    } else {
      // res.send("<h2>Record addition is unsuccessful...</h2>");
      res.send({
        success: false,
        message: "Could not add the data in the server...",
      });
    }
  });
});

webApp.get("/data/student", (req, res) => {
  let sqlQuery = `SELECT * FROM students WHERE id = ${req.body.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      throw error;
    }
    if (results.length) {
      // res.send(results);
      res.send(results[0]);
    } else {
      res.send("<h2>The id does not exist in our record...</h2>");
    }
  });
});

webApp.get("/data/student/:id", (req, res) => {
  let sqlQuery = `SELECT * FROM students WHERE id = ${req.params.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      res.send({
        success: false,
        message: "Could not read data from the database!",
      });
      throw error;
    }
    if (results.length) {
      // res.send(results);
      res.send({ success: true, data: results[0] });
    } else {
      // res.send("<h2>The id does not exist in our record...</h2>");
      res.send({ success: true, data: null });
    }
  });
});

webApp.put("/data/student", (req, res) => {
  const student = {
    id: req.body.id,
    name: req.body.name,
    gender: req.body.gender,
    semester: req.body.semester,
    major: req.body.major,
  };
  let sqlQuery = `UPDATE students
  set
  name = '${student.name}',
  gender = '${student.gender}',
  semester = ${student.semester},
  major = '${student.major}'
  WHERE id = ${student.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      res.send({ message: error.message });
      throw error;
    }
    if (results.affectedRows) {
      // res.send("<h2>One record has been updated...</h2>");
      res.send({ success: true, data: student });
    } else {
      // res.send("<h2>Record updation is unsuccessful...</h2>");
      res.send({ success: true, data: null });
    }
  });
});

webApp.put("/data/student/:id", (req, res) => {
  const student = {
    id: req.params.id,
    name: req.body.name,
    gender: req.body.gender,
    semester: req.body.semester,
    major: req.body.major,
  };
  let sqlQuery = `UPDATE students
  set
  name = '${student.name}',
  gender = '${student.gender}',
  semester = ${student.semester},
  major = '${student.major}'
  WHERE id = ${student.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      res.status(500).send({ message: error.message });
      throw error;
    }
    if (results.affectedRows) {
      // res.send("<h2>One record has been updated...</h2>");
      res.status(200).send({ success: true, data: student });
    } else {
      // res.send("<h2>Record updation is unsuccessful...</h2>");
      res.status(404).send({ success: true, data: null });
    }
  });
});

webApp.delete("/data/student", (req, res) => {
  let sqlQuery = `DELETE FROM students where id = ${req.body.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      throw error;
    }
    if (results.affectedRows) {
      res.send("<h2>One record has been deleted...</h2>");
    } else {
      res.send("<h2>Record deletion is unsuccessful...</h2>");
    }
  });
});

webApp.delete("/data/student/:id", (req, res) => {
  let sqlQuery = `DELETE FROM students where id = ${req.params.id}`;
  dbCon.query(sqlQuery, (error, results) => {
    if (error) {
      console.log("Db ERROR: " + error.message);
      res.status(500).send({ message: error.message });
      throw error;
    }
    if (results.affectedRows) {
      // res.send("<h2>One record has been deleted...</h2>");
      res.status(200).send({ success: true });
    } else {
      // res.send("<h2>Record deletion is unsuccessful...</h2>");
      res
        .status(404)
        .send({ success: false, message: "Could not delete the record..." });
    }
  });
});

webApp.listen(3030, () =>
  console.log(
    "Server is running on PORT 3030...\nTo stop the server press CTRL + C",
  ),
);
