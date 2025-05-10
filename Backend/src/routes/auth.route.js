const express = require('express');
const { signup } = require('../controllers/auth.controller.js');
const { login } = require('../controllers/auth.controller.js');
const { logout } = require('../controllers/auth.controller.js');
const { updateProfile } = require('../controllers/auth.controller.js');
const protectRoute = require('../middleware/auth.middleware.js');
const { checkAuth } = require('../controllers/auth.controller.js');
const { updatePassword } = require('../controllers/auth.controller.js');
const { deleteAccount } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup );

router.post("/login", login);

router.post("/Logout", logout);

router.put("/update", protectRoute , updateProfile);

router.put("/updatePassword", protectRoute , updatePassword);

router.delete("/delete", protectRoute , deleteAccount);

router.get("/check", protectRoute, checkAuth);

module.exports = router;