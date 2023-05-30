const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const studentRoutes = require("./src/routes");
app.use('/api/v1/student', studentRoutes);
const pool = require('./db');
const queries = require('./src/queries')

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.post("/student", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkStudentExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(queries.checkStudentPassword, [username, password], (error, results) => {
        if (results.rowCount) {
          res.render("student", { username: results.rows[0].firstname });
        } else {
          // Incorrect password
          res.send("Incorrect password");
        }
      });
    } else {
      // Student not found
      res.send("Username not found");
    }
  });
});

app.post("/admin", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkAdminExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(queries.checkAdminPassword, [username, password], (error, results) => {
        if (results.rowCount) {
          res.render("admin", { username: results.rows[0].firstname });
        } else {
          // Incorrect password
          res.send("Incorrect password");
        }
      });
    } else {
      // Admin not found
      res.send("Username not found");
    }
  });
});

app.post("/addStudent", (req, res) => {
  // const { firstname, lastname, birthdate, faculty } = req.body
  pool.query(queries.addStudent, [req.body]), (error, results) => {
  }
});

app.listen(3000);