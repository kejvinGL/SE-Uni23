const pool = require('./routes');
const queries = require('./queries')

const getStudent = (req, res) => {
    pool.query(queries.getStudent, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};
const addStudent = (req, res) => {
    let { firstname, lastname, birthdate, faculty, username, password } = req.body;
    console.log(firstname, lastname, birthdate, faculty, password)
    username = (firstname[0] + lastname + birthdate.split('-')[0]).toLowerCase();
    password = lastname.toLowerCase() + 123;
    pool.query(queries.checkStudentExists, [username], (error, results) => {
        if (results.rows.length) {
            res.send("Student already exists...")
        }
        pool.query(queries.addStudent, [firstname, lastname, birthdate, faculty, username, password], (error, results) => {
            if (error) throw error;
            res.status(201).send('Student created successfully')
        });
    });
};
module.exports = {
    getStudent,
    addStudent,
};