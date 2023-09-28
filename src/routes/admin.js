const express = require("express");
const router = express.Router();
const pool = require("../../db");
const queries = require("../queries");

router.post("/admin", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkAdminExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(
        queries.checkAdminPassword,
        [username, password],
        (error, results) => {
          if (results.rowCount) {
            pool.query(queries.getComplaints, (error, results) => {
              if (error) throw error;
              res.cookie("user", { username, password });
              res.render("admin", {
                username,
                complaints: results.rows,
                confirmAlert: null,
              });
            });
          } else {
            res.render("login.ejs", { error: "Incorrect Admin password" });
          }
        }
      );
    } else {
      res.render("login.ejs", { error: "Admin username not found" });
    }
  });
});

router.post("/addStudent", (req, res) => {
  const { firstname, lastname, birthdate, faculty } = req.body;
  const s_username = (
    firstname +
    lastname +
    birthdate.split("-")[0]
  ).toLowerCase();
  const s_password = lastname.toLowerCase() + 123;

  pool.query(queries.checkStudentExists, [s_username], (error, results) => {
    if (results.rows.length) {
      res.send("Student already exists...");
    }
    pool.query(
      queries.addStudent,
      [firstname, lastname, birthdate, faculty, s_username, s_password],
      (error, results) => {
        if (error) throw error;
        pool.query(queries.getComplaints, (error, results) => {
          if (error) throw error;
          res.render("admin", {
            username: req.cookies.user.username,
            complaints: results.rows,
            confirmAlert: `Student ${firstname} ${lastname} Added Successfully`,
          });
        });
      }
    );
  });
});

router.post("/resolveComplaint", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  pool.query(queries.resolveComplaint, [id], (error, results) => {
    if (error) throw error;
    const { username } = req.cookies.user;
    pool.query(queries.getComplaints, (error, results) => {
      if (error) throw error;
      res.render("admin", {
        username,
        complaints: results.rows,
        confirmAlert: `Complaint marked as Resolved`,
      });
    });
  });
});

router.post("/addInternship", async (req, res) => {
  const { username } = req.cookies.user;
  const { internship_name, details, faculty } = req.body;
  console.log(req.body);
  pool.query(
    queries.addInternship,
    [internship_name, details, faculty],
    (error, results) => {
      if (error) throw error;
      pool.query(queries.getComplaints, (error, results) => {
        if (error) throw error;
        res.render("admin", {
          username,
          complaints: results.rows,
          confirmAlert: `Internship Added Successfully`,
        });
      });
    }
  );
});

module.exports = router;
