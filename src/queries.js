const getStudent = "SELECT * FROM students";
const checkStudentExists = "SELECT s FROM students s WHERE s.username = $1";
const checkStudentPassword = "SELECT * FROM students WHERE username = $1 and password = $2";
const addStudent = "INSERT INTO students (firstname, lastname, birthdate, faculty, username ,password) VALUES ($1, $2, $3, $4, $5, $6)";

const checkAdminExists = "SELECT a FROM admin a WHERE a.username = $1";
const checkAdminPassword = "SELECT * FROM admin WHERE username = $1 and password = $2";

module.exports = {
    getStudent,
    checkStudentExists,
    addStudent,
    checkStudentPassword,
    checkAdminExists,
    checkAdminPassword,
};