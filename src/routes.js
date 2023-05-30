const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get("/", controller.getStudent);

router.post("/", controller.addStudent);

module.exports = router;
