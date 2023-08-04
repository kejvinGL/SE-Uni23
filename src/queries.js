const getStudent = "SELECT * FROM students";
const checkStudentExists = "SELECT s FROM students s WHERE s.username = $1;";
const checkStudentPassword = "SELECT * FROM students WHERE username = $1 and password = $2;";
const addComplaint = "INSERT INTO complaints (st_username, category, description, faculty ) VALUES ($1, $2, $3, $4);";
const getAvailableInternships = "SELECT * FROM internships Where faculty = $1 and (applicants IS NULL OR $2 != ANY(applicants));";
const getAppliedInternships = "SELECT * FROM internships Where faculty = $1 and $2 = ANY(applicants);";
const applyInternship = "UPDATE internships  SET applicants = ARRAY_APPEND(applicants, $1) WHERE id= $2; ";


const checkAdminExists = "SELECT a FROM admin a WHERE a.username = $1;";
const checkAdminPassword = "SELECT * FROM admin WHERE username = $1 and password = $2;";
const getComplaints = "Select * FROM complaints;";
const resolveComplaint = "UPDATE complaints SET status = true WHERE id = $1;";
const addInternship = "INSERT INTO internships (internship_name, details, faculty) VALUES ($1, $2, $3);";
const addStudent = "INSERT INTO students (firstname, lastname, birthdate, faculty, username ,password) VALUES ($1, $2, $3, $4, $5, $6)";


module.exports = {
    getStudent,
    checkStudentExists,
    addStudent,
    checkStudentPassword,
    checkAdminExists,
    checkAdminPassword,
    getComplaints,
    addComplaint,
    resolveComplaint,
    addInternship,
    applyInternship,
    getAppliedInternships,
    getAvailableInternships,
};