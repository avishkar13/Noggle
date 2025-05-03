const express = require('express');
const { signup } = require('../controllers/auth.controller.js');
const { login } = require('../controllers/auth.controller.js');
const { logout } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup );

router.post("/login", login);

router.post("/Logout", logout);

module.exports = router;