require("dotenv").config();

const express = require("express");
const path = require("path");
const routes = require("./src/routes");
const pool = require('./db');
const queries = require('./src/queries');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000

// Configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "/public")));


// Middleware
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  app.use(express.static());
}

// Routes
app.get("/", (req, res) => {
  res.render("login.ejs", { error: null });
});


app.post("/student", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkStudentExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(queries.checkStudentPassword, [username, password], (error, results) => {
        if (results.rowCount) {
          const { firstname, faculty } = results.rows[0];
          pool.query(queries.getAvailableInternships, [faculty, username], (error, results) => {
            console.log(results.rows);
            const available = results.rows;
            pool.query(queries.getAppliedInternships, [faculty, username], (error, results) => {
              const applied = results.rows;
              res.cookie('user', { username, firstname, faculty });
              console.log(available);
              res.render("student", { firstname, available, applied, confirmAlert: null });
              console.log(`Student ${firstname} logged in`);
            });
          });
        } else {
          res.render("login.ejs", { error: "Incorrect Student password" });
        }
      });
    } else {
      res.render("login.ejs", { error: "Student username not found" });
    }
  });
});



app.post("/admin", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkAdminExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(queries.checkAdminPassword, [username, password], (error, results) => {
        if (results.rowCount) {
          pool.query(queries.getComplaints, (error, results) => {
            if (error) throw error;
            res.cookie('user', { username, password });
            res.render("admin", { username, complaints: results.rows, confirmAlert: null });
          });
        } else {
          res.render("login.ejs", { error: "Incorrect Admin password" });
        }
      });
    } else {
      res.render("login.ejs", { error: "Admin username not found" });
    }
  });
});

app.post("/addStudent", (req, res) => {
  const { firstname, lastname, birthdate, faculty } = req.body;
  const s_username = (firstname + lastname + birthdate.split('-')[0]).toLowerCase();
  const s_password = lastname.toLowerCase() + 123;

  pool.query(queries.checkStudentExists, [s_username], (error, results) => {
    if (results.rows.length) {
      res.send("Student already exists...");
    }
    pool.query(queries.addStudent, [firstname, lastname, birthdate, faculty, s_username, s_password], (error, results) => {
      if (error) throw error;
      pool.query(queries.getComplaints, (error, results) => {
        if (error) throw error;
        res.render("admin", { username: req.cookies.user.username, complaints: results.rows, confirmAlert: `Student ${firstname} ${lastname} Added Successfully` });
      });
    });
  });
});


app.post("/resolveComplaint", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  pool.query(queries.resolveComplaint, [id], (error, results) => {
    if (error) throw error;
    const { username } = req.cookies.user
    pool.query(queries.getComplaints, (error, results) => {
      if (error) throw error;
      res.render("admin", { username, complaints: results.rows, confirmAlert: `Complaint marked as Resolved` });
    });
  });
});

app.post("/addComplaint", async (req, res) => {
  const { username, firstname, faculty } = req.cookies.user;
  const { category, description } = req.body;
  pool.query(queries.addComplaint, [username, category, description, faculty], (error, results) => {
    if (error) throw error;
    pool.query(queries.getAvailableInternships, [faculty, username], (error, results) => {
      const available = results.rows;
      pool.query(queries.getAppliedInternships, [faculty, username], (error, results) => {
        const applied = results.rows;
        res.cookie('user', { username, firstname, faculty });
        console.log(available);
        res.render("student", { firstname, available, applied, confirmAlert: null });
        console.log(`Student ${firstname} logged in`);
      });
    });

  });
});

app.post("/addInternship", async (req, res) => {
  const { username } = req.cookies.user;
  const { internship_name, details, faculty } = req.body;
  console.log(req.body);
  pool.query(queries.addInternship, [internship_name, details, faculty], (error, results) => {
    if (error) throw error;
    pool.query(queries.getComplaints, (error, results) => {
      if (error) throw error;
      res.render("admin", { username, complaints: results.rows, confirmAlert: `Internship Added Successfully` });
    });
  });
});
app.post("/applyInternship", async (req, res) => {
  const { username, firstname, faculty } = req.cookies.user;
  const { id } = req.body;
  pool.query(queries.applyInternship, [username, id], (error, results) => {
    if (error) throw error;
    pool.query(queries.getAvailableInternships, [faculty, username], (error, results) => {
      console.log(results.rows);
      const available = results.rows;
      pool.query(queries.getAppliedInternships, [faculty, username], (error, results) => {
        const applied = results.rows;
        res.cookie('user', { username, firstname, faculty });
        console.log(available);
        res.render("student", { firstname, available, applied, confirmAlert: null });
        console.log(`Student ${firstname} logged in`);
      });
    });
  });
})
app.listen(PORT);