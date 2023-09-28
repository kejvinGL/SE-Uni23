const pool = require("../db");
const queries = require("./queries");

const getStudent = (req, res) => {
  pool.query(queries.getStudent, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const addStudent = (req, res) => {
  pool.query(
    queries.addStudent,
    [firstname, lastname, birthdate, faculty, username, password],
    (error, results) => {}
  );
};
module.exports = {
  getStudent,
  addStudent,
};
