const express = require('express');
const protectRoute = require('../middleware/auth.middleware');
const { getUsersForSidebar, getmessages, sendMessage } = require('../controllers/message.controller.js');



const router = express.Router();


router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getmessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;