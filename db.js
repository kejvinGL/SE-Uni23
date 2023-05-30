const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "university",
    password: "90210",
    port: 6543,
});
module.exports = pool;