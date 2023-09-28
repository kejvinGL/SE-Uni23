const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const pool = require("./src/db");
const queries = require("./src/queries");

const cookieParser = require("cookie-parser");
const serveStatic = require("serve-static");

// Configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("./node_modules", express.static("node_modules"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cookieParser());

// Routes
const router = express.Router();
const adminRoutes = require("./src/routes/admin");
const studentRoutes = require("./src/routes/student");
app.use(adminRoutes);
app.use(studentRoutes);

app.get("/", (req, res) => {
  res.render("login.ejs", { error: null });
});

app.listen(PORT);
