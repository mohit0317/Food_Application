const express = require('express');
const { registeruser, loginUser } = require('../controllers/UserController');

const router = express.Router();

router.post("/register", registeruser);
router.post("/login", loginUser);

module.exports = router;