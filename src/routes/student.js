const express = require("express");
const router = express.Router();
const pool = require("../../db");
const queries = require("../queries");

router.post("/student", (req, res) => {
  const { username, password } = req.body;
  pool.query(queries.checkStudentExists, [username], (error, results) => {
    if (results.rowCount) {
      pool.query(
        queries.checkStudentPassword,
        [username, password],
        (error, results) => {
          if (results.rowCount) {
            const { firstname, faculty } = results.rows[0];
            pool.query(
              queries.getAvailableInternships,
              [faculty, username],
              (error, results) => {
                console.log(results.rows);
                const available = results.rows;
                pool.query(
                  queries.getAppliedInternships,
                  [faculty, username],
                  (error, results) => {
                    const applied = results.rows;
                    res.cookie("user", { username, firstname, faculty });
                    console.log(available);
                    res.render("student", {
                      firstname,
                      available,
                      applied,
                      confirmAlert: null,
                    });
                    console.log(`Student ${firstname} logged in`);
                  }
                );
              }
            );
          } else {
            res.render("login.ejs", { error: "Incorrect Student password" });
          }
        }
      );
    } else {
      res.render("login.ejs", { error: "Student username not found" });
    }
  });
});

router.post("/addComplaint", async (req, res) => {
  const { username, firstname, faculty } = req.cookies.user;
  const { category, description } = req.body;
  pool.query(
    queries.addComplaint,
    [username, category, description, faculty],
    (error, results) => {
      if (error) throw error;
      pool.query(
        queries.getAvailableInternships,
        [faculty, username],
        (error, results) => {
          const available = results.rows;
          pool.query(
            queries.getAppliedInternships,
            [faculty, username],
            (error, results) => {
              const applied = results.rows;
              res.cookie("user", { username, firstname, faculty });
              console.log(available);
              res.render("student", {
                firstname,
                available,
                applied,
                confirmAlert: null,
              });
              console.log(`Student ${firstname} logged in`);
            }
          );
        }
      );
    }
  );
});

router.post("/applyInternship", async (req, res) => {
  const { username, firstname, faculty } = req.cookies.user;
  const { id } = req.body;
  pool.query(queries.applyInternship, [username, id], (error, results) => {
    if (error) throw error;
    pool.query(
      queries.getAvailableInternships,
      [faculty, username],
      (error, results) => {
        console.log(results.rows);
        const available = results.rows;
        pool.query(
          queries.getAppliedInternships,
          [faculty, username],
          (error, results) => {
            const applied = results.rows;
            res.cookie("user", { username, firstname, faculty });
            console.log(available);
            res.render("student", {
              firstname,
              available,
              applied,
              confirmAlert: null,
            });
            console.log(`Student ${firstname} logged in`);
          }
        );
      }
    );
  });
});

module.exports = router;
